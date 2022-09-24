// import styled from "styled-components";
// import BackgroundCard from "../../Component/BackgroundCard";
// import { UserInfoContext } from "../../App";

//接口
// import React, { useContext, useState, useEffect } from "react";
// import { ToastContext } from "../../App";
// import {
//   GET_INFO_BY_TOKEN,
//   UPDATE_USER,
//   GET_ALL_PROJECT,
// } from "../../utils/mapPath";
// import axios from "axios";
// import { usePersonalInformation } from "../PersonalPage";
// import { Link, useLocation, useNavigate,useParams } from "react-router-dom";

//请求
// const navigate = useNavigate();
// const toastController = useContext(ToastContext);

// usePersonalInformation();

// useEffect(() => {
//   const fetchData = async () => {
//     let token = localStorage.getItem("token");
//     const options = {
//       url: GET_ALL_PROJECT,
//       method: "GET",
//       headers: {
//         "content-type": "application/x-www-form-urlencoded",
//         Authorization: token,
//       },
//       data: {
//         Authorization: token,
//       },
//       params: {
//         id: id,
//       },
//     };
//     const res = await axios(options);

//     if (res.data.code === 200) {
//       setList(res.data.data);
//
//     } else {
//     toastController({
//         mes: "请求失败!",
//         timeout: 1000,
//       });
//     }
//   };

//   fetchData();
// }, []);

// //======
// import StuLogo from "../../img/R-C.png";
// import Svg1, { Svg2, Svg3, Svg4, Svg5 } from "../../svg";
// import TopNav from "../TopNav";

// import React from "react";
// import { useContext, useState, useEffect } from "react";
// import BackgroundCard from "../../Component/BackgroundCard";

// // 待审核页面
// export default function ToBeReview() {
//   const [list, setList] = useState([]);
//   return (
//     <>
//       <BackgroundCard>
//         <div className="h-auto w-full min-h-0 px-6 shrink-0 flex flex-col justify-start items-center">
//           {list !== undefined && (
//             <div className="h-36 w-full bg-pink-100 rounded "></div>
//           )}
//         </div>
//       </BackgroundCard>
//     </>
//   );
// }
