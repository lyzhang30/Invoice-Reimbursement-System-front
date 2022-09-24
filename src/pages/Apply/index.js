import React, { useContext, useState, useEffect } from "react";
import { ToastContext } from "../../App";
import {
  GET_APPLY_BY_ID,
  POST_SUBMIT_AN_APPLY,
  POST_WITHDRAW_A_APPLY,
} from "../../utils/mapPath";
import axios from "axios";
import { usePersonalInformation } from "../PersonalPage";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../../Component/TopNav";
import { BackSvg, AddSvg, CancelSvg, SubmitSvg, CloseSvg } from "../../svg";
import fapiao from "../../img/fapiao.jpg";
import pingzheng from "../../img/pingzheng.jpg";

const BasicInfo = styled.div`
  height: fit-content;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 1.2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Content = styled.span`
  height: fit-content;
  width: 100%;
  line-height: 1.75rem;
  letter-spacing: 0.1em;
  font-size: 1rem;
  color: #374151;
`;

const Label = styled.span`
  height: fit-content;
  width: 100%;
  font-weight: 700;
  font-size: 1rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  color: #374151;
  letter-spacing: 0.1em;
`;

// // 填写申请页面
// props : 模板 id
export default function Apply() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toastController = useContext(ToastContext);
  const [info, setInfo] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [showAddWin, setShowAddWin] = useState(false);
  usePersonalInformation();
  const [invoiceimg, setInvoiceimg] = useState(undefined);
  const [voucherimg, setVoucherimg] = useState(undefined);
  const [invoiceType, setInvoiceType] = useState("");
  const [taitou, setTaitou] = useState("");
  const [number, setNumber] = useState(1);
  const [initPrice, setInitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: GET_APPLY_BY_ID,
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
        setInfo(res.data.data);
      } else {
        toastController({
          mes: "请求失败!",
          timeout: 1000,
        });
      }
    };

    fetchData();
  }, [id, toastController]);

  function handleBack() {
    navigate(-1);
  }

  function handleSubmit() {
    const fun = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_SUBMIT_AN_APPLY,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          Authorization: token,
        },
        params: {
          id: id,
        },
      };
      const res = await axios(options);
      if (res.data.code === 200) {
        toastController({
          mes: "提交成功!",
          timeout: 1000,
        });
      } else {
        toastController({
          mes: "请求失败!",
          timeout: 1000,
        });
      }
    };
    fun();
  }

  function handleCancel() {
    const cancel = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_WITHDRAW_A_APPLY,
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
    cancel();
  }

  function handleAddInvoice() {
    setShowAddWin(true);
  }

  function handleExit() {
    setShowAddWin(false);
  }

  function handleDetermineInvoice() {
    setShowAddWin(false);
  }

  return (
    <>
      <div
        className="h-screen w-screen relative flex flex-col justify-between items-center"
        style={{ backgroundColor: "#f0f2f5" }}
      >
        {/* 添加发票弹出窗口 */}
        {showAddWin && (
          <div
            className="absolute h-screen w-screen bg-gray-400 bg-opacity-60 backdrop-blur-xxs
        flex flex-col items-center pt-44"
          >
            <div className=" h-100 w-120 bg-gray-50 rounded-xl pl-6 ">
              <div
                className="h-fit w-fit float-right bg-purple-20"
                onClick={handleExit}
              >
                <CloseSvg size={52}></CloseSvg>
              </div>
              <div className="h-5 w-52"></div>
              <p>
                发票图片：
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/svg, image/gif"
                  className="h-8 w-96 bg-sky-50"
                />
              </p>
              <br />
              <p>
                凭证图片：
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/svg, image/gif"
                  className="h-8 w-96 bg-sky-50"
                />
              </p>
              <br />
              <p>
                发票类型：
                <select
                  name="type"
                  id="type-select"
                  className="bg-sky-50 h-8 w-44"
                >
                  <option value="增值税专用发票">增值税专用发票</option>
                  <option value="普通发票">普通发票</option>
                  <option value="专业发票">专业发票</option>
                  <option value="其他发票">其他发票</option>
                </select>
              </p>
              <br />
              <p>
                抬头：
                <input type="text" className="h-8 w-80 bg-sky-50 px-3" />
              </p>
              <br />
              <p>
                单价：
                <input type="number" className="h-8 w-80 bg-sky-50 px-3" />
                （元）
              </p>
              <br />
              <p>
                个数：
                <input type="number" className="h-8 w-80 bg-sky-50 px-3" />
              </p>
              <br />
              <p>
                总额：
                <input type="number" className="h-8 w-80 bg-sky-50 px-3" />
                （元）
              </p>

              <div
                className="h-9 w-20 bg-sky-100 rounded-sm float-right mr-3 transition-all 
              duration-300 hover:bg-sky-200 flex justify-center items-center select-none"
                onClick={handleDetermineInvoice}
              >
                确定
              </div>
            </div>
          </div>
        )}

        {/* 主要内容 */}

        <div className="h-12 w-full shrink-0">
          <TopNav></TopNav>
        </div>
        {/* container */}
        <div
          className="flex-grow h-5/6 w-full min-h-0 shrink flex flex-col
       justify-start items-center px-3 pt-5"
        >
          {/* 中间白色框 */}
          {info !== undefined && (
            <div
              className="flex-grow w-full min-h-0 h-125 flex py-2 
        flex-col justify-start items-center overflow-y-scroll overflow-x-hidden"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="h-auto w-full px-2 min-h-0 shrink-0 flex flex-col justify-start pb-5 ">
                {/* 顶部的按钮条 */}
                <div className="w-full h-9 ">
                  {/* 返回按钮 */}
                  <div
                    className="w-20 h-full bg-blue-100 flex justify-between items-center 
              px-2 mb-2 rounded select-none float-left transition-all duration-300 hover:bg-blue-200"
                    onClick={handleBack}
                  >
                    <BackSvg size={26}></BackSvg>
                    <p className="text-gray-700 text-lg">返回</p>
                  </div>

                  {/* 撤销按钮 */}
                  <div
                    className="w-20 h-full bg-red-100 flex justify-between items-center 
              px-2 mb-2 rounded select-none float-right mr-5 transition-all duration-300 hover:bg-red-200"
                    onClick={handleCancel}
                  >
                    <CancelSvg size={24}></CancelSvg>
                    <p className="text-gray-700 text-lg">撤销</p>
                  </div>
                  {/* 提交按钮 */}
                  <div
                    className="w-20 h-full bg-green-100 flex justify-between items-center 
              px-2 mb-2 rounded select-none float-right mr-5 transition-all duration-300 hover:bg-green-200"
                    onClick={handleSubmit}
                  >
                    <SubmitSvg size={24}></SubmitSvg>
                    <p className="text-gray-700 text-lg">提交</p>
                  </div>
                  {/* zhuangtai */}
                  <div
                    className="w-32 h-full flex justify-center items-center text-green-700 
              px-2 mb-2 rounded select-none float-right font-bold mr-20"
                  >
                    状态：{info.status}
                  </div>
                </div>

                {/* 基本信息 */}
                <BasicInfo>
                  <p>
                    <Label>报销项目：</Label>
                    <Content>{info.id}</Content>
                  </p>
                  <p>
                    <Label>申报人姓名：</Label>
                    <Content>{info.applyUserName}</Content>
                  </p>
                  <p>
                    <Label>申报人邮箱：</Label>
                    <Content>{info.userDto.email}</Content>
                  </p>
                  <p>
                    <Label>申报人联系电话：</Label>
                    <Content>{info.userDto.phone}</Content>
                  </p>
                  <p>
                    <Label>申报时间：</Label>
                    <Content>{info.createTime}</Content>
                  </p>
                  <p>
                    <Label>所属单位：</Label>
                    <Content>{info.userDto.unitName}</Content>
                  </p>
                  <p>
                    <Label>是否需要所属单位审核：</Label>
                    <Content>{info.applyCategory === 0 ? "是" : "否"}</Content>
                  </p>
                  <p>
                    <Label>到账银行账号：</Label>
                    <Content>{info.userDto.bankAmountId}</Content>
                  </p>
                </BasicInfo>
                {/* 附件上传 */}
                <div className="w-full h-24 px-6  ">
                  <Label>附件上传：</Label>
                  <div className="h-8 w-96 mt-2 bg-gray-50">
                    <input
                      className="w-full"
                      type="file"
                      value={file}
                      onChange={(e) => {
                        setFile(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                {/* 表示发票的组件list */}
                {info.invoices !== undefined &&
                  info.invoices.length > 0 &&
                  info.invoices.map((item) => {
                    return (
                      <div className="w-full h-112 bg-blue-50 flex flex-col justify-between items-center mb-3">
                        {/* 发票两张图 */}
                        <div className="h-100 w-full flex items-center justify-between p-1 space-x-2">
                          {/* 左边发票 */}
                          <div className="h-full flex-grow w-96 bg-gray-50 border border-gray-400">
                            <img
                              src={`${fapiao}`}
                              alt="发票"
                              className="max-h-full max-w-full block m-auto"
                            />
                          </div>
                          {/* 右边凭证 */}
                          <div className="h-full flex-grow w-96 bg-gray-50 border border-gray-400">
                            <img
                              src={`${pingzheng}`}
                              alt="凭证"
                              className="max-h-full max-w-full block m-auto"
                            />
                          </div>
                        </div>
                        {/* 发票信息 */}
                        <div className=" flex-grow w-full py-1 px-5 ">
                          <div className="h-8 w-full flex justify-between items-center">
                            <div className="h-full w-fit ">
                              抬头：{item.taitou}
                            </div>
                            <div className="h-full w-fit">
                              发票类型：{item.type}
                            </div>
                          </div>
                          <div className="h-8 w-full flex justify-between items-center">
                            <div className="h-full w-fit">
                              单价：{item.unitPrice}（元）
                            </div>
                            <div className="h-full w-fit ">
                              数量：{item.num}
                            </div>
                            <div className="h-full w-fit ">
                              总金额：{item.total}（元）
                            </div>
                            <div
                              className="h-full w-14 flex justify-center items-center bg-red-200 rounded
                          transition-all duration-500 hover:bg-red-300 select-none"
                            >
                              删除
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {/* 添加发票按钮 */}
                <div
                  className="h-9 w-40 px-3 select-none mb-8 flex items-center justify-around rounded-sm
               bg-blue-100 transition-all duration-500 hover:border-2 hover:border-blue-300 hover:bg-blue-200"
                  onClick={handleAddInvoice}
                >
                  <AddSvg size={24}></AddSvg>
                  <p className=" text-gray-800">点击添加发票</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="h-10 w-full shrink-0 flex justify-center items-center text-gray-600">
          Shan Tou University
        </div>
      </div>
    </>
  );
}
