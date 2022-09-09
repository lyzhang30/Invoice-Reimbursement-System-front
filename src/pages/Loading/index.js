import React from "react";
import { Svg7 as Svg } from "../../svg";

export default function index() {
  return (
    <div
      className="fixed flex  justify-center items-center w-screen h-screen bg-opacity-90"
      style={{ backgroundColor: "#d8e9fd" }}
    >
      <p className="text-9xl text-gray-500 font-bold">Loading</p>
      <div className="h-96 w-96 flex justify-center items-center">
        <Svg className="animate-spin-slow"></Svg>
      </div>
    </div>
  );
}
