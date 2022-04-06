import React, { useEffect, useState } from "react";
import HeaderBar from "../../components/headers_footers/HeaderBar";
import { useAuth } from "../../firebase/FirebaseAuthHook";
import { useData } from "../../firebase/FirebaseDataHook";

export default function DashbordPage() {
  const { RemoveProductFromCart, CurrentUser } = useAuth();
  const { Products } = useData();

  const [CART, setCART] = useState([]);

  useEffect(() => {
    console.log("curr: ", CurrentUser);
    if (CurrentUser !== null && CurrentUser.cart !== undefined && CurrentUser.cart !== null && CurrentUser.cart.length > 0) {
      setCART(CurrentUser.cart);
    }
    if (CurrentUser !== null && CurrentUser.cart !== undefined && CurrentUser.cart !== null && CurrentUser.cart.length !== CART.length) {
      console.log("Something changed lets show it");
    }
  }, [CurrentUser]);

  useEffect(() => {
    console.log("prods: ", Products);
    let arr = [];
    if (CurrentUser !== null && (CurrentUser.cart !== null || CurrentUser.cart !== undefined)) {
      if (Products !== null) {
        console.log("Ok we have info lets go on with setup");
        CurrentUser.cart.map((entry, index) => {
          //   id: "-MzONOacX42A2oQ5af9V" main: "female" quantity: 1 sub: "shirts"
          if (Products[entry.main]) {
            if (Products[entry.main][entry.sub]) {
              if (Products[entry.main][entry.sub].products) {
                //  For those using index please do the following:
                // let prods  = Object.values(Products[entry.main][entry.sub].products)
                // prods[index]
                if (Products[entry.main][entry.sub].products[entry.id]) {
                  console.log("???", Products[entry.main][entry.sub].products[entry.id]);
                  arr.push({
                    prod: Products[entry.main][entry.sub].products[entry.id],
                    cart: entry,
                    index
                  });
                }
              }
            }
          }
        });
        setCART(arr);
      }
    }
  }, [Products]);

  function RunRemove(entry) {
    console.log("??? REMOVE ???", entry);
    // Firebase function
    RemoveProductFromCart(CurrentUser.uid, entry.prod.id);
  }

  function DisplayCart() {
    if (CurrentUser && Products && CART && CART.length > 0) {
      return (
        <table>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Desc</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
          {CART.map((entry, index) => {
            return (
              <tr key={index}>
                <td>
                  <img style={{ width: "100px", height: "100px" }} src={entry?.prod?.images ? entry.prod.images[0] : ""} alt='broken' />
                </td>
                <td>{entry?.prod?.name}</td>
                <td>{entry?.prod?.desc}</td>
                <td>R {entry?.prod?.price}</td>
                <td>{entry?.cart?.quantity}</td>
                <td>
                  <button
                    onClick={() => {
                      RunRemove(entry);
                    }}>
                    Remove item
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      );
    } else {
      return <>No Products yet</>;
    }
  }

  return (
    <div>
      <HeaderBar />
      <h1>User profile page</h1>
      {DisplayCart()}
      <br />
    </div>
  );
}
