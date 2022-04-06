import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
// import { CreateNewUser } from "./FirebaseAuth";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./FirebaseConfig";

// interface iUser {
//   displayName: string;
//   email: string;
//   profileUrl: string;
//   uid: string;
//   role: string;
// }

// export function GetAuthState(): Promise<iUser> {
//   // create own new promise function type
//   return new Promise<iUser>((resolve, reject) => {
//     let returnUser: iUser = {
//       displayName: "",
//       email: "",
//       profileUrl: "",
//       uid: "",
//       role: ""
//     };
//     return onAuthStateChanged(FIREBASE_AUTH, async function (user) {
//       console.log("The user is", user); // will be null OR FirebaseUser
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
//           // User does not exsit lets create user
//           CreateNewUser(user.uid, user)
//             .then(() => {
//               // Create our retur value
//               returnUser = {
//                 displayName: user.displayName.length > 0 ? user.displayName : "",
//                 email: user.email ? user.email : "",
//                 profileUrl: "", //(Google)
//                 uid: user.uid,
//                 role: "user"
//               };
//               return resolve(returnUser);
//             })
//             .catch((err) => {
//               // error some where
//               reject(`Error occured here: ${err}`);
//             });
//         } else {
//           // here we return our users value
//           returnUser = {
//             displayName: user.displayName.length > 0 ? user.displayName : "",
//             email: user.email ? user.email : "",
//             profileUrl: "", //(Google)
//             uid: user.uid,
//             role: "user"
//           };
//           return resolve(returnUser);
//         }

//         // got to return one level up again
//         resolve(returnUser);
//       }
//     });
//   });
// }
