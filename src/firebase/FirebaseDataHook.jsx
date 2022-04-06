import { onValue, push, ref, set } from "firebase/database";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FIREBASE_REALTIME_DB } from "./FirebaseConfig";

const PathString = "PRODUCTS/";
const DataContext = createContext({}); //Creator has the value
export const useData = () => useContext(DataContext); //Provider

export default function FirebaseDataHookProvider({ children, ...props }) {
  const [Products, setProducts] = useState(null); // null if empty and {}

  /*READ*/
  useEffect(() => {
    const Ref = ref(FIREBASE_REALTIME_DB, PathString);
    // Open read steam to firebase realtime db and then get update every time there is a change to any of the children listed within it
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      console.log("DATA", data);
      if (data !== null) {
        setProducts(data);
      }
    });
  }, []);

  useEffect(() => {}, [Products]);

  /* CREATE
  Responsible for creating a product
  A product has the following values: name, desc, price, stockLevel, images[]
    inventory.main.subcat.products[...........]
    inventory.female.dresses.products[]
    inventory.pc.fps.products[]
    inventory.dairy.milk.products[]

    const mainCat = ["male", "female", "kids"] use this array when creating a product

    const inventory = {
        main: {
            subcat: {
                products: []
                }
            }
        }

        let test = { name: "Test", desc: "test", price: 0.0, stockLevel: 1, images: [""], mainCat: "Female", subCat: "Dresses" , id:""};

*/
  function CreateProduct(newProduct) {
    let path = `${PathString}${newProduct.mainCat}/${newProduct.subCat}/products`;
    let REF = ref(FIREBASE_REALTIME_DB, `${path}`);
    // Get a key for a new product.
    const Key = push(REF).key;
    const finalREF = ref(FIREBASE_REALTIME_DB, `${path}/${Key}`);

    // Add the key to the product as a field value
    newProduct.id = Key;

    return set(finalREF, newProduct);
  }

  /**/
  function UpdateProduct(ProductId, newProduct, oldProduct) {}

  /**/
  function DeleteProduct(ProductId) {}

  const value = {
    CreateProduct, //CREATE
    Products, // READ
    UpdateProduct, // UPDATE
    DeleteProduct //DELETE
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
