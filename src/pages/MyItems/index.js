import React, { useContext, useState, useEffect } from "react";
import { ToastContext } from "../../App";
import { GET_ALL_OF_MY_ITEMS, GET_INFO_BY_TOKEN } from "../../utils/mapPath";
import axios from "axios";
// import { usePersonalInformation } from "../PersonalPage";
import { useNavigate } from "react-router-dom";
import BackgroundCard from "../../Component/BackgroundCard";
import { ItemSvg } from "../../svg";

// 我的申请页面（只有身份为student才可看到）
export default function MyItems() {
  const navigate = useNavigate();
  const toastController = useContext(ToastContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_ALL_OF_MY_ITEMS,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          Authorization: token,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        setList(res.data.data);
      } else {
        toastController({
          mes: res.data.message,
          timeout: 1000,
        });
        navigate(-1);
      }
    };
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

    fetchData();
  }, []);

  return (
    <>
      <BackgroundCard>
        <div className="h-auto w-full min-h-0  shrink-0 flex flex-col justify-start items-center">
          {list !== undefined &&
            list.length > 0 &&
            list.map((item) => {
              if (item.status === "已撤回") {
                return null;
              }
              return (
                <div
                  className={`h-32 w-full select-none rounded py-3 px-6 bg-sky-50
                 flex justify-between items-center mb-3 `}
                  onClick={() => {
                    if (item.status !== "已撤回") {
                      navigate(`/Apply/${item.id}`);
                    }
                  }}
                >
                  {/* left */}
                  <div className="h-full w-10/12 bg-red-10 pr-3">
                    <p className="text-sky-700 text-xl font-bold truncate">
                      {item.reimbursementTemplateName}
                    </p>
                    <div className="h-14 w-full text-gray-500 py-1 overflow-hidden ">
                      {item.reimbursementTemplateRemark}
                    </div>
                    <p className="text-gray-700 truncate">
                      <span className="font-bold ">申请时间：</span>
                      {item.createTime}
                    </p>
                  </div>
                  {/* line 分割线 */}
                  <div className="h-28 w-0 border-l-2 border-blue-300"></div>

                  {/* right */}
                  <div className="h-full w-1/6 bg-amber-10 pl-5 py-3">
                    <p className="text-lg text-gray-700">状态：</p>
                    <div className="text-xl w-fit h-fit text-green-600 mx-auto">
                      {item.status}
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
