import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePersonalInformation } from "../PersonalPage";
import { ToastContext } from "../../App";
import { GET_ALL_PROJECT, GET_INFO_BY_TOKEN } from "../../utils/mapPath";
import BackgroundCard from "../../Component/BackgroundCard";

// TODO:获取所有项目的列表
export default function Home() {
  const navigate = useNavigate();
  const toastController = useContext(ToastContext);
  const [list, setList] = useState([]);
  usePersonalInformation();

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_ALL_PROJECT,
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
      }
    };

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

      // const res = await axios(options);

      // if (res.data.code !== 200) {
      //   toastController({
      //     mes: "您还未登录，先登录吧!",
      //     timeout: 2000,
      //   });
      //   setTimeout(() => {
      //     navigate("/");
      //   }, 1000);
      // }

      try {
        const res = await axios(options);
        if (res.data.code !== 200) {
          toastController({
            mes: "您还未登录，先登录吧!",
            timeout: 2000,
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    isLogin();
    fetchData();
  }, []);

  return (
    <>
      <BackgroundCard>
        <div
          className="h-auto w-full min-h-0  shrink-0 grid grid-flow-row grid-cols-3
         gap-8 auto-cols-fr place-items-center"
        >
          {list.map((item) => {
            return (
              <div
                className="h-64 w-full  flex-col justify-between items-start p-5
             bg-blue-50 rounded transition-all duration-200 hover:bg-blue-100"
                onClick={() => {
                  navigate(`/Project/${item.id}`);
                }}
              >
                <div
                  className="h-12 max-w-full shrink-0 grow-0 block text-blue-600 text-3xl select-none
               font-bold truncate px-1 transition-all duration-200 transform hover:text-gray-700"
                >
                  {item.categoryName}
                </div>
                <p className="block h-10 px-3 font-bold text-lg text-gray-700">
                  申请详情：
                </p>
                <div
                  className="h-20 py-1 px-2 w-full flex-grow select-none block 
                bg-white overflow-hidden break-all text-gray-500"
                >
                  {item.remark}
                </div>

                <div className="h-8 mt-2 text-gray-600 select-none ">
                  <p className="px-3">
                    <span className="font-bold">开始时间：</span>
                    {item.startTime}
                  </p>
                  <p className="px-3">
                    <span className="font-bold">结束时间：</span>
                    {item.endTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </BackgroundCard>
    </>
  );
}
