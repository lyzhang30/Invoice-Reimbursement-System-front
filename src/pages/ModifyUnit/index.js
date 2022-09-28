import React, { useContext, useState, useEffect, useRef } from "react";
import { ToastContext } from "../../App";
import {
  POST_MODIFY_UNIT,
  POST_DELETE_UNIT,
  GET_BY_UNITNAME,
  GET_INFO_BY_TOKEN,
  GET_ALL_UNIT_TYPE,
} from "../../utils/mapPath";
import axios from "axios";
import { usePersonalInformation } from "../PersonalPage";
import { useNavigate } from "react-router-dom";

export default function ModifyUnit() {
  const navigate = useNavigate();
  const toastController = useContext(ToastContext);
  usePersonalInformation();
  const [unitTypeList, setUnitTypeList] = useState(undefined);
  const NameInput = useRef(null);
  const [id, setID] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [email, setEmail] = useState(undefined);

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

  function queryUnitInfo() {
    const getUnitInfo = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_BY_UNITNAME,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          name: NameInput.current.value,
        },
        params: {
          name: NameInput.current.value,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        setID(res.data.data.id);
        setAddress(res.data.data.address);
        setPhone(res.data.data.phone);
        setAccount(res.data.data.bankAmountId);
        setEmail(res.data.data.email);
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };

    getUnitInfo();
  }

  function handledelect() {
    const postdelect = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_DELETE_UNIT,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          id: id,
        },
        params: {
          id: id,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        toastController({
          mes: "删除成功!",
          timeout: 2000,
        });
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };

    postdelect();
  }

  function handleModify() {
    const postModify = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_MODIFY_UNIT,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          id: id,
          name: NameInput.current.value,
          address: address,
          phone: phone,
          bankAmountId: account,
          email: email,
        },
        params: {
          id: id,
          name: NameInput.current.value,
          address: address,
          phone: phone,
          bankAmountId: account,
          email: email,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        toastController({
          mes: "修改成功！",
          timeout: 2000,
        });
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };

    postModify();
  }

  const enterLogin = (e) => {
    if (e.keyCode === 13) {
      queryUnitInfo();
    }
  };

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
      <p className="inline">
        单位名称：
        <input
          ref={NameInput}
          onKeyUp={enterLogin}
          type="text"
          className="h-9 w-5/12 px-3"
        />
      </p>
      <div
        className="h-fit w-fit py-2 px-5 rounded bg-blue-200 transition-all duration-300 select-none
       hover:bg-blue-300 text-gray-800 inline-block ml-24"
        onClick={queryUnitInfo}
      >
        查询
      </div>
      <br />
      {/* 查询后显示 */}
      {id !== undefined && (
        <>
          <p className="mt-6">
            联系电话：
            <input
              value={phone !== undefined ? phone : ""}
              type="text"
              className="h-9 w-5/12 px-3"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </p>
          <br />
          <p>
            邮箱地址：
            <input
              value={email !== undefined ? email : ""}
              type="text"
              className="h-9 w-5/12 px-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </p>
          <br />
          <p>
            线下地址：
            <input
              value={address !== undefined ? address : ""}
              type="text"
              className="h-9 w-5/12 px-3"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </p>
          <br />
          <p className="inline">
            银行账号：
            <input
              value={account !== undefined ? account : ""}
              type="text"
              className="h-9 w-5/12 px-3"
              onChange={(e) => {
                setAccount(e.target.value);
              }}
            />
          </p>

          {/* 修改按钮 */}
          <div
            className="h-fit w-fit ml-24 rounded bg-amber-200 transition-all duration-300 select-none
       hover:bg-amber-300 text-gray-800 px-5 py-2 inline-block"
            onClick={handleModify}
          >
            修改
          </div>
          {/* 删除按钮 */}
          <div
            className="h-fit w-fit ml-6 rounded bg-red-200 transition-all duration-300 select-none
       hover:bg-red-300 text-gray-800 px-5 py-2 inline-block"
            onClick={handledelect}
          >
            删除
          </div>
        </>
      )}
    </div>
  );
}
