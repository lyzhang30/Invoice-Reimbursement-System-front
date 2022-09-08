import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../../App";
import Svg1, { Svg2, Svg3, Svg4, Svg5 } from "../../svg";
import TopNav from "../TopNav";
import { Link } from "react-router-dom";

// 背景组件
export default function BackgroundCard(props) {
  return (
    <div
      className="h-screen w-screen flex flex-col justify-between items-center"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      <div className="h-12 w-full shrink-0">
        <TopNav></TopNav>
      </div>
      {/* container */}

      <div className="h-5/6 w-full flex-grow min-h-0 shrink flex flex-col justify-start items-center px-14 pt-12">
        {/* 中间白色框 */}
        <div
          className="h-96 w-full min-h-fit flex-grow bg-gray-50
        flex justify-start items-center p-8"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="h-full w-44 shrink-0">
            <LeftNav></LeftNav>
          </div>
          {/* 分割线 */}
          <div className="h-full border-l-2 border-gray-200"></div>
          <div
            className="h-full w-1/2 flex-grow shrink-0 min-w-0 px-3 flex flex-col
             justify-start items-center overflow-y-scroll overflow-x-hidden"
          >
            {props.children}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="h-14 w-full shrink-0 flex justify-center items-center text-gray-600">
        Shan Tou University
      </div>
    </div>
  );
}

function LeftNav() {
  const { role } = useContext(UserInfoContext);
  return (
    <div className="h-full w-full flex flex-col justify-start items-center bg-blue-20 ">
      {/* 报销项目按钮 */}
      <div className="h-14 w-full flex justify-between items-center space-x-1 pl-1 select-none group">
        <div className={`h-8 w-8 flex justify-center items-center `}>
          <Svg1></Svg1>
        </div>
        <Link
          to={`/`}
          className={`h-full w-10 flex-grow flex justify-start items-center text-blue-500
        `}
        >
          报销项目
        </Link>
        <div className="w-0 h-0 border-l-4 border-blue-600 transition-all duration-500 group-hover:h-full"></div>
      </div>
      {/* 我的申请按钮 */}
      {role === "student" && (
        <div className="h-14 w-full flex justify-between items-center space-x-1 pl-1 select-none group">
          <div className={`h-8 w-8 flex justify-center items-center `}>
            <Svg2></Svg2>
          </div>
          <Link
            to={`/MyItems`}
            className={`h-full w-10 flex-grow flex justify-start items-center text-blue-500`}
          >
            我的申请
          </Link>
          <div
            className={` w-0 h-0 border-l-4 border-blue-600 transition-all duration-500 group-hover:h-full`}
          ></div>
        </div>
      )}
      {/* 待审核按钮 */}
      {role !== "student" && role !== "administrators" && (
        <div className="h-14 w-full flex justify-between items-center space-x-1 pl-1 select-none group">
          <div className={`h-8 w-8 flex justify-center items-center `}>
            <Svg3></Svg3>
          </div>
          <Link
            to={`/ToBeReview`}
            className={`h-full w-10 flex-grow flex justify-start items-center text-blue-500
        `}
          >
            待审核
          </Link>
          <div
            className={` w-0 h-0 border-l-4 border-blue-600 transition-all duration-500 group-hover:h-full`}
          ></div>
        </div>
      )}
      {/* 项目管理按钮 */}
      {role === "administrators" && (
        <div className="h-14 w-full flex justify-between items-center space-x-1 pl-1 select-none group">
          <div className={`h-8 w-8 flex justify-center items-center `}>
            <Svg4></Svg4>
          </div>
          <Link
            to={``}
            className={`h-full w-10 flex-grow flex justify-start items-center text-blue-500
        `}
          >
            项目管理
          </Link>
          <div
            className={` w-0 h-0 border-l-4 border-blue-600 transition-all duration-500 group-hover:h-full`}
          ></div>
        </div>
      )}
      {/* 账号管理按钮 */}
      {role === "administrators" && (
        <div className="h-14 w-full flex justify-between items-center space-x-1 pl-1 select-none group">
          <div className={`h-8 w-8 flex justify-center items-center `}>
            <Svg5></Svg5>
          </div>
          <Link
            to={``}
            className={`h-full w-10 flex-grow flex justify-start items-center text-blue-500`}
          >
            账号管理
          </Link>
          <div
            className={` w-0 h-0 border-l-4 border-blue-600 transition-all duration-500 group-hover:h-full`}
          ></div>
        </div>
      )}
    </div>
  );
}

// function LeftNavBtn(props) {
//   return (
//     <div className="h-14 w-full flex justify-between items-center space-x-1 pl-1 select-none group">
//       <div className={`h-8 w-8 flex justify-center items-center `}>
//         <></>
//       </div>
//       <div
//         className={`h-full w-10 flex-grow flex justify-start items-center text-blue-500
//         `}
//       >
//         name
//       </div>
//       <div
//         className={` w-0 border-l-4 border-blue-600 transition-all duration-500 group-hover:h-full`}
//       ></div>
//     </div>
//   );
// }
