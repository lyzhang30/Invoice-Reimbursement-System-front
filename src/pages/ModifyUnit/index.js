import React, { useContext, useState, useEffect, useRef } from "react";
import { ToastContext } from "../../App";
import {
  POST_MODIFY_UNIT,
  POST_DELETE_UNIT,
  GET_BY_UNITNAME,
  GET_INFO_BY_TOKEN,
} from "../../utils/mapPath";
import axios from "axios";
import { usePersonalInformation } from "../PersonalPage";
import { useNavigate } from "react-router-dom";

export default function ModifyUnit() {
  const navigate = useNavigate();
  const toastController = useContext(ToastContext);
  usePersonalInformation();

  const NameInput = useRef(null);
  const [id, setID] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [account, setAccount] = useState(undefined);

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
          name: NameInput,
          address: address,
          phone: phone,
          bankAmountId: account,
        },
        params: {
          id: id,
          name: NameInput,
          address: address,
          phone: phone,
          bankAmountId: account,
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
      <div
        className="h-9 w-20 mr-72 rounded bg-blue-200 transition-all duration-300 select-none
       hover:bg-blue-300 text-gray-800 flex justify-center items-center float-right"
        onClick={queryUnitInfo}
      >
        查询
      </div>
      <p>
        单位名称：
        <input
          ref={NameInput}
          onKeyUp={enterLogin}
          type="text"
          className="h-9 w-5/12 px-3"
        />
      </p>
      <br />
      {/* 查询后显示 */}
      {id !== undefined && (
        <>
          <p>
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
          <p>
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
          <br />

          <div
            className="h-9 w-20 mr-48 rounded bg-red-200 transition-all duration-300 select-none
       hover:bg-red-300 text-gray-800 flex justify-center items-center float-right"
            onClick={handledelect}
          >
            删除
          </div>
          <div
            className="h-9 w-20 mr-5 rounded bg-yellow-200 transition-all duration-300 select-none
       hover:bg-yellow-300 text-gray-800 flex justify-center items-center float-right"
            onClick={handleModify}
          >
            修改
          </div>
        </>
      )}
    </div>
  );
}
