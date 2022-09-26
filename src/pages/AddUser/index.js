import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { ToastContext } from "../../App";
import {
  GET_UNIT_TYPE,
  GET_ROLE_TYPE,
  POST_ADD_A_USER,
} from "../../utils/mapPath";
import axios from "axios";

export default function AddUser() {
  const toastController = useContext(ToastContext);
  const [unitTypeList, setUnitTypeList] = useState([]);
  const [unitId, setUnitId] = useState(undefined);
  const [roleIdList, setRoleIdList] = useState([]);
  const [roleId, setRoleId] = useState(undefined);

  const userNameInput = useRef(null);
  const nameInput = useRef(null);
  const phoneInput = useRef(null);
  const addressInput = useRef(null);
  const passwordInput = useRef(null);
  const accountInput = useRef(null);
  const emailInput = useRef(null);

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

    fetchData1();
    fetchData2();
  }, []);

  function handleAdd() {
    const postNewUser = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_ADD_A_USER,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
        data: {
          bankAmountId: accountInput.current.value,
          email: emailInput.current.value,
          linkedAddress: addressInput.current.value,
          name: nameInput.current.value,
          phone: phoneInput.current.value,
          userName: userNameInput.current.value,
          roleId: roleId,
          unitId: unitId,
          password: passwordInput.current.value,
        },
      };
      const res = await axios(options);
      if (res.data.code === 200) {
        toastController({
          mes: "新增用户成功！",
          timeout: 2000,
        });
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };
    postNewUser();
  }

  return (
    <div className="h-115 w-full p-5 bg-sky-50 relative">
      <p>
        用户账号：
        <input ref={userNameInput} type="text" className="h-8 w-130 px-3" />
      </p>
      <br />
      <p>
        用户昵称：
        <input ref={nameInput} type="text" className="h-8 w-130 px-3" />
      </p>
      <br />
      <p>
        邮箱地址：
        <input ref={emailInput} type="text" className="h-8 w-130 px-3" />
      </p>
      <br />
      <p>
        联系手机：
        <input ref={phoneInput} type="text" className="h-8 w-130 px-3" />
      </p>
      <br />
      <p>
        联系地址：
        <input ref={addressInput} type="text" className="h-8 w-130 px-3" />
      </p>
      <br />
      <p>
        银行账号：
        <input ref={accountInput} type="text" className="h-8 w-130 px-3" />
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
              <option value={type.id} className="h-8">
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
              <option value={role.id} className="h-8">
                {role.name}
              </option>
            );
          })}
        </select>
      </p>
      <br />
      <p>
        账号密码：
        <input ref={passwordInput} type="text" className="h-8 w-130 px-3" />
      </p>

      <div
        className="h-9 w-20 rounded bg-yellow-200 transition-all duration-300 select-none
       hover:bg-yellow-300 text-gray-800 flex justify-center items-center float-right"
        onClick={handleAdd}
      >
        添加
      </div>
    </div>
  );
}
