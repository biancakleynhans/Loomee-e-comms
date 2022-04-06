import React from "react";
import Menu from "../navigation/Menu";
import NavBar from "../navigation/NavBar";

export default function HeaderBar() {
  return <div className='App-header'>{window.innerWidth > 500 ? <NavBar /> : <Menu />}</div>;
}
