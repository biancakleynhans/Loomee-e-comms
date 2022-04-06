import React, { useEffect, useState } from "react";
import CatagoryCard from "../../components/displays/CatagoryCard";
import { useData } from "../../firebase/FirebaseDataHook";
import { RoutesObj } from "../../routes/AllRoutes";

/*MAIN CATEGORY DISPLAY PAGE AND CONSUMING OF DATA*/
export default function MainCatContent() {
  const { Products } = useData();
  const [mainCatsArr, setMainCatsArr] = useState([]);

  useEffect(() => {
    SetUp();
  }, []);

  useEffect(() => {
    SetUp();
  }, [Products]);

  function SetUp() {
    if (Products) {
      let main = Object.keys(Products);
      console.log("??", main);
      setMainCatsArr(main);
    }
  }

  return (
    <div className='MainContainer'>
      {mainCatsArr &&
        mainCatsArr.map((cat, index) => {
          let path = RoutesObj.non_visual.catsLanding.path; // "/cat/:type"
          let pathCleaned = path.replace(":type", cat); //using hardcoded value
          console.log("PATHS: ", cat, path, pathCleaned);

          return <CatagoryCard key={index} catString={cat} pathVar={pathCleaned} />;
        })}
    </div>
  );
}
