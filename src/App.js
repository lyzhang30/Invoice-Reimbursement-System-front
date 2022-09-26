import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Toast from "./Component/Toast";

const Home = lazy(() => import("./pages/Home"));
const MyItems = lazy(() => import("./pages/MyItems"));
const ToBeReview = lazy(() => import("./pages/ToBeReview"));
const Loading = lazy(() => import("./pages/Loading"));
const GoWrong404 = lazy(() => import("./pages/GoWrong404"));
const PersonalPage = lazy(() => import("./pages/PersonalPage"));
const Project = lazy(() => import("./pages/Project"));
const Apply = lazy(() => import("./pages/Apply"));
const Examine = lazy(() => import("./pages/Examine"));
const ProjectManagement = lazy(() => import("./pages/ProjectManagement"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const ProjectModify = lazy(() => import("./pages/ProjectModify"));
const AddUser = lazy(() => import("./pages/AddUser"));
const SelectUser = lazy(() => import("./pages/SelectUser"));
const ModifyUser = lazy(() => import("./pages/ModifyUser"));

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
                <Route path="PersonalPage" element={<PersonalPage />}></Route>

                {/* <Route path="Home" element={<Apply />}></Route> */}
                <Route path="Home" element={<Home />}></Route>
                <Route path="MyItems" element={<MyItems />}></Route>
                <Route path="ToBeReview" element={<ToBeReview />}></Route>

                <Route path="Project/:id" element={<Project />}></Route>
                <Route path="Apply/:id" element={<Apply />}></Route>
                <Route path="Examine/:id" element={<Examine />}></Route>
                <Route
                  path="ProjectManagement"
                  element={<ProjectManagement />}
                ></Route>
                <Route
                  path="ProjectModify/:id"
                  element={<ProjectModify />}
                ></Route>
                {/* 账户管理 */}
                <Route path="UserManagement" element={<UserManagement />}>
                  <Route path="AddUser" element={<AddUser />} />
                  <Route path="SelectUser" element={<SelectUser />} />
                  <Route path="ModifyUser" element={<ModifyUser />} />
                </Route>
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
