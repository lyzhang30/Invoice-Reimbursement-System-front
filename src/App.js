import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyItems from "./pages/MyItems";
import GoWrong404 from "./pages/GoWrong404";
import Toast from "./Component/Toast";

// 这个文件不要改动！！！
// 这个文件不要改动！！！
// 这个文件不要改动！！！

function App() {
  const [toastConfig, setToastConfig] = useState({});
  /**
   * 用于控制toast展示的函数，这个控制函数通过context向下传递到每一个组件里
   * 在控制函数内部实现了组件定时关闭的能力
   * @param {object} toastConfig 传入{show、timeout、mes}
   */
  const handleToastConfig = (toastConfig) => {
    let configTemp = { show: true, ...toastConfig };
    if (configTemp.timeout === undefined) configTemp.timeout = 1000;
    setToastConfig(configTemp);
    setTimeout(() => {
      configTemp.show = false;
      setToastConfig({ ...configTemp });
    }, toastConfig.timeout);
  };

  return (
    <>
      <Toast config={toastConfig} />
      <UserInfoContext.Provider value={{ role: "student" }}>
        <ToastContext.Provider value={handleToastConfig}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="Home" element={<Home />}></Route>
              <Route path="MyItems" element={<MyItems />}></Route>
              <Route path="*" element={<GoWrong404 />}></Route>
            </Routes>
          </BrowserRouter>
        </ToastContext.Provider>
      </UserInfoContext.Provider>
    </>
  );
}

export const UserInfoContext = React.createContext({});
export const ToastContext = React.createContext();
export default App;

// 这个文件不要改动！！！
// 这个文件不要改动！！！
// 这个文件不要改动！！！
