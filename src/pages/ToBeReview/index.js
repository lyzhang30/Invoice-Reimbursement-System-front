import React from "react";
import BackgroundCard from "../../Component/BackgroundCard";

// 待审核页面
export default function ToBeReview() {
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
