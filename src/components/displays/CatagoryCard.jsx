import React from "react";
import { useNavigate } from "react-router-dom";
import { RoutesObj } from "../../routes/AllRoutes";

// Where you choose your main category and then want to display relevant sub cats

export default function CatagoryCard({ catString, pathVar }) {
  const navigate = useNavigate();

  // remove placeholder form our path
  // let path = RoutesObj.non_visual.catsLanding.path; // "/cat/:type"
  // let pathCleaned = path.replace(":type", catString); //using hardcoded value
  // console.log("PATHS: ", catString, path, pathCleaned);
  return (
    <button className='Card' onClick={() => navigate(`${pathVar}`)}>
      <img src='https://picsum.photos/seed/picsum/200/300' alt='broken' />
      <h1>{catString}</h1>
    </button>
  );
}
