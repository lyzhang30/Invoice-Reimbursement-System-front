import React from "react";
import { useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../App";
import { UserInfoContext } from "../../App";
import axios from "axios";
import { LOGIN } from "../../utils/mapPath";
import loginBackgroundImg from "./../../img/FAF430C58267CAC39DB76652942_F5EAB55C_C4AC3.jpg";

export default function Login(props) {
  const ToastController = useContext(ToastContext);
  const { setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();
  const usrInput = useRef(null);
  const passwordInput = useRef(null);

  // 尝试自动登录
  // useEffect(() => {
  //   const fetch = async () => {
  //     const token = localStorage.getItem("token");
  //     const params = new URLSearchParams();
  //     params.append("userName", usrInput.current.value);
  //     params.append("password", passwordInput.current.value);
  //     const res = await axios.post(LOGIN, params);
  //     if (res.data.code === 1) {
  //       ToastController({ mes: "您已登录！一秒后返回", timeout: 1000 });
  //       setTimeout(() => {
  //         navigate(-1);
  //       }, 1000);
  //     }
  //   };
  //   fetch();
  // }, [navigate, ToastController]);

  //20lyzhang1
  //123456

  // 用户点击登录
  const login = async () => {
    if (usrInput.current.value === "" && passwordInput.current.value === "") {
      ToastController({ mes: "猪猪，还什么都没写噢~", timeout: 3000 });
      return;
    }
    if (usrInput.current.value === "") {
      ToastController({ mes: "猪猪，账号怎么为空捏~", timeout: 3000 });
      return;
    }
    if (passwordInput.current.value === "") {
      ToastController({ mes: "猪猪，密码忘记了咩~", timeout: 3000 });
      return;
    }
    const params = new URLSearchParams();
    params.append("userName", usrInput.current.value);
    params.append("password", passwordInput.current.value);
    const res = await axios.post(LOGIN, params);
    // 登陆成功
    if (res.data.code === 200) {
      ToastController({
        mes: "登录成功!",
        timeout: 1000,
      });
      localStorage.setItem("token", res.data.token);
      // console.clear();

      // console.log(res.data.data);
      // console.log(JSON.parse(JSON.stringify({ hello: "world" })));
      let ans = JSON.parse(res.data.data);
      console.log(typeof ans);
      console.log(ans.userDto.name);
      setUserInfo({
        id: ans.userDto.id,
        roleName: ans.userDto.roleName,
        name: ans.userDto.name,
        email: ans.userDto.email,
      });

      // setUserInfo({
      //   id: 15,
      //   roleName: "财务",
      //   name: "胡毅薇",
      //   email: "hywei@stu.edu.cn",
      // });

      setTimeout(() => {
        navigate("Home");
        // navigate(-1);
      }, 1000);
    }
    //登录失败
    else {
      ToastController({ mes: "账户或用户名写错啦猪猪~", timeout: 3000 });
    }
  };

  const enterLogin = (e) => {
    if (e.keyCode === 13) {
      login();
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      {/* 背景图 */}
      <div
        className=" rounded flex justify-start items-center px-52 shrink-0"
        style={{
          height: "90%",
          width: "95%",
          backgroundImage: `url(${loginBackgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // boxShadow: "-8px -8px 5px 0px rgba(200,200,200,0.8)",
        }}
      >
        <div className="h-5/6 w-5/12 min-w-fit flex flex-col justify-start items-center shrink-0 space-y-32">
          <h1 className="text-gray-600 text-7xl">汕大财务报销系统</h1>
          {/* 登录框 */}
          <div
            className="h-3/6 w-10/12 bg-gray-300 round flex flex-col justify-start items-center rounded-2xl
        bg-opacity-80 p-5 space-y-3"
            style={{
              backdropFilter: "blur(5px)",
            }}
          >
            <h2 className="text-4xl text-gray-500 my-3">登录</h2>
            <div
              className="h-20 w-full bg-pink-10 flex justify-start items-center text-gray-500 
            text-3xl space-x-5"
            >
              <p>账号:</p>
              <input
                type="text"
                ref={usrInput}
                onKeyUp={enterLogin}
                className="h-3/5 w-7/12 flex-grow px-5 text-gray-600 py-2 rounded border focus:outline-none focus:ring-2"
              />
            </div>
            <div
              className="h-20 w-full bg-pink-10 flex justify-start items-center text-gray-500 
            text-3xl space-x-5"
            >
              <p>密码:</p>
              <input
                type="text"
                ref={passwordInput}
                onKeyUp={enterLogin}
                className="h-3/5 w-7/12 flex-grow px-5 text-gray-600 py-2 rounded border focus:outline-none focus:ring-2"
              />
            </div>
            <button
              className="h-12 w-4/12 rounded outline-none bg-blue-100 hover:bg-blue-200"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
