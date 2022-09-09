import React from "react";
import { useContext, useState, useEffect } from "react";
import BackgroundCard from "../../Component/BackgroundCard";

// 待审核页面
export default function ToBeReview() {
  const [list, setList] = useState([]);
  return (
    <>
      <BackgroundCard>
        <div className="h-auto w-full min-h-0 px-6 shrink-0 flex flex-col justify-start items-center">
          {list !== undefined && (
            <div className="h-36 w-full bg-pink-100 rounded "></div>
          )}
        </div>
      </BackgroundCard>
    </>
  );
}
