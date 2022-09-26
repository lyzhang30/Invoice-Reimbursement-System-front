import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "./../../img/img15.jpg";

export default function TopNav(props) {
  const [time, setTime] = useState("");
  function getTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    setTime((time) => {
      return (time = `${year} 年 ${month} 月 ${day} 日 ${hour} ：${
        minute < 10 ? "0" : ""
      }${minute}`);
    });
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      getTime();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div
      className="h-full w-full px-32 flex justify-between items-center shrink-0 select-none"
      style={{ backgroundColor: "#001529" }}
    >
      {/* 时间 */}
      <div className="h-3/5 w-3/12 flex justify-center items-center bg-gray-600 text-gray-50 shrink-0">
        {time}
      </div>
      {/* 右边栏 */}
      <div className="h-full w-7/12 flex justify-end items-center shrink-0  space-x-6">
        {/* outlook */}
        <div
          className="h-9 w-9 rounded-full bg-gray-200 transition-all duration-500 hover:w-32
           flex justify-start items-center overflow-hidden group space-x-3"
        >
          <div
            className="h-9 w-9 flex justify-center items-center rounded-full shrink-0 transition-all duration-100
           border-gray-50 border-2"
          >
            <OutlookSvg></OutlookSvg>
          </div>
          <a
            className="text-gray-200 transition-all duration-500 group-hover:text-gray-800 shrink-0"
            href="https://partner.outlook.cn/mail/"
          >
            outlook
          </a>
        </div>
        {/* 头像 */}
        <div
          className="h-9 w-9 rounded-full bg-gray-200 transition-all duration-500 hover:w-32
           flex justify-start items-center overflow-hidden group space-x-2"
        >
          <div
            className="h-9 w-9 rounded-full shrink-0 transition-all duration-100 border-gray-50 group-hover:border-2"
            style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <Link
            to={"/PersonalPage"}
            className="text-gray-200 transition-all duration-500 group-hover:text-gray-800 shrink-0"
          >
            个人信息
          </Link>
        </div>
      </div>
    </div>
  );
}

function OutlookSvg() {
  return (
    <svg
      t="1662530996282"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1376"
      width="21"
      height="21"
    >
      <path
        d="M896 42.666667H341.333333c-25.6 0-42.666667 17.066667-42.666666 42.666666v42.666667l341.333333 106.666667L938.666667 128V85.333333c0-25.6-17.066667-42.666667-42.666667-42.666666z"
        fill="#0364B8"
        p-id="1377"
      ></path>
      <path
        d="M1024 507.733333c0-8.533333-4.266667-17.066667-12.8-21.333333l-366.933333-209.066667s-4.266667 0-4.266667-4.266666c-8.533333-4.266667-12.8-4.266667-21.333333-4.266667s-17.066667 0-21.333334 4.266667c0 0-4.266667 0-4.266666 4.266666l-366.933334 209.066667c-8.533333 4.266667-12.8 12.8-12.8 21.333333s4.266667 17.066667 12.8 21.333334l366.933334 209.066666s4.266667 0 4.266666 4.266667c8.533333 4.266667 12.8 4.266667 21.333334 4.266667s17.066667 0 21.333333-4.266667c0 0 4.266667 0 4.266667-4.266667l366.933333-209.066666c8.533333-4.266667 12.8-12.8 12.8-21.333334z"
        fill="#0A2767"
        p-id="1378"
      ></path>
      <path
        d="M640 128H298.666667v298.666667l341.333333 341.333333h298.666667v-341.333333z"
        fill="#28A8EA"
        p-id="1379"
      ></path>
      <path
        d="M1006.933333 972.8L226.133333 529.066667"
        fill="#35B8F1"
        p-id="1380"
      ></path>
      <path
        d="M640 128h298.666667v298.666667h-298.666667z"
        fill="#50D9FF"
        p-id="1381"
      ></path>
      <path
        d="M298.666667 426.666667h341.333333v426.666666H298.666667z"
        fill="#0078D4"
        p-id="1382"
      ></path>
      <path
        d="M618.666667 832l-392.533334-302.933333 21.333334-38.4s362.666667 209.066667 366.933333 209.066666h8.533333c4.266667-4.266667 362.666667-204.8 362.666667-204.8l21.333333 38.4-388.266666 298.666667z"
        fill="#0A2767"
        opacity=".5"
        p-id="1383"
      ></path>
      <path
        d="M593.066667 738.133333zM1011.2 529.066667l-362.666667 209.066666-8.533333 4.266667c-8.533333 4.266667-12.8 4.266667-21.333333 4.266667s-17.066667-4.266667-21.333334-4.266667l119.466667 166.4 290.133333 68.266667c12.8-8.533333 17.066667-21.333333 17.066667-34.133334V507.733333c0 8.533333-4.266667 17.066667-12.8 21.333334z"
        fill="#1490DF"
        p-id="1384"
      ></path>
      <path
        d="M1024 938.666667l-362.666667-209.066667-12.8 8.533333-8.533333 4.266667c-8.533333 4.266667-12.8 4.266667-21.333333 4.266667s-12.8-4.266667-17.066667-4.266667l170.666667 153.6 238.933333 76.8c4.266667-8.533333 12.8-21.333333 12.8-34.133333z"
        opacity=".1"
        p-id="1385"
      ></path>
      <path
        d="M593.066667 738.133333L298.666667 563.2l-72.533334-34.133333c-8.533333-4.266667-12.8-12.8-12.8-21.333334V938.666667c0 25.6 21.333333 42.666667 42.666667 42.666666h716.8c12.8 0 21.333333 0 34.133333-8.533333l-413.866666-234.666667z"
        fill="#28A8EA"
        p-id="1386"
      ></path>
      <path
        d="M580.266667 853.333333c29.866667 0 59.733333-29.866667 59.733333-59.733333V307.2c0-29.866667-21.333333-51.2-51.2-51.2H298.666667v192l-72.533334 42.666667c-8.533333 4.266667-12.8 8.533333-12.8 17.066666V853.333333h366.933334z"
        opacity=".5"
        p-id="1387"
      ></path>
      <path
        d="M546.133333 810.666667H51.2C21.333333 810.666667 0 789.333333 0 759.466667V264.533333C0 234.666667 21.333333 213.333333 51.2 213.333333h499.2c25.6 0 46.933333 21.333333 46.933333 51.2v499.2c0 25.6-21.333333 46.933333-51.2 46.933334z"
        fill="#0078D4"
        p-id="1388"
      ></path>
      <path
        d="M157.866667 426.666667c12.8-25.6 29.866667-46.933333 55.466666-64 25.6-12.8 55.466667-21.333333 89.6-21.333334 29.866667 0 59.733333 8.533333 81.066667 21.333334 25.6 12.8 42.666667 34.133333 55.466667 59.733333 12.8 25.6 17.066667 55.466667 17.066666 85.333333 0 34.133333-8.533333 64-21.333333 89.6-8.533333 29.866667-29.866667 51.2-51.2 64-25.6 12.8-55.466667 21.333333-85.333333 21.333334-34.133333 0-59.733333-8.533333-85.333334-21.333334-25.6-12.8-42.666667-34.133333-55.466666-59.733333-12.8-25.6-21.333333-55.466667-21.333334-85.333333 0-34.133333 8.533333-64 21.333334-89.6z m59.733333 145.066666c8.533333 17.066667 17.066667 29.866667 29.866667 42.666667 12.8 8.533333 29.866667 12.8 51.2 12.8s38.4-4.266667 51.2-17.066667c12.8-8.533333 25.6-25.6 29.866666-42.666666 8.533333-12.8 12.8-34.133333 12.8-55.466667s-4.266667-38.4-8.533333-55.466667-17.066667-29.866667-29.866667-42.666666c-17.066667-12.8-34.133333-17.066667-55.466666-17.066667s-38.4 4.266667-51.2 17.066667c-12.8 8.533333-25.6 25.6-34.133334 42.666666-4.266667 12.8-8.533333 34.133333-8.533333 55.466667s4.266667 42.666667 12.8 59.733333z"
        fill="#FFFFFF"
        p-id="1389"
      ></path>
    </svg>
  );
}
