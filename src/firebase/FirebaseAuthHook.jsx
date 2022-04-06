import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, collection, query, where, getDocs, setDoc, updateDoc, FieldValue, arrayRemove } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./FirebaseConfig";

const AuthContext = createContext({}); //Creator has the value
export const useAuth = () => useContext(AuthContext); //Provider

const PathString = "USERS";

export default function FirebaseAuthHookProvider({ children, ...props }) {
  const [CurrentUser, setCurrentUser] = useState(null); //type null or UserToUse

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async function (user) {
      // console.log("The user is", currentUser);
      let UserToUse = {}; //place holder local variable
      const Ref = collection(FIREBASE_FIRESTORE, PathString);

      if (user !== null) {
        const q = query(Ref, where("uid", "==", `${user.uid}`));
        const querySnapshot = await getDocs(q);
        // console.log("Q", q, "QS", querySnapshot.docs.length, querySnapshot.docs[0].data());

        if (querySnapshot.docs[0]) {
          const data = querySnapshot.docs[0].data();

          UserToUse = {
            cell: data.cell,
            displayName: data.displayName,
            email: data.email,
            profileUrl: data.profileUrl,
            uid: data.uid,
            role: data.role,
            cart: data.cart
          };
        }
      }

      // console.log("The user is", UserToUse);
      setCurrentUser(user ? UserToUse : null);
    });
  }, []);

  useEffect(() => {
    console.log("???", CurrentUser);
  }, [CurrentUser]);

  // Sign up using email and password (SignUp Page)
  function RegisterEmailPass(email, password) {
    // this is the firebase call that handles the auth of a new user signing up with our site. This call return a Promise of type FirebaseUser
    return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  }

  // Sign in
  function LoginEmailPass(email, password) {
    // this is the firebase call that handles the auth of a user signing in to our site. This call return a Promise of type FirebaseUser
    return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  }

  // Log out from all forms of auth
  function Logout() {
    signOut(FIREBASE_AUTH);
    window.location.replace("/");
  }

  // Sign in/up with google pop up
  function SignInWithGoogle() {
    // is the way we coms with firebase to know how to log in
    const provider = new GoogleAuthProvider();
    //   the firebase function that allows us to sign in with gooogle via a pop up screen
    //  it will return to us a promise of type FirebaseUser
    return signInWithPopup(FIREBASE_AUTH, provider);
  }

  // Sign in/up with anon
  function SignInAnon() {
    return signInAnonymously(FIREBASE_AUTH);
  }

  // Create a new User from a Sign up
  // async asycronious meaning allows other functions to co run while it is running
  async function CreateNewUser(uid, user) {
    //   Checks that user does exist
    const isUser = user !== undefined && user !== null ? true : false;
    //   Checks if the user has a display name (only Google auth does)
    const dn = isUser && user.displayName !== null ? user.displayName : "";

    //   The new user object we want to create
    const payload = {
      displayName: dn.length > 0 ? dn : "",
      email: isUser ? user.email : "",
      profileUrl: isUser && user.profileUrl ? user.profileUrl : "", //(Google)
      uid: uid,
      role: "user",
      cart: []
    };

    //   FIREBASE FIRESTORE IMPLEMENTATION

    // this is a refrence to a single document in a collection because we have the base path as well as a sub path ie: USERS/uid
    const Ref = collection(FIREBASE_FIRESTORE, PathString);
    const docRef = doc(FIREBASE_FIRESTORE, PathString, uid);

    //   Same structure as an sql query
    //          query(location  type of query == where a==b)
    const q = query(Ref, where("uid", "==", `${uid}`));

    //   if query matched an array of results from match will be returned to us
    const querySnapshot = await getDocs(q);
    console.log("qs", querySnapshot.docs.length);

    // Checked that user does not exit in our db that way we do not have duplicate values for users this is very relevant when we add this to our anon and goole auth methods

    if (querySnapshot.docs.length == 0) {
      //   create a db entry:
      // Behind the scenes, .add(...) and .doc().set(...) are completely equivalent, so you can use whichever is more convenient.
      await setDoc(docRef, payload)
        .then((res) => {
          console.log("Created new User entry in db ", res);
        })
        .catch((err) => {
          console.log("ERROR Cannot Create New user entry in db ", err);
        });
    }
  }

  // We will get our product from the single product page along with the user attempting to add it to their cart so we need to make sure the function only excutes once the user is signed in else our uid is going to be an empty string that is going to cause problems so in order to prefent that we will not excute this if not logged in
  async function AddProductToCart(uid, order) {
    const docRef = doc(FIREBASE_FIRESTORE, `${PathString}/${uid}`);

    await updateDoc(docRef, { cart: order })
      .then((res) => {
        console.log("Added product to user cart", res);
      })
      .catch((err) => {
        console.log("ERROR Cannot Add to user cart", err);
      });
  }

  // Delete
  async function RemoveProductFromCart(uid, prodId) {
    console.log("???", uid, prodId);
    const docRef = doc(FIREBASE_FIRESTORE, `${PathString}/${uid}`);
    const tempArr = CurrentUser !== null ? CurrentUser.cart : [];

    // Remove object from array
    /* 
    map => return <></> explicit return must always return a value
    forEach => no return but rather iterate and do something for each entry in the array

    filter => spesific condition we want to check, Always return an array, the content of that array is deterimined by our condition 


    THIS 
    // let arr = [];
    // tempArr.forEach((e) => {
    //   if (e.id !== prodId) {
    //     arr.push(e);
    //   }
    // });

    IS SAME AS 
    //let arr = tempArr.filter((e) => e.id != prodId);

    */
    let arr = tempArr.filter((e) => e.id != prodId);
    console.log("ARR", arr);

    // Save new array in cloud firestore
    await updateDoc(docRef, { cart: arr })
      .then(() => {
        console.log("Files array updated successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Files array updated unsuccessful", err);
      });
  }

  // Acess values we want to be able to use
  const value = {
    CurrentUser,
    RegisterEmailPass,
    LoginEmailPass,
    Logout,
    // forgotPassword,
    // resetPassword,
    SignInWithGoogle,
    SignInAnon,
    CreateNewUser,
    AddProductToCart,
    RemoveProductFromCart
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
