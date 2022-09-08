import React from "react";
import { useState, useContext } from "react";
import BackgroundCard from "../../Component/BackgroundCard";

// 我的申请页面（只有身份为student才可看到）
export default function MyItems() {
  return (
    <>
      <BackgroundCard>
        <div
          className="h-auto w-full min-h-0  shrink-0 grid grid-flow-row grid-cols-4
         gap-14 auto-cols-fr place-items-center"
        ></div>
      </BackgroundCard>
    </>
  );
}
