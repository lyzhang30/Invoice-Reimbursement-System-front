import React from "react";

export default function DeleteUser() {
  return (
    <div className="h-115 w-full p-5 bg-sky-50 relative">
      <p>
        所删除的用户账号：
        <input type="text" className="h-9 w-120 px-3" />
      </p>
      <br />
      <div
        className="h-9 w-20 rounded bg-red-200 transition-all duration-300 select-none
       hover:bg-red-300 text-gray-800 flex justify-center items-center float-right"
      >
        删除
      </div>
    </div>
  );
}
