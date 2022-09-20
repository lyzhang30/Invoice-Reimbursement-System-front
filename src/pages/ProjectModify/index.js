import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackSvg, AddSvg, CancelSvg, SubmitSvg, CloseSvg } from "../../svg";
import BackgroundCard from "../../Component/BackgroundCard";

export default function ProjectModify() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="absolute h-screen w-screen bg-gray-300 bg-opacity-60 backdrop-blur-xxs
        flex flex-col items-center pt-0 z-10 top-0 left-0"
      >
        <div className=" h-full w-7/12 bg-gray-50 rounded-tr-2xl pl-6 ">
          <div
            className="h-fit w-fit float-right bg-purple-20"
            onClick={() => {
              navigate(-1);
            }}
          >
            <CloseSvg size={52}></CloseSvg>
          </div>
          <div className="h-8 w-52"></div>
          <p>
            报销项目名称：
            <input type="text" className="h-9 w-130 bg-sky-50 px-3" />
          </p>
          <br />
          <p>
            是否经学院审批：
            <input type="text" className="h-9 w-20 bg-sky-50 px-3" />（ 请填
            “是” 或 “否” ）
          </p>
          <br />
          <p>
            开始时间：
            <input type="date" className="h-9 w-130 bg-sky-50 px-3" />
          </p>
          <br />
          <p>
            结束时间：
            <input type="date" className="h-9 w-130 bg-sky-50 px-3" />
          </p>
          <br />
          <p>
            附加文件：
            <input type="file" className="h-8 w-130 bg-sky-50" />
          </p>
          <br />
          <p>申请详情：</p>
          <textarea
            cols="105"
            rows="15"
            className="p-3 h-72 w-11/12 bg-sky-50 mt-2"
          ></textarea>
          <p className="text-red-700 w-fit m-0">注意：所有均为必填项</p>
          {/* 确定按钮 */}
          <div
            className="h-9 w-20 bg-sky-100 rounded-sm float-right mr-3 mt-2 transition-all 
              duration-300 hover:bg-sky-200 flex justify-center items-center select-none "
            onClick={() => {
              navigate(-1);
            }}
          >
            修改
          </div>
        </div>
      </div>
    </>
  );
}
