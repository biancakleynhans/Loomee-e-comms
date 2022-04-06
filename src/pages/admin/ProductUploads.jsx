import React from "react";
import HeaderBar from "../../components/headers_footers/HeaderBar";
import { useData } from "../../firebase/FirebaseDataHook";

/* 
  Choice of how to gather input from admin user to safe to the db this is your assignment 

  Reusable code if possible for create and update

  Safety check only allow acess to this page if role === "admin"

  Use useData hook to acess all of the crud functionalities 
*/
export default function ProductUploads() {
  const { CreateProduct } = useData();

  const mainCat = ["male", "female", "kids"]; //select.option
  const subCat = ["shoes", "shirts", "dresses", "jackets", "sleepware", "jewelry"]; //select.option
  // 3x input fields === name, desc, price, stockLevel
  // 1x image upload === button, input

  return (
    <div>
      <HeaderBar />
      <h1>Product Uploads</h1>
      <br />
      {/* ADD BTN */}
      <button
        onClick={() => {
          let rand = (Math.random() * 10).toFixed(0);
          let checkM = rand < mainCat.length ? rand : 0;
          let checkS = rand < subCat.length ? rand : 0;
          let test = {
            name: `Test ${rand}`,
            desc: "test",
            price: rand * 100,
            stockLevel: rand + rand,
            images: ["https://picsum.photos/seed/picsum/200/300"],
            mainCat: mainCat[checkM],
            subCat: subCat[checkS],
            id: ""
          }; //-MzKghsXZ9eEe1yGvgi2

          console.log("?? ", test);
          CreateProduct(test);
        }}>
        Add
      </button>
      <br />
      <button onClick={() => {}}>Edit</button>
      <br />
      <button onClick={() => {}}>delete</button>
    </div>
  );
}
