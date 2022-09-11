import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import BackgroundCard from "../../Component/BackgroundCard";
import { ToastContext } from "../../App";
import { UserInfoContext } from "../../App";
import { GET_INFO_BY_TOKEN } from "../../utils/mapPath";
import { Svg8 as Svg } from "../../svg";

const InputLabel = styled.div`
  display: block;
  margin: 0;
  padding: 0 0 8px;
  line-height: 2;
  white-space: normal;
  text-align: left;
  color: #262626;
  font-size: 16px;
  font-weight: 500;
  padding: 0 0 8px;
`;

const MyInput = styled.input`
  font-size: 16px;
  line-height: 2;
  color: #262626;
  position: relative;
  display: block;
  width: 100%;
  border-radius: 0.3rem;
  height: 2.6rem;
  padding-left: 0.4rem;
  background: #f1fafe;
`;

export function usePersonalInformation() {
  const toastController = useContext(ToastContext);
  const navigate = useNavigate();
  const [mail, setMail] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [tel, setTel] = useState(undefined);
  const [roleName, setRoleName] = useState(undefined);
  const { UserInfo, setUserInfo } = useContext(UserInfoContext);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");

      const options = {
        url: GET_INFO_BY_TOKEN,
        method: "GET",
        headers: {
          "content-type": "x-www-form-urlencoded",
          Authorization: token,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        toastController({
          mes: "登录成功!",
          timeout: 1000,
        });

        const ans = res.data.data;
        setMail(ans.email);
        setUserName(ans.userName);
        setName(ans.name);
        setLocation(ans.linkedAddress);
        setTel(ans.phone);
        setRoleName(ans.roleName);
      } else {
        toastController({
          mes: "您还未登录，先登录吧!",
          timeout: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };

    if (UserInfo === undefined) {
      fetchData();
    } else {
      setLocation(UserInfo.location);
      setMail(UserInfo.mail);
      setName(UserInfo.name);
      setRoleName(UserInfo.roleName);
      setTel(UserInfo.tel);
      setUserName(UserInfo.userName);
    }
  }, []);

  useEffect(() => {
    setUserInfo({ mail, userName, name, location, tel, roleName });
  }, [mail, userName, name, location, tel, roleName, setUserInfo]);
  return {
    mail,
    userName,
    name,
    location,
    tel,
    roleName,
    setRoleName,
    setLocation,
    setMail,
    setTel,
    setUserName,
  };
}

export default function PersonalPage() {
  const toastController = useContext(ToastContext);
  const {
    location,
    mail,
    tel,
    userName,
    name,
    roleName,
    setLocation,
    setMail,
    setTel,
    setUserName,
  } = usePersonalInformation();

  const handleInformationUpload = async () => {
    toastController({
      mes: "修改失败，若反复遇到该问题，请联系管理员",
      timeout: 3000,
    });
  };

  return (
    <>
      <BackgroundCard>
        <div className="h-full w-full min-h-0 px-6 shrink-0 flex justify-between items-center">
          {/* left */}
          <div className="h-full w-8/12 pl-8 pr-12">
            <div className="h-14 w-full text-gray-600 text-2xl select-none">
              您以{" "}
              <span className="text-blue-600 bg-gray-100 px-5 py-1 rounded">
                {name}
              </span>{" "}
              身份登录
            </div>
            <div className="h-20 w-full text-blue-400  select-none">{`[ ${roleName}账号 ]`}</div>
            {/* 昵称： */}
            <div className="w-full py-4">
              <InputLabel className="select-none">昵称：</InputLabel>
              <MyInput
                className="outline-none focus:ring-2 hover:ring-1 transition-all"
                type="text"
                value={userName !== undefined ? userName : ""}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            {/* 邮箱： */}
            <div className="w-full py-4">
              <InputLabel className="">邮箱：</InputLabel>
              <MyInput
                className="outline-none focus:ring-2 hover:ring-1 transition-all"
                type="email"
                value={mail !== undefined ? mail : ""}
                onChange={(e) => {
                  setMail(e.target.value);
                }}
              />
            </div>
            {/* 手机号码： */}
            <div className="w-full py-4">
              <InputLabel className="">手机号码：</InputLabel>
              <MyInput
                className="outline-none focus:ring-2 hover:ring-1 transition-all"
                type="text"
                value={tel !== undefined ? tel : ""}
                onChange={(e) => {
                  setTel(e.target.value);
                }}
              />
            </div>
            {/* 联系地址： */}
            <div className="w-full py-4">
              <InputLabel className="">联系地址：</InputLabel>
              <MyInput
                className="outline-none focus:ring-2 hover:ring-1 transition-all"
                type="text"
                value={location !== undefined ? location : ""}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </div>
            {/* 上传按钮 */}
            <div
              className="h-10 w-32 float-right text-blue-600 bg-red-50 rounded mt-5 select-none
            transition-all duration-700 hover:bg-red-100"
              onClick={handleInformationUpload}
            >
              <div className="h-full flex justify-center items-center gap-1">
                <Svg></Svg>
                <p>上传信息</p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="h-full w-4/12 flex-grow bg-gray-200"></div>
        </div>
      </BackgroundCard>
    </>
  );
}
