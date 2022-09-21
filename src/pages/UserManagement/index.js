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
              className={`h-full w-fit px-6 font-bold flex justify-center select-none
               items-center ${
                 isFocus(path, "AddUser") === true
                   ? "text-red-800"
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
              className={`h-full w-fit px-6  font-bold flex justify-center select-none
               items-center ${
                 isFocus(path, "ModifyUser") === true
                   ? "text-red-800"
                   : "text-sky-600"
               }`}
              onClick={() => {
                navigate(`/UserManagement/ModifyUser`);
              }}
            >
              修改
            </div>
            {/* 删除按钮 */}
            <div
              className={`h-full w-fit px-6 font-bold flex justify-center select-none
               items-center ${
                 isFocus(path, "DeleteUser") === true
                   ? "text-red-800"
                   : "text-sky-600"
               }`}
              onClick={() => {
                navigate(`/UserManagement/DeleteUser`);
              }}
            >
              删除
            </div>
          </div>
          <Outlet />
        </div>
      </BackgroundCard>
    </>
  );
}
