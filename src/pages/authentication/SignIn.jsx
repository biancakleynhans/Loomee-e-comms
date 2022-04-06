import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthForm from "../../components/reusables/AuthForm";
// import { CreateNewUser, LoginEmailPass, SignInAnon, SignInWithGoogle, GetAuthState } from "../../firebase/FirebaseAuth";
import { useAuth } from "../../firebase/FirebaseAuthHook";
import { RoutesObj } from "../../routes/AllRoutes";

/* 
 google button
 anom button
 form => email & pass input X 2
  Form validation
*/

export default function SignIn() {
  const { CreateNewUser, LoginEmailPass, SignInAnon, SignInWithGoogle } = useAuth();
  let navigation = useNavigate();

  // Sign up with email and password
  function submitSignIn(email, passw) {
    console.log("email and pass: ", email, passw);
    // do firebase auth call here for signup with email and pass
    LoginEmailPass(email, passw)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in sucsessfully ", user);
        CreateNewUser(user.uid, user).then(() => {
          navigation(RoutesObj.visual.home.path, { replace: true });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR occured: ", errorCode, errorMessage);
      });
  }

  function googleBTN() {
    // Action function we created containing the firebase call as a return value
    SignInWithGoogle()
      // result from that action
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("SIGN IN/Up Sucess ", user);
        // check if user is saved if not save user to firebstore db
        CreateNewUser(user.uid, user).then(() => {
          navigation(RoutesObj.visual.home.path, { replace: true });
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        console.log("ERROR: ", errorCode, errorMessage);
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function anonBTN() {
    SignInAnon()
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("SIGN IN/Up Sucess Anon ", user);
        // check if user is saved if not save user to firebstore db
        CreateNewUser(user.uid, user).then(() => {
          navigation(RoutesObj.visual.home.path, { replace: true });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR: ", errorCode, errorMessage);
      });
    //   .then(() => {
    //     // Signed in..
    //     console.log("Signed in/up Happpy");
    //     GetAuthState()
    //       .then((value) => {
    //         console.log("Resolved value at the end: ", value);
    //       })
    //       .catch((err) => {
    //         console.log("Rejected value at the end: ", err);
    //       });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log("ERROR: ", errorCode, errorMessage);
    //   });
  }

  return (
    <>
      <h1>Sign In Page</h1>
      <br />

      <h2>Sign in with email and password </h2>
      <br />
      <AuthForm type='Sign In' onFinalize={(email, pass) => submitSignIn(email, pass)} />
      <br />

      <button onClick={() => googleBTN()}>Sign in with Google</button>

      <br />

      <button onClick={() => anonBTN()}>Sign in Anonomously</button>

      <br />
      <br />

      <p>
        Don't have an account <NavLink to={RoutesObj.visual.sign_up.path}>{RoutesObj.visual.sign_up.name}</NavLink>
      </p>
    </>
  );
}
