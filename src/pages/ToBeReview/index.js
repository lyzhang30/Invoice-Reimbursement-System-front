import React, { useContext, useState, useEffect } from "react";
import { ToastContext } from "../../App";
import { GET_ALL_TO_BE_REVIEW, GET_INFO_BY_TOKEN } from "../../utils/mapPath";
import axios from "axios";
// import { usePersonalInformation } from "../PersonalPage";
import { useNavigate } from "react-router-dom";
import BackgroundCard from "../../Component/BackgroundCard";
import { ReviewSvg } from "../../svg";

// 待审核页面
export default function ToBeReview() {
  const navigate = useNavigate();
  const toastController = useContext(ToastContext);
  const [list, setList] = useState([]);
  //   {
  //     id: 1,
  //     project: "大创",
  //     name: "胡毅薇",
  //     email: "184972937@qq.com",
  //     tel: "13825864567",
  //     nowState: "已提交",
  //   },
  //   {
  //     id: 2,
  //     project: "数学建模",
  //     name: "张连勇",
  //     email: "1812843637@qq.com",
  //     tel: "13496564567",
  //     nowState: "已提交",
  //   },
  //   {
  //     id: 3,
  //     project: "泰迪杯",
  //     name: "章学榕",
  //     email: "9832645317@qq.com",
  //     tel: "45572568751",
  //     nowState: "已提交",
  //   },
  // ]);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_ALL_TO_BE_REVIEW,
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
          timeout: 3000,
        });
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
        <div className="h-auto w-full min-h-0 shrink-0 flex flex-col justify-start items-center">
          {list !== undefined &&
            list.length > 0 &&
            list.map((item) => {
              return (
                <div
                  className="h-28 w-full bg-sky-50 rounded py-3 px-6
                 flex justify-between items-center mb-3"
                  onClick={() => {
                    navigate(`/Examine/${item.id}`);
                  }}
                >
                  {/* left */}
                  <div className="h-full w-10/12 bg-red-10 pr-3">
                    <p className="text-sky-700 text-xl font-bold truncate">
                      {item.reimbursementTemplateName}
                    </p>
                    <p className="h-fit w-fit inline-block pr-14 text-gray-500 pt-1 overflow-hidden">
                      申请人：{item.applyUserName}
                    </p>
                    <p className="h-fit w-fit inline-block pr-14 text-gray-500 pt-1 overflow-hidden">
                      邮箱：{item.email}
                    </p>
                    <p className="h-fit w-fit inline-block pr-14 text-gray-500 pt-1 overflow-hidden">
                      联系电话：{item.phone}
                    </p>
                    <p className="h-fit w-fit inline-block pr-14 text-gray-500 pt-1 overflow-hidden">
                      所属单位：{item.unitName}
                    </p>
                    <p className="h-fit w-fit inline-block pr-14 text-gray-500 pt-1 overflow-hidden">
                      申请时间：{item.updateTime}
                    </p>
                  </div>
                  {/* line 分割线 */}
                  <div className="h-28 w-0 border-l-2 border-blue-300"></div>
                  {/* right */}
                  <div className="h-full w-1/6 bg-amber-10 pl-5 py-2">
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
                <ReviewSvg size={120} color={"#c3d7f6"}></ReviewSvg>
              </div>
              <div className="text-gray-400 text-7xl font-bold">Is Null </div>
            </div>
          )}
        </div>
      </BackgroundCard>
    </>
  );
}
