import React from "react";
import { Link } from "react-router-dom";

//模板中项目卡片
//props: name , content , startTime , endTime
export default function ItemCard(props) {
  return (
    <div
      className="h-60 w-full  flex-col justify-between items-start p-5
     bg-blue-50 rounded transition-all duration-200 hover:bg-blue-100"
    >
      <Link
        to={`/Home`}
        className="h-12 max-w-full shrink-0 grow-0 block text-blue-600 text-3xl 
       font-bold truncate px-5 transition-all duration-200 hover:scale-x-110 hover:translate-x-3 hover:text-gray-700"
      >
        大创
      </Link>
      <p className="block h-10 px-5 font-bold text-lg text-gray-700">
        申请详情：
      </p>
      <div
        className="h-20 py-1 px-2 w-full flex-grow select-none block 
        bg-white overflow-hidden break-all text-gray-500"
      >
        软件基础设计软件基础设计软件基础设计软件基础设计软
        件基础设计软件基础设计软件基础设计软件基础设计软件基础设计
        软件基础设计软件基础设计软件基础设计软件基础设计软
        件基础设计软件基础设计软件基础设计软件基础设计软件基础设计
      </div>

      <div className="h-8 mt-2 text-gray-600 select-none float-right">
        2022-09-01 至 2022-09-10
      </div>
    </div>
  );
}
