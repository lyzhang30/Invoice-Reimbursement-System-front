import React from "react";
import { useState, useContext } from "react";
import BackgroundCard from "../../Component/BackgroundCard";

// 我的申请页面（只有身份为student才可看到）
export default function MyItems() {
  const [list, setList] = useState([]);
  return (
    <>
      <BackgroundCard>
        <div className="h-auto w-full min-h-0  shrink-0 flex flex-col justify-start items-center">
          {list !== undefined && (
            <div className="h-36 w-full bg-pink-100 rounded "></div>
          )}
        </div>
      </BackgroundCard>
    </>
  );
}
