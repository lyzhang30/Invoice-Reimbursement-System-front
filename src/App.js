import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import Home from "./pages/Home";
// import MyItems from "./pages/MyItems";
// import ToBeReview from "./pages/ToBeReview";
// import Loading from "./pages/Loading";
// import GoWrong404 from "./pages/GoWrong404";
import Toast from "./Component/Toast";

const Home = lazy(() => import("./pages/Home"));
const MyItems = lazy(() => import("./pages/MyItems"));
const ToBeReview = lazy(() => import("./pages/ToBeReview"));
const Loading = lazy(() => import("./pages/Loading"));
const GoWrong404 = lazy(() => import("./pages/GoWrong404"));
const PersonalPage = lazy(() => import("./pages/PersonalPage"));

// const  = lazy(() => import(""));
// const  = lazy(() => import(""));
// const  = lazy(() => import(""));
// 这个文件不要改动！！！
// 这个文件不要改动！！！
// 这个文件不要改动！！！

function App() {
  const [toastConfig, setToastConfig] = useState({});
  const [UserInfo, setUserInfo] = useState();
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
      {/* 管理员  财务  单位  用户 */}
      <UserInfoContext.Provider
        value={{
          UserInfo: UserInfo,
          setUserInfo: setUserInfo,
        }}
      >
        <ToastContext.Provider value={handleToastConfig}>
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="Home" element={<Home />}></Route>
                <Route path="MyItems" element={<MyItems />}></Route>
                <Route path="PersonalPage" element={<PersonalPage />}></Route>
                <Route path="ToBeReview" element={<ToBeReview />}></Route>
                <Route path="MyItems" element={<MyItems />}></Route>
                <Route path="*" element={<GoWrong404 />}></Route>
              </Routes>
            </BrowserRouter>
          </Suspense>
        </ToastContext.Provider>
      </UserInfoContext.Provider>
    </>
  );
}

export const UserInfoContext = React.createContext();
export const ToastContext = React.createContext();
export default App;

// 这个文件不要改动！！！
// 这个文件不要改动！！！
// 这个文件不要改动！！！
