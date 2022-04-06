import React, { useEffect, useState } from "react";
import CatagoryCard from "../../components/displays/CatagoryCard";
import HeaderBar from "../../components/headers_footers/HeaderBar";
import { useData } from "../../firebase/FirebaseDataHook";
import { RoutesObj } from "../../routes/AllRoutes";

/*
{"fixed": "fixed"} body.leg.tatoo routesObj.signin.path
{ [k:string] : fixed } body['leg']["tattoo"]
*/

export default function SubCategory() {
  const { Products } = useData();
  const [SubCatArr, setSubCatArr] = useState([]);
  const [main, setmain] = useState("");

  useEffect(() => {
    if (Products !== null) {
      let path = window.location.href;
      let pathSplit = path.split("/");
      let cat = pathSplit[pathSplit.length - 1]; //last entry in array is our cat
      setmain(cat);

      let subCatObj = Products[cat];

      if (subCatObj !== null) {
        let subCatStrings = Object.keys(subCatObj);
        setSubCatArr(subCatStrings);
      }

      console.log("URL: ", path, pathSplit, cat, subCatObj); // , subCatStrings
    }
  }, []);

  return (
    <>
      <HeaderBar />
      <h1>Sub category page</h1>
      <div className='MainContainer'>
        {SubCatArr &&
          SubCatArr.map((sub, index) => {
            let path = RoutesObj.non_visual.subCatsLanding.path; // subcat/:cat/:subcat
            let pathCleaned = path.replace(":cat", main).replace(":subcat", sub); //using hardcoded value
            console.log("PATHS: ", sub, path, pathCleaned);

            return <CatagoryCard key={index} catString={sub} pathVar={pathCleaned} />;
          })}
      </div>
    </>
  );
}
