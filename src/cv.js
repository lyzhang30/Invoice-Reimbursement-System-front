import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import BackgroundCard from "../../Component/BackgroundCard";
import { ToastContext } from "../../App";
import { UserInfoContext } from "../../App";
import { GET_INFO_BY_TOKEN, UPDATE_USER } from "../../utils/mapPath";
import { Svg8 as Svg } from "../../svg";
import { usePersonalInformation } from "./pages/PersonalPage";
import { Link, useLocation } from "react-router-dom";
import StuLogo from "../../img/R-C.png";
import Svg1, { Svg2, Svg3, Svg4, Svg5 } from "../../svg";
import TopNav from "../TopNav";

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
