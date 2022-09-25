import React, { useContext, useState, useEffect, useRef } from "react";
import { ToastContext } from "../../App";
import {
  POST_REMOVE_A_PROJECT,
  GET_ALL_PROJECT,
  POST_ADD_A_PROJECT,
  POST_UPLOAD_FILE,
} from "../../utils/mapPath";
import axios from "axios";
import { usePersonalInformation } from "../PersonalPage";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BackSvg, AddSvg, CancelSvg, SubmitSvg, CloseSvg } from "../../svg";
import BackgroundCard from "../../Component/BackgroundCard";
import ItemCard from "../../Component/ItemCard";

// TODO:获取所有项目的列表
export default function ProjectManagement() {
  const navigate = useNavigate();
  const toastController = useContext(ToastContext);
  const [list, setList] = useState([]);
  const [showAddWin, setShowAddWin] = useState(false);
  const [filePath, setFilePath] = useState("");

  const categoryNameInput = useRef(null);
  const applyCategoryInput = useRef(null);
  const stInput = useRef(null);
  const etInput = useRef(null);
  // const pathInput = useRef(null);
  const remarkInput = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_ALL_PROJECT,
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          Authorization: token,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        setList(res.data.data);
        console.log(res.data.data);
      } else {
        toastController({
          mes: "请求失败!",
          timeout: 1000,
        });
      }
    };

    fetchData();
  }, [toastController, showAddWin]);

  function handleAdd() {
    setShowAddWin(true);
  }

  function handleDelete(id) {
    const fun = async () => {
      let token = localStorage.getItem("token");
      console.log(id);
      const options = {
        url: POST_REMOVE_A_PROJECT,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          id: id,
        },
        params: {
          id: id,
        },
      };
      const res = await axios(options);
      if (res.data.code === 200) {
        toastController({
          mes: "撤销成功!",
          timeout: 1000,
        });
      } else {
        toastController({
          mes: "撤销失败!",
          timeout: 1000,
        });
      }
      //回到我的申请页面
      setTimeout(() => {
        navigate("/MyItems");
      }, 1000);
    };
    fun();
  }

  const handleExitAdd = () => {
    setShowAddWin(false);
  };

  const handleDetermineAdd = () => {
    const postAddNewProject = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_ADD_A_PROJECT,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          categoryName: categoryNameInput.current.value,
          applyCategory: `${
            applyCategoryInput.current.value === "是" ? "0" : "1"
          }`,
          st: stInput.current.value,
          et: etInput.current.value,
          remark: remarkInput.current.value,
          path: filePath,
        },
        params: {
          categoryName: categoryNameInput.current.value,
          applyCategory: `${
            applyCategoryInput.current.value === "是" ? "0" : "1"
          }`,
          st: stInput.current.value,
          et: etInput.current.value,
          remark: remarkInput.current.value,
          path: filePath,
        },
      };
      const res = await axios(options);
      toastController({
        mes: res.data.message,
        timeout: 1000,
      });
    };
    postAddNewProject();
    setShowAddWin(false);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    let file = document.querySelector("#filePath");
    let formData = new FormData();
    let temp = file.files[0];
    formData.append("file", temp);

    const fetchData = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_UPLOAD_FILE,
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
        data: formData,
      };
      const res = await axios(options);
      if (res.data.code === 200) {
        setFilePath(res.data.data);
        toastController({
          mes: "上传成功！",
          timeout: 1000,
        });
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };

    fetchData();
  };

  return (
    <>
      <BackgroundCard>
        <div
          className="h-auto w-full min-h-0  shrink-0 grid grid-flow-row grid-cols-2
         gap-10 auto-cols-fr place-items-center "
        >
          {/* 添加报销项目弹出窗口 */}
          {showAddWin && (
            <div
              className="absolute h-screen w-screen bg-gray-400 bg-opacity-60 backdrop-blur-xxs
        flex flex-col items-center pt-0 z-10 top-0 left-0"
            >
              <div className=" h-full w-7/12 bg-gray-50 rounded-tr-2xl pl-6 ">
                <div
                  className="h-fit w-fit float-right bg-purple-20"
                  onClick={handleExitAdd}
                >
                  <CloseSvg size={52}></CloseSvg>
                </div>
                <div className="h-8 w-52"></div>
                <p>
                  报销项目名称：
                  <input
                    ref={categoryNameInput}
                    type="text"
                    className="h-9 w-130 bg-sky-50 px-3"
                  />
                </p>
                <br />
                <p>
                  是否经学院审批：
                  <input
                    ref={applyCategoryInput}
                    type="text"
                    className="h-9 w-20 bg-sky-50 px-3"
                  />
                  （ 请填 “是” 或 “否” ）
                </p>
                <br />
                <p>
                  开始时间：
                  <input
                    ref={stInput}
                    type="datetime-local"
                    className="h-9 w-130 bg-sky-50 px-3"
                  />
                </p>
                <br />
                <p>
                  结束时间：
                  <input
                    ref={etInput}
                    type="datetime-local"
                    className="h-9 w-130 bg-sky-50 px-3"
                  />
                </p>
                <br />
                <p>
                  附加文件：
                  <input
                    id="filePath"
                    type="file"
                    className="h-8 w-96 bg-sky-50"
                    onChange={uploadFile}
                  />
                  <span className="text-red-600">
                    （ 文件大小不可超过 10 兆 ）
                  </span>
                </p>
                <br />
                <p>申请详情：</p>
                <textarea
                  cols="105"
                  rows="15"
                  ref={remarkInput}
                  className="p-3 h-72 w-11/12 bg-sky-50 mt-2"
                ></textarea>
                <p className="text-red-700 w-fit m-0">注意：所有均为必填项</p>
                {/* 确定按钮 */}
                <div
                  className="h-9 w-20 bg-sky-100 rounded-sm float-right mr-3 mt-2 transition-all 
              duration-300 hover:bg-sky-200 flex justify-center items-center select-none "
                  onClick={handleDetermineAdd}
                >
                  确定
                </div>
              </div>
            </div>
          )}

          {/* 添加报销项目按钮 */}
          <div
            className="h-60 w-full p-5 flex justify-center items-center opacity-30 space-x-5
             bg-blue-300 rounded transition-all duration-200 hover:bg-blue-400 text-5xl select-none"
            onClick={handleAdd}
          >
            <AddSvg size={150}></AddSvg>
            添加报销项目
          </div>
          {list !== undefined &&
            list.length > 0 &&
            list.map((item) => {
              return (
                <div
                  className="h-60 w-full p-5 relative select-none
             bg-blue-50 rounded transition-all duration-200 hover:bg-blue-100"
                >
                  <div
                    className="h-12 w-fit max-w-full text-blue-600 text-3xl 
               font-bold truncate px-5 transition-all duration-200 hover:scale-x-110 hover:translate-x-3 hover:text-gray-700"
                  >
                    {item.categoryName}
                  </div>
                  {/* 删除按钮 */}
                  <div
                    className="h-9 w-fit absolute flex justify-center items-center bg-red-200
                   rounded px-3 top-6 right-5 select-none transition-all duration-300 hover:bg-red-300"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    删除
                  </div>
                  {/* 修改按钮 */}
                  <div
                    className="h-9 w-fit absolute flex justify-center items-center bg-amber-200
                   rounded px-3 top-6 right-24 select-none transition-all duration-300 hover:bg-amber-300"
                    onClick={() => {
                      navigate(`/ProjectModify/${item.id}`);
                    }}
                  >
                    修改
                  </div>
                  <p className="block h-10 px-5 font-bold text-lg text-gray-700">
                    申请详情：
                  </p>
                  <div
                    className="h-20 py-1 px-2 w-full flex-grow select-none block 
                bg-white overflow-hidden break-all text-gray-500"
                  >
                    {item.remark}
                  </div>

                  <div className="h-8 mt-2 text-gray-600 select-none float-right">
                    {item.startTime} 至 {item.endTime}
                  </div>
                </div>
              );
            })}
        </div>
      </BackgroundCard>
    </>
  );
}
