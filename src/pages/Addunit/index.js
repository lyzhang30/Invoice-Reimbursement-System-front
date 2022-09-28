import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../App";
import {
  POST_ADD_A_UNIT,
  GET_ALL_UNIT_TYPE,
  GET_INFO_BY_TOKEN,
} from "../../utils/mapPath";
import RandomColor from "../../utils/random";
import axios from "axios";

export default function Addunit() {
  const navigate = useNavigate();
  const toastController = useContext(ToastContext);
  const [unitTypeList, setUnitTypeList] = useState(undefined);
  const nameInput = useRef(null);
  const phoneInput = useRef(null);
  const addressInput = useRef(null);
  const accountInput = useRef(null);
  const emailInput = useRef(null);

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

  useEffect(() => {
    const getUnitType = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_ALL_UNIT_TYPE,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      };
      const res = await axios(options);
      if (res.data.code === 200) {
        setUnitTypeList(res.data.data);
      } else {
        toastController({
          mes: res.data.message,
          timeout: 1000,
        });
      }
    };

    getUnitType();
  }, []);

  function handleAddunit() {
    const postNewUnit = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_ADD_A_UNIT,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          bankAmountId: accountInput.current.value,
          email: emailInput.current.value,
          address: addressInput.current.value,
          name: nameInput.current.value,
          phone: phoneInput.current.value,
        },
        params: {
          bankAmountId: accountInput.current.value,
          email: emailInput.current.value,
          address: addressInput.current.value,
          name: nameInput.current.value,
          phone: phoneInput.current.value,
        },
      };
      const res = await axios(options);
      if (res.data.code === 200) {
        toastController({
          mes: "新增成功！",
          timeout: 2000,
        });
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };
    postNewUnit();
  }

  return (
    <div className="h-115 w-full p-5 bg-sky-50 relative">
      {unitTypeList !== undefined && (
        <div className="mb-10 ">
          <p className="mb-2">已有单位：</p>
          {unitTypeList.map((item) => {
            // let color = `bg-${RandomColor()}-200`;
            return (
              <div
                className={`h-fit w-fit px-2 py-1 inline-block rounded  mx-2 my-2 text-gray-600 bg-red-100`}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
      <p>
        新增单位：
        <input ref={nameInput} type="text" className="h-8 w-5/12 px-3" />
      </p>
      <br />
      <p>
        线下地址：
        <input ref={addressInput} type="text" className="h-8 w-5/12 px-3" />
      </p>
      <br />
      <p>
        邮箱地址：
        <input ref={emailInput} type="text" className="h-8 w-5/12 px-3" />
      </p>
      <br />
      <p>
        单位电话：
        <input ref={phoneInput} type="text" className="h-8 w-5/12 px-3" />
      </p>
      <br />
      <p className="inline">
        银行账号：
        <input ref={accountInput} type="text" className="h-8 w-5/12 px-3" />
      </p>
      <div
        className="h-fit w-fit ml-24 rounded inline-block bg-amber-200 transition-all duration-300 select-none
       hover:bg-yellow-300 text-gray-800 px-5 py-2 "
        onClick={handleAddunit}
      >
        添加
      </div>
    </div>
  );
}
