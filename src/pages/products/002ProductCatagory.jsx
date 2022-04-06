import React, { useEffect, useState } from "react";
import CatagoryCard from "../../components/displays/CatagoryCard";
import HeaderBar from "../../components/headers_footers/HeaderBar";
import { useData } from "../../firebase/FirebaseDataHook";
import { RoutesObj } from "../../routes/AllRoutes";

export default function ProductCatagory() {
  const { Products } = useData();
  const [ProdsArr, setProdsArr] = useState([]);
  const [main, setmain] = useState("");
  const [sub, setsub] = useState("");

  useEffect(() => {
    let path = window.location.href;
    let pathSplit = path.split("/");
    let cat = pathSplit[pathSplit.length - 2]; //last entry in array is our cat
    let sub = pathSplit[pathSplit.length - 1]; //last entry in array is our cat
    setmain(cat);
    setsub(sub);

    if (Products !== null) {
      let subCatObj = Products[cat];

      if (subCatObj !== null) {
        let prods = Products[cat][sub];

        if (prods !== null) {
          let arr = Object.values(prods.products);
          setProdsArr(arr);
          console.log("URL: ", path, pathSplit, cat, sub, subCatObj, prods, arr);
        }
      }
    }
  }, []);

  return (
    <>
      <HeaderBar />
      <h1>Products category page</h1>
      <div className='MainContainer'>
        {ProdsArr &&
          ProdsArr.map((prod, index) => {
            let path = RoutesObj.non_visual.productsLanding.path; // /prod/:cat/:subcat/:index_id
            let pathCleaned = path.replace(":cat", main).replace(":subcat", sub).replace(":index_id", prod.id); //using hardcoded value
            console.log("PATHS: ", prod, path, pathCleaned);

            return <CatagoryCard key={index} catString={prod.name} pathVar={pathCleaned} />;
          })}
      </div>
    </>
  );
}
