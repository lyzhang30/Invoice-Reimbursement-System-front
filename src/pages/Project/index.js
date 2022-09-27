import React, { useContext, useState, useEffect } from "react";
import { ToastContext } from "../../App";
import {
  GET_PROJECT_BY_ID,
  POST_ADD_AN_APPLY,
  BASE_PATH,
  GET_INFO_BY_TOKEN,
} from "../../utils/mapPath";
import axios from "axios";
// import { usePersonalInformation } from "../PersonalPage";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import BackgroundCard from "../../Component/BackgroundCard";

const MyHeader = styled.div`
  height: fit-content;
  width: 100%;
  margin-top: 1rem;
`;

const Label = styled.div`
  height: fit-content;
  width: 100%;
  font-weight: 700;
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  color: #374151;
  margin-top: 1.5rem;
  margin-bottom: 0.3rem;
  letter-spacing: 0.1em;
`;

export default function Project() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toastController = useContext(ToastContext);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_PROJECT_BY_ID,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
          id: id,
        },
        data: {
          Authorization: token,
          id: id,
        },
        params: {
          id: id,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        setInfo(res.data.data);
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

  const applyClick = async () => {
    let token = localStorage.getItem("token");
    const options = {
      url: POST_ADD_AN_APPLY,
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
      params: {
        reimbursementTemplateId: id,
      },
      data: {
        reimbursementTemplateId: id,
      },
    };
    const res = await axios(options);
    if (res.data.code === 200) {
      toastController({
        mes: "申请成功!",
        timeout: 1000,
      });
    } else {
      toastController({
        mes: res.data.message,
        timeout: 3000,
      });
    }
    navigate(`/Apply/${res.data.data.id}`);
  };

  return (
    <>
      <BackgroundCard>
        <div className="h-auto w-full min-h-0 px-6 shrink-0 flex flex-col justify-start">
          <MyHeader>
            <div className="h-12 w-full overflow-hidden text-gray-700 text-3xl font-bold truncate">
              报销项目：{info.categoryName}
            </div>
            {/* 申请按钮 */}
            <div
              className="h-10 w-28 flex bg-blue-100 float-right justify-center items-center select-none
             text-lg tracking-widest text-sky-700 rounded transition-all duration-500 hover:bg-blue-200"
              onClick={applyClick}
            >
              申请
            </div>
          </MyHeader>
          <Label>
            是否要经学院同意：{info.applyCategory === "0" ? "是" : "否"}
          </Label>
          {info.fileAddress !== null && (
            <>
              <Label>附件：</Label>
              <a
                // href={`${BASE_PATH}${info.fileAddress}`}
                href={`${BASE_PATH}c072a682-b370-4728-83a3-99531c063fa2.csv`}
                download="test"
                className="h-7 w-fit px-8 bg-sky-100 rounded-sm select-none"
              >
                点击下载附件
              </a>
            </>
          )}

          <Label>起止时间：</Label>
          <p>
            {info.startTime} 至 {info.endTime}
          </p>
          <Label>申请详情：</Label>
          <p>{info.remark}</p>
        </div>
      </BackgroundCard>
    </>
  );
}
