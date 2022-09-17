import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundCard from "../../Component/BackgroundCard";
import { ItemSvg } from "../../svg";

// 我的申请页面（只有身份为student才可看到）
export default function MyItems() {
  const navigate = useNavigate();
  const [list, setList] = useState([
    {
      id: 1,
      project: "大创",
      detail:
        "申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情.",
      nowState: "已提交",
    },
    {
      id: 2,
      project: "数学建模",
      detail:
        "申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情,申请详情.",
      nowState: "已提交",
    },
  ]);

  return (
    <>
      <BackgroundCard>
        <div className="h-auto w-full min-h-0  shrink-0 flex flex-col justify-start items-center">
          {list !== undefined &&
            list.length > 0 &&
            list.map((item) => {
              return (
                <div
                  className="h-32 w-full bg-sky-50 rounded py-3 px-6
                 flex justify-between items-center mb-3"
                  onClick={() => {
                    navigate(`/Apply/${item.id}`);
                  }}
                >
                  {/* left */}
                  <div className="h-full w-10/12 bg-red-10 pr-3">
                    <p className="text-sky-700 text-xl font-bold truncate">
                      {item.project}
                    </p>
                    <div className="h-14 w-full text-gray-500 py-1 overflow-hidden">
                      {item.detail}
                    </div>
                    <Link
                      to={""}
                      className="h-fit w-fit float-right text-lg text-red-700 transition-all
                      hover:text-purple-600 duration-500"
                    >
                      查看详情 . . .
                    </Link>
                  </div>
                  {/* line 分割线 */}
                  <div className="h-4/5 w-0 border-l-2 border-gray-300"></div>
                  {/* right */}
                  <div className="h-full w-1/6 bg-amber-10 pl-5 py-3">
                    <p className="text-lg text-gray-700">状态：</p>
                    <div className="text-xl w-fit h-fit text-green-600 mx-auto">
                      {item.nowState}
                    </div>
                  </div>
                </div>
              );
            })}
          {/* 如果列表长度为 0 */}
          {list !== undefined && list.length === 0 && (
            <div className="h-100 w-full bg-red-50 flex justify-center items-center bg-opacity-40 ">
              <div className="bg-gray-5 h-32 w-40">
                <ItemSvg size={120}></ItemSvg>
              </div>
              <div className="text-gray-400 text-7xl font-bold">Is Null </div>
            </div>
          )}
        </div>
      </BackgroundCard>
    </>
  );
}
