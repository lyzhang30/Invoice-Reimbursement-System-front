import React from "react";
import { LoadingSvg as Svg } from "../../svg";

export default function index() {
  return (
    <div
      className="fixed flex  justify-center items-center w-screen h-screen bg-opacity-90"
      style={{ backgroundColor: "#d8e9fd" }}
    >
      <p className="text-7xl text-gray-500 font-bold">Loading</p>
      <div className="h-60 w-60 flex justify-center items-center">
        <Svg className="animate-spin-slow" size={180}></Svg>
      </div>
    </div>
  );
}
