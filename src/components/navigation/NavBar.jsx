import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { GetAuthState } from "../../firebase/FirebaseAuth";
import { useAuth } from "../../firebase/FirebaseAuthHook";
import { AllRoutes, RoutesObj } from "../../routes/AllRoutes";

export default function NavBar() {
  const [currUserLocal, setcurrUserLocal] = useState(null);
  const { Logout, CurrentUser } = useAuth();

  useEffect(() => {
    console.log("nav", CurrentUser);
    if (CurrentUser !== null && CurrentUser !== undefined) {
      setcurrUserLocal({ displayName: CurrentUser?.displayName, email: CurrentUser?.email, profileUrl: CurrentUser?.profileUrl, uid: CurrentUser?.uid, role: CurrentUser?.role });
    } else {
      setcurrUserLocal(null);
    }
  }, [CurrentUser]);

  // // Life cycle hook for functional classes
  // useEffect(() => {
  //   GetAuthState()
  //     .then((value) => {
  //       // value is the returnUser we create in our promise here we read that value if it is " " we know user not logged in  value.uid
  //       if (value && value.uid && value.uid.length > 0) {
  //         console.log("user is signed in and valid ", value);
  //         setcurrUserLocal(value);
  //       } else {
  //         console.log("user is signed out and no longer valid ", value);
  //         setcurrUserLocal({ displayName: "", email: "", profileUrl: "", uid: "", role: "" });
  //       }
  //     })
  //     .catch((err) => {});
  // }, [GetAuthState()]); // [] === only when first mounted [...] => checks every time change occurs to this value

  function NavOnAuth() {
    return AllRoutes.reverse().map((entry, index) => {
      if (currUserLocal && currUserLocal.uid && currUserLocal.uid.length > 0) {
        return (
          <React.Fragment key={index}>
            {entry.name === RoutesObj.visual.sign_in.name || entry.name === RoutesObj.visual.sign_up.name || entry.name === RoutesObj.visual.forgot_pass.name ? (
              <React.Fragment key={index}></React.Fragment>
            ) : (
              <NavLink className='navItem' key={index} to={entry.path}>
                {entry.name}
              </NavLink>
            )}
          </React.Fragment>
        );
      } else {
        return (
          <NavLink className='navItem' key={index} to={entry.path}>
            {entry.name}
          </NavLink>
        );
      }
    });
  }

  return (
    <>
      {/* OLD WAY */}
      {/* {AllRoutes.reverse().map((entry, index) => (
        <NavLink className='navItem' key={index} to={entry.path}>
          {entry.name}
        </NavLink>
      ))} */}

      {/* NEW WAY */}
      {NavOnAuth()}

      {currUserLocal && currUserLocal.uid && currUserLocal.uid.length > 0 && (
        <button
          onClick={() => {
            Logout();
          }}>
          Sign Out
        </button>
      )}
    </>
  );
}
