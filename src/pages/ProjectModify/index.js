import React, { useContext, useState, useEffect } from "react";
import { ToastContext } from "../../App";
import {
  POST_MODIFY_PROJECT,
  GET_PROJECT_BY_ID,
  POST_UPLOAD_FILE,
} from "../../utils/mapPath";
import axios from "axios";
import { usePersonalInformation } from "../PersonalPage";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BackSvg, AddSvg, CancelSvg, SubmitSvg, CloseSvg } from "../../svg";
import BackgroundCard from "../../Component/BackgroundCard";

export default function ProjectModify() {
  const navigate = useNavigate();
  const toastController = useContext(ToastContext);
  const { id } = useParams();
  const [applyCategory, setApplyCategory] = useState(undefined);
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [filePath, setFilePath] = useState(undefined);
  const [remark, setRemark] = useState(undefined);
  const [categoryName, setCategoryName] = useState(undefined);

  useEffect(() => {
    //获取项目信息
    const getProjectInfo = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_PROJECT_BY_ID,
        method: "GET",
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
        setApplyCategory(res.data.data.applyCategory);
        setStartTime(res.data.data.startTime.substring(0, 16));
        setEndTime(res.data.data.endTime.substring(0, 16));
        setFilePath(res.data.data.fileAddress);
        setRemark(res.data.data.remark);
        setCategoryName(res.data.data.categoryName);
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };
    getProjectInfo();
  }, [id]);

  function modifyProject() {
    const postModify = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_MODIFY_PROJECT,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          id: id,
          categoryName: categoryName,
          applyCategory: applyCategory,
          startTime: startTime,
          endTime: endTime,
          fileAddress: filePath,
          remark: remark,
        },
        params: {
          id: id,
          categoryName: categoryName,
          applyCategory: applyCategory,
          startTime: startTime,
          endTime: endTime,
          fileAddress: filePath,
          remark: remark,
        },
      };
      const res = await axios(options);

      if (res.data.code === 200) {
        toastController({
          mes: "修改成功！",
          timeout: 2000,
        });
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };

    postModify();
  }

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
      <div
        className="absolute h-screen w-screen bg-gray-300 bg-opacity-60 backdrop-blur-xxs
        flex flex-col items-center pt-0 z-10 top-0 left-0"
      >
        <div className=" h-full w-7/12 bg-gray-50 rounded-tr-2xl pl-6 ">
          <div
            className="h-fit w-fit float-right bg-purple-20"
            onClick={() => {
              navigate(-1);
            }}
          >
            <CloseSvg size={52}></CloseSvg>
          </div>
          <div className="h-8 w-52"></div>
          {categoryName !== undefined && (
            <>
              <p>
                报销项目名称：
                <input
                  value={categoryName !== undefined ? categoryName : ""}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                  type="text"
                  className="h-9 w-130 bg-sky-50 px-3"
                />
              </p>
              <br />
              <p>
                是否经学院审批：
                <select
                  className="h-7 w-fit px-3"
                  onChange={(e) => {
                    setApplyCategory(e.target.value);
                  }}
                >
                  <option
                    value={0}
                    className="h-8"
                    selected={`${applyCategory === "0" ? "selected" : ""}`}
                  >
                    是
                  </option>
                  <option
                    value={1}
                    className="h-8"
                    selected={`${applyCategory !== "0" ? "selected" : ""}`}
                  >
                    否
                  </option>
                </select>
              </p>
              <br />
              <p>
                开始时间：
                <input
                  value={startTime !== undefined ? startTime : ""}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  type="datetime-local"
                  className="h-9 w-130 bg-sky-50 px-3"
                />
              </p>
              <br />
              <p>
                结束时间：
                <input
                  value={endTime !== undefined ? endTime : ""}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                  type="datetime-local"
                  className="h-9 w-130 bg-sky-50 px-3"
                />
              </p>
              <br />
              <p>
                附加文件：
                <input
                  type="file"
                  className="h-8 w-96 bg-sky-50"
                  id="filePath"
                  onChange={uploadFile}
                />
                <span className="text-red-700"> （ 修改要重新上传文件 ） </span>
              </p>
              <br />
              <p>申请详情：</p>
              <textarea
                cols="105"
                rows="15"
                value={remark !== undefined ? remark : ""}
                onChange={(e) => {
                  setRemark(e.target.value);
                }}
                className="p-3 h-64 w-11/12 bg-sky-50 mt-2"
              ></textarea>
              <p className="text-red-700 w-fit m-0">注意：所有均为必填项</p>
              {/* 修改按钮 */}
              <div
                className="h-9 w-20 bg-sky-100 rounded-sm float-right mr-3 mt-2 transition-all 
              duration-300 hover:bg-sky-200 flex justify-center items-center select-none "
                onClick={() => {
                  modifyProject();
                  navigate(-1);
                }}
              >
                修改
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
