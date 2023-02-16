import React from "react";
import { IMAGES } from "../assets";

function ErrorLayout() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src={IMAGES.Notfound404} alt="notfound"></img>
    </div>
  );
}

export default ErrorLayout;
