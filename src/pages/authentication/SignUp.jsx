import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/reusables/AuthForm";
import { useAuth } from "../../firebase/FirebaseAuthHook";
import { RoutesObj } from "../../routes/AllRoutes";

// import { CreateNewUser, RegisterEmailPass } from "../../firebase/FirebaseAuth";

/* form=>
    email & pass
    Bonus ensure add confirm password field
    Stop user from using sign up if passwords do not match 

    Form validation
*/

export default function SignUp() {
  const { RegisterEmailPass, CreateNewUser } = useAuth();
  let navigation = useNavigate();

  // container function
  function submitSignUp(email, pass) {
    console.log("email and pass: ", email, pass);
    // do firebase auth call here for signup with email and pass
    RegisterEmailPass(email, pass)
      // do something once the promise is resolved
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Sign up a sucsess we recieved:", user);
        // save user to firebase firestore db in order to acess that users info
        CreateNewUser(user.uid, user).then(() => {
          navigation(RoutesObj.visual.home.path, { replace: true });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("an error has occured: ", errorCode, errorMessage);
      });
  }

  return (
    <>
      <h1>Sign Up Page</h1>
      <AuthForm type='Sign Up' onFinalize={(email, pass) => submitSignUp(email, pass)} />
    </>
  );
}
