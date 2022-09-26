import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import BackgroundCard from "../../Component/BackgroundCard";
import AddUser from "../AddUser";

// 待审核页面
export default function UserManagement() {
  const navigate = useNavigate();
  function isFocus(path, str) {
    if (path.search(str) !== -1) return true;
    return false;
  }
  let path = useLocation().pathname;
  return (
    <>
      <BackgroundCard>
        <div className="h-auto w-full min-h-0  shrink-0 flex flex-col justify-start items-center">
          {/* 顶部导航栏 */}
          <div className="h-10 w-full flex justify-around items-center bg-blue-200">
            {/* 新增按钮 */}
            <div
              className={`h-9 w-fit px-8 font-bold flex justify-center select-none
              items-center rounded ${
                isFocus(path, "AddUser") === true
                  ? "text-blue-600 bg-sky-100"
                  : "text-sky-600"
              }`}
              onClick={() => {
                navigate(`/UserManagement/AddUser`);
              }}
            >
              新增
            </div>
            {/* 修改按钮 */}
            <div
              className={`h-9 w-fit px-8 font-bold flex justify-center select-none
               items-center rounded ${
                 isFocus(path, "ModifyUser") === true
                   ? "text-blue-600 bg-sky-100"
                   : "text-sky-600"
               }`}
              onClick={() => {
                navigate(`/UserManagement/ModifyUser`);
              }}
            >
              修改
            </div>
          </div>
          <Outlet />
        </div>
      </BackgroundCard>
    </>
  );
}
