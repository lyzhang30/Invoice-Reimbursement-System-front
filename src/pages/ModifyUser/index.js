import React, { useContext, useState, useEffect, useRef } from "react";
import { ToastContext } from "../../App";
import {
  GET_BY_USERNAME,
  GET_UNIT_TYPE,
  GET_ROLE_TYPE,
  POST_MODIFY_USER,
  POST_DELETE_USER,
  GET_INFO_BY_TOKEN,
} from "../../utils/mapPath";
import axios from "axios";
// import { usePersonalInformation } from "../PersonalPage";
import { useNavigate } from "react-router-dom";

export default function ModifyUser() {
  const navigate = useNavigate();
  const [unitTypeList, setUnitTypeList] = useState([]);
  const [unitId, setUnitId] = useState(0);
  const [roleIdList, setRoleIdList] = useState([]);
  const [roleId, setRoleId] = useState(0);
  const toastController = useContext(ToastContext);

  const userNameInput = useRef(null);

  const [name, setName] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  useEffect(() => {
    //获取单位类型
    const fetchData1 = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_UNIT_TYPE,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
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
    //获取角色类型
    const fetchData2 = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_ROLE_TYPE,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        setRoleIdList(res.data.data);
      } else {
        toastController({
          mes: res.data.message,
          timeout: 1000,
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
    fetchData1();
    fetchData2();
  }, []);

  function queryUserInfo() {
    const getUserInfo = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_BY_USERNAME,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          userName: userNameInput.current.value,
        },
        params: {
          userName: userNameInput.current.value,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        setName(res.data.data[0].name);
        setAddress(res.data.data[0].linkedAddress);
        setPhone(res.data.data[0].phone);
        setAccount(res.data.data[0].bankAmountId);
        setPassword(res.data.data[0].password);
        setUnitId(res.data.data[0].unitId);
        setRoleId(res.data.data[0].roleId);
        console.log(res.data.data[0].name);
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };

    getUserInfo();
  }

  function handleModify() {
    const postModify = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_MODIFY_USER,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          userName: userNameInput.current.value,
          name: name,
          linkedAddress: address,
          phone: phone,
          bankAmountId: account,
          password: password,
          unitId: unitId,
          roleId: roleId,
        },
        params: {
          userName: userNameInput.current.value,
          name: name,
          linkedAddress: address,
          phone: phone,
          bankAmountId: account,
          password: password,
          unitId: unitId,
          roleId: roleId,
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
        setName(undefined);
      }
    };

    postModify();
  }

  const enterQuery = (e) => {
    if (e.keyCode === 13) {
      queryUserInfo();
    }
  };

  function handledelect() {
    const postdelect = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_DELETE_USER,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          userName: userNameInput.current.value,
        },
        params: {
          userName: userNameInput.current.value,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        toastController({
          mes: "删除成功",
          timeout: 2000,
        });
        setName(undefined);
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };

    postdelect();
  }

  return (
    <div className="h-115 w-full p-5 bg-sky-50 relative">
      <div
        className="h-9 w-20 mr-52 rounded bg-blue-200 transition-all duration-300 select-none
       hover:bg-blue-300 text-gray-800 flex justify-center items-center float-right"
        onClick={queryUserInfo}
      >
        查询
      </div>
      <p>
        用户账号：
        <input
          ref={userNameInput}
          onKeyUp={enterQuery}
          type="text"
          className="h-9 w-5/12 px-3"
        />
      </p>
      <br />
      {/* 查询后显示 */}
      {name !== undefined && (
        <>
          <p>
            用户昵称：
            <input
              value={name !== undefined ? name : ""}
              type="text"
              className="h-9 w-5/12 px-3"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </p>
          <br />
          <p>
            联系手机：
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
            联系地址：
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
          <p>
            所属单位：
            <select
              onChange={(e) => {
                setUnitId(e.target.value);
              }}
            >
              <option value="" className="h-8"></option>
              {unitTypeList.map((type) => {
                return (
                  <option
                    value={type.id}
                    selected={`${type.id === unitId ? "selected" : ""}`}
                    className="h-8"
                  >
                    {type.name}
                  </option>
                );
              })}
            </select>
          </p>
          <br />
          <p>
            账号角色：
            <select
              onChange={(e) => {
                setRoleId(e.target.value);
              }}
            >
              <option value="" className="h-8"></option>
              {roleIdList.map((role) => {
                return (
                  <option
                    value={role.id}
                    selected={`${role.id === roleId ? "selected" : ""}`}
                    className="h-8"
                  >
                    {role.name}
                  </option>
                );
              })}
            </select>
          </p>
          <br />
          <p>
            账号密码：
            <input
              value={password !== undefined ? password : ""}
              type="text"
              className="h-9 w-5/12 px-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </p>
          <br />
          <div
            className="h-9 w-20 mr-28  rounded bg-red-200 transition-all duration-300 select-none
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
