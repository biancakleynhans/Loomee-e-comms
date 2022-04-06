import React from "react";
import HeaderBar from "../../components/headers_footers/HeaderBar";
import MainCatContent from "../products/000MainCategory";

export default function Home() {
  return (
    <>
      <HeaderBar />
      <h1>Welcome to Black Wolfs Moon online shop</h1>
      <MainCatContent />
    </>
  );
}
