import React from "react";
import { useContext, useState, useEffect } from "react";

export default function ModifyUser() {
  const [userInfo, setUserInfo] = useState({});
  const [unitTypeList, setUnitTypeList] = useState([
    { name: "工学院", id: 1 },
    { name: "理学院", id: 2 },
  ]);
  const [unit, setUnit] = useState("");
  const [roleIdList, setRoleIdList] = useState([
    { name: "学生", id: 1 },
    { name: "管理员", id: 2 },
  ]);
  const [roleId, setRoleId] = useState(0);
  return (
    <div className="h-115 w-full p-5 bg-sky-50 relative">
      <p>
        所修改的用户账号：
        <input type="text" className="h-9 w-120 px-3" />
      </p>
      <br />
      <p>
        用户昵称：
        <input type="text" className="h-9 w-130 px-3" />
      </p>
      <br />
      <p>
        联系手机：
        <input type="text" className="h-9 w-130 px-3" />
      </p>
      <br />
      <p>
        联系地址：
        <input type="text" className="h-9 w-130 px-3" />
      </p>
      <br />
      <p>
        银行账号：
        <input type="text" className="h-9 w-130 px-3" />
      </p>
      <br />
      <p>
        所属单位：
        <select
          onChange={(e) => {
            setUnit(e.target.value);
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
        <input type="text" className="h-9 w-130 px-3" />
      </p>
      <br />
      <div
        className="h-9 w-20 rounded bg-yellow-200 transition-all duration-300 select-none
       hover:bg-yellow-300 text-gray-800 flex justify-center items-center float-right"
      >
        修改
      </div>
    </div>
  );
}
