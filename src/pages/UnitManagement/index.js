import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { GET_INFO_BY_TOKEN } from "../../utils/mapPath";
import { ToastContext } from "../../App";
import BackgroundCard from "../../Component/BackgroundCard";
import axios from "axios";

// 待审核页面
export default function UnitManagement() {
  const navigate = useNavigate();
  const toastController = useContext(ToastContext);

  function isFocus(path, str) {
    if (path.search(str) !== -1) return true;
    return false;
  }
  let path = useLocation().pathname;

  useEffect(() => {
    //判断是否登录
    const isLogin = async () => {
      let token = localStorage.getItem("token");

      const options = {
        url: GET_INFO_BY_TOKEN,
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          Authorization: token,
        },
      };
      const res = await axios(options);

      if (res.data.code !== 200) {
        toastController({
          mes: "您还未登录，先登录吧!",
          timeout: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };
    isLogin();
  }, []);

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
                isFocus(path, "Addunit") === true
                  ? "text-blue-600 bg-sky-100"
                  : "text-sky-600"
              }`}
              onClick={() => {
                navigate(`/UnitManagement/Addunit`);
              }}
            >
              新增
            </div>
            {/* 修改按钮 */}
            <div
              className={`h-9 w-fit px-8 font-bold flex justify-center select-none
               items-center rounded ${
                 isFocus(path, "ModifyUnit") === true
                   ? "text-blue-600 bg-sky-100"
                   : "text-sky-600"
               }`}
              onClick={() => {
                navigate(`/UnitManagement/ModifyUnit`);
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
