import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../components/headers_footers/HeaderBar";
import { useAuth } from "../../firebase/FirebaseAuthHook";
import { useData } from "../../firebase/FirebaseDataHook";
import { RoutesObj } from "../../routes/AllRoutes";

export default function SingleProductview() {
  const nav = useNavigate();
  const { Products } = useData();
  const { AddProductToCart, CurrentUser } = useAuth();
  const [final, setfinal] = useState(null);

  useEffect(() => {
    let path = window.location.href;
    let pathSplit = path.split("/");

    let cat = pathSplit[pathSplit.length - 3]; //last entry in array is our cat
    let sub = pathSplit[pathSplit.length - 2]; //last entry in array is our cat
    let id = pathSplit[pathSplit.length - 1]; //last entry in array is our cat

    if (Products !== null) {
      let subCatObj = Products[cat];

      if (subCatObj !== null) {
        let prods = Products[cat][sub];
        if (prods !== null) {
          let temp = prods.products;
          if (temp !== null) {
            if (temp[id] !== null) {
              setfinal(temp[id]);
              console.log("URL: ", path, pathSplit, cat, sub, subCatObj, prods, temp, temp[id]);
            }
          }
        }
      }
    }
  }, [window.location.pathname, Products]);

  useEffect(() => {}, [CurrentUser]);
  useEffect(() => {}, [final]);

  function AddToCart() {
    // SIGNED IN
    if (CurrentUser !== null) {
      console.log("Adding to our cart here ");

      // OLD cart values from our db connected to this user
      let old = CurrentUser.cart;
      console.log("OLD", old);

      let newOrder = {
        // {final.mainCat} / {final.subCat} / {final.id}
        main: final.mainCat,
        sub: final.subCat,
        id: final.id,
        quantity: 1 //hard code or get value from user input think about our counter lesson 1
      };

      // User has an exsiting and it does posibly contain other products
      if (old !== null && old !== undefined) {
        old.push(newOrder);
        console.log("old added", old);
        // Firebase Function
        AddProductToCart(CurrentUser.uid, old)
          .then((res) => {
            console.log("YAY");
            window.alert("added to cart");
          })
          .catch((err) => {
            console.log("Eror,", err);
          });
      }
      // User has empty cart or cleared out and exsiting cart either way no info is contained in the cart of the user
      else {
        // No cart yet so make one
        let cart = [];
        cart.push(newOrder);
        console.log("new added", cart);

        // Firebase Update call
        AddProductToCart(CurrentUser.uid, cart)
          .then((res) => {
            console.log("YAY");
            window.alert("added to cart");
          })
          .catch((err) => {
            console.log("Eror,", err);
          });
      }
    }
    // NOT SIGNED IN
    else {
      // to let user redirect self
      // window.alert("Please log in to add to cart ");

      //  to redirect programmatically
      let con = window.confirm("Please log in to add to cart ");
      if (con) {
        nav(RoutesObj.visual.sign_in.path);
      }
    }
  }

  return (
    <div>
      <HeaderBar />
      <h1>Single Product view</h1>
      {final !== null ? (
        <>
          <br />
          <br />
          <h3>
            {final.mainCat} / {final.subCat} / {final.id}
          </h3>
          <br />
          <h1>{final.name}</h1>
          <br />

          {final.images && final.images.map((img, index) => <img style={{ width: "250px", height: "250px" }} key={index} src={img} alt='broken' />)}
          <h2>{final.desc}</h2>
          <br />
          <h3>R {final.price}</h3>

          <br />

          <p>Only {final.stockLevel} left. Hurry add to cart </p>
          <br />
          <button
            onClick={() => {
              AddToCart();
            }}>
            Add to cart
          </button>
          <br />
          <br />
          <br />
        </>
      ) : (
        <>LOADING</>
      )}
    </div>
  );
}
