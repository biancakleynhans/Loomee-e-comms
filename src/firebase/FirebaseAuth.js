// import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { doc, collection, query, where, getDocs, setDoc } from "firebase/firestore";
// import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./FirebaseConfig";

// const PathString = "USERS";

// // Sign up using email and password (SignUp Page)
// export function RegisterEmailPass(email, password) {
//   // this is the firebase call that handles the auth of a new user signing up with our site. This call return a Promise of type FirebaseUser
//   return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
// }

// // Sign in
// export function LoginEmailPass(email, password) {
//   // this is the firebase call that handles the auth of a user signing in to our site. This call return a Promise of type FirebaseUser
//   return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
// }

// // Log out from all forms of auth
// export function Logout() {
//   signOut(FIREBASE_AUTH);
//   window.location.replace("/");
// }

// // Sign in/up with google pop up
// export function SignInWithGoogle() {
//   // is the way we coms with firebase to know how to log in
//   const provider = new GoogleAuthProvider();
//   //   the firebase function that allows us to sign in with gooogle via a pop up screen
//   //  it will return to us a promise of type FirebaseUser
//   return signInWithPopup(FIREBASE_AUTH, provider);
// }

// // Sign in/up with anon
// export function SignInAnon() {
//   return signInAnonymously(FIREBASE_AUTH);
// }

// // Create a new User from a Sign up
// // async asycronious meaning allows other functions to co run while it is running
// export async function CreateNewUser(uid, user) {
//   //   Checks that user does exist
//   const isUser = user !== undefined && user !== null ? true : false;
//   //   Checks if the user has a display name (only Google auth does)
//   const dn = isUser && user.displayName !== null ? user.displayName : "";

//   //   The new user object we want to create
//   const payload = {
//     displayName: dn.length > 0 ? dn : "",
//     email: isUser ? user.email : "",
//     profileUrl: isUser && user.profileUrl ? user.profileUrl : "", //(Google)
//     uid: uid,
//     role: "user",

//   };

//   //   FIREBASE FIRESTORE IMPLEMENTATION

//   // this is a refrence to a single document in a collection because we have the base path as well as a sub path ie: USERS/uid
//   const Ref = collection(FIREBASE_FIRESTORE, PathString);
//   const docRef = doc(FIREBASE_FIRESTORE, PathString, uid);

//   //   Same structure as an sql query
//   //          query(location  type of query == where a==b)
//   const q = query(Ref, where("uid", "==", `${uid}`));

//   //   if query matched an array of results from match will be returned to us
//   const querySnapshot = await getDocs(q);
//   console.log("qs", querySnapshot.docs.length);

//   // Checked that user does not exit in our db that way we do not have duplicate values for users this is very relevant when we add this to our anon and goole auth methods

//   if (querySnapshot.docs.length == 0) {
//     //   create a db entry:
//     // Behind the scenes, .add(...) and .doc().set(...) are completely equivalent, so you can use whichever is more convenient.
//     await setDoc(docRef, payload)
//       .then((res) => {
//         console.log("Created new User entry in db ", res);
//       })
//       .catch((err) => {
//         console.log("ERROR Cannot Create New user entry in db ", err);
//       });
//   }
// }

// // Checking auth state of a user after sign in/up
// // Promise<{displayName: string,email: string,profileUrl: string,uid: string,role: string}>
// export function GetAuthState() {
//   // create own new promise function type
//   return new Promise((resolve, reject) => {
//     // local variable that we init with " " values
//     let returnUser = {
//       displayName: "",
//       email: "",
//       profileUrl: "",
//       uid: "",
//       role: ""
//     };

//     // firebase function
//     return onAuthStateChanged(FIREBASE_AUTH, async function (user) {
//       console.log("Give us the onAuthStateChanged user: ", user?.uid, user); // will be null OR FirebaseUser
//       //  if logged in will not be null
//       if (user !== null) {
//         const Ref = collection(FIREBASE_FIRESTORE, "USERS");
//         //   Same structure as an sql query=>  query(location  type of query == where a==b)
//         const q = query(Ref, where("uid", "==", `${user.uid}`));
//         //   if query matched an array of results from match will be returned to us
//         const querySnapshot = await getDocs(q);
//         console.log("qs", querySnapshot.docs.length);
//         // Checked that user does not exit in our db that way we do not have duplicate values for users this is very relevant when we add this to our anon and goole auth methods
//         if (querySnapshot.docs.length == 0) {
//           console.log("anon => getAuth => query => return [] => We are here");
//           // User does not exsit lets create user
//           CreateNewUser(user.uid, user)
//             .then(() => {
//               // Create our retur value
//               returnUser = {
//                 displayName: user.displayName && user.displayName.length > 0 ? user.displayName : "",
//                 email: user.email ? user.email : "",
//                 profileUrl: "", //(Google)
//                 uid: user.uid,
//                 role: "user"
//               };
//               console.log("created user entry in OUR db and will now resolve our promise ");
//               return resolve(returnUser);
//             })
//             .catch((err) => {
//               // error some where
//               reject(`Error occured here: ${err}`);
//             });
//         } else {
//           // here we return our users value
//           console.log("anon => getAuth => query => return does exist entry => We are here to fill local variable ");
//           returnUser = {
//             displayName: user.displayName && user.displayName.length > 0 ? user.displayName : "",
//             email: user.email ? user.email : "",
//             profileUrl: "", //(Google)
//             uid: user.uid,
//             role: "user"
//           };
//           console.log("Now resolving promise");
//           return resolve(returnUser);
//         }
//         // got to return one level up again
//         resolve(returnUser);
//       }
//     });
//   });
// }
