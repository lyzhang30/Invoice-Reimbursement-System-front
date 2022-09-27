import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import {
  GET_APPLY_BY_ID,
  POST_AGREE_AN_APPLY,
  POST_REJECT_AN_ALLPY,
  GET_INFO_BY_TOKEN,
} from "../../utils/mapPath";
import { useNavigate, useParams } from "react-router-dom";
import TopNav from "../../Component/TopNav";
import { BackSvg } from "../../svg";
import { usePersonalInformation } from "../PersonalPage";
import { ToastContext } from "../../App";
import axios from "axios";

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

// // 审核页面
// props : 模板 id
export default function Examine(props) {
  const navigate = useNavigate();
  const { roleName } = usePersonalInformation();
  const toastController = useContext(ToastContext);
  const { id } = useParams();
  const [info, setInfo] = useState(undefined);

  useEffect(() => {
    const getExamineInfo = async () => {
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
          mes: res.data.message,
          timeout: 1000,
        });
      }
    };
    //判断是否登录
    const isLogin = async () => {
      let token = localStorage.getItem("token");

      const options = {
        url: GET_INFO_BY_TOKEN,
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          Authorization: token,
        },
      };
      const res = await axios(options);

      if (res.data.code !== 200) {
        toastController({
          mes: "您还未登录，先登录吧!",
          timeout: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };
    isLogin();
    getExamineInfo();
  }, []);

  function handleBack() {
    navigate(-1);
  }

  function handleAgree() {
    const postAgree = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_AGREE_AN_APPLY,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
        data: {
          id: id,
          status: info.status,
        },
        params: {
          id: id,
          status: info.status,
        },
      };
      const res = await axios(options);
      if (res.data.code === 200) {
        toastController({
          mes: "确定通过！",
          timeout: 1000,
        });
        setTimeout(() => {
          navigate("/ToBeReview");
        }, 3000);
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };
    postAgree();
  }

  function handleReject() {
    const postReject = async () => {
      let token = localStorage.getItem("token");
      const options = {
        url: POST_REJECT_AN_ALLPY,
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
          mes: "确定驳回！",
          timeout: 1000,
        });
        setTimeout(() => {
          navigate("/ToBeReview");
        }, 2000);
      } else {
        toastController({
          mes: res.data.message,
          timeout: 3000,
        });
      }
    };
    postReject();
  }

  return (
    <>
      <div
        className="h-screen w-screen relative flex flex-col justify-between items-center"
        style={{ backgroundColor: "#f0f2f5" }}
      >
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
              <div className="h-auto w-full px-2 min-h-0 shrink-0 flex flex-col justify-start pb-16 relative">
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
                  <div
                    className="w-52 h-full flex justify-center items-center text-green-700 
              px-2 mb-2 rounded select-none float-right font-bold mr-20"
                  >
                    状态：{info.status}
                  </div>
                </div>

                {/* 基本信息 */}
                <BasicInfo>
                  <p>
                    <Label>报销项目：</Label>
                    <Content>{info.reimbursementTemplateName}</Content>
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

                {/* 附件下载*/}
                <div className="w-fit h-fit px-6  ">
                  <Label>附件：</Label>
                  <div className="h-14 w-fit ">
                    <a
                      href={info.fileAddress}
                      download="test"
                      className="h-14 w-fit px-8 bg-sky-100 rounded-sm select-none"
                    >
                      点击下载附件
                    </a>
                  </div>
                </div>
                {/* 表示发票的组件list */}
                {info.invoiceDetailsList !== undefined &&
                  info.invoiceDetailsList.length > 0 &&
                  info.invoiceDetailsList.map((item) => {
                    return (
                      <div
                        className="w-full h-112 bg-blue-50 flex flex-col justify-between items-center
                      border-blue-300 border-2 mb-14"
                      >
                        {/* 发票两张图 */}
                        <div className="h-100 w-full flex items-center justify-between p-1 space-x-2">
                          {/* 左边发票 */}
                          <div className="h-full flex-grow w-96 bg-gray-50 border border-gray-400">
                            <img
                              src={`http://112.74.125.184:9527/common/download?name=${item.invoicePath}`}
                              alt="发票"
                              className="max-h-full max-w-full block m-auto"
                            />
                          </div>
                          {/* 右边凭证 */}
                          <div className="h-full flex-grow w-96 bg-gray-50 border border-gray-400">
                            <img
                              src={`http://112.74.125.184:9527/common/download?name=${item.credentialsPath}`}
                              alt="凭证"
                              className="max-h-full max-w-full block m-auto"
                            />
                          </div>
                        </div>
                        {/* 发票信息 */}
                        <div className=" flex-grow w-full py-1 px-5 ">
                          <div className="h-8 w-full flex justify-between items-center">
                            <div className="h-full w-fit ">
                              抬头：{item.purchaserName}
                            </div>
                            <div className="h-full w-fit">
                              发票类型：{item.invoiceCategoryName}
                            </div>
                          </div>
                          <div className="h-8 w-full flex justify-between items-center">
                            <div className="h-full w-fit">
                              单价：{item.amountInfighters}（元）
                            </div>
                            <div className="h-full w-fit ">
                              数量：{item.number}
                            </div>
                            <div className="h-full w-fit ">
                              总金额：{item.totalPrice}（元）
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {/* 添加批注 */}
                <BasicInfo>
                  <Label>批注：</Label>
                </BasicInfo>
                <div className="h-60 w-full ">
                  <textarea
                    cols="10"
                    rows="8"
                    className="bg-blue-50 py-3 px-5 w-full"
                  ></textarea>
                </div>

                {/*确定通过按钮 */}
                {(info.status === "已提交" ||
                  (info.status === "单位已审核" && roleName === "管理员")) && (
                  <div
                    className="h-9 w-28 px-3 select-none flex items-center justify-around rounded-sm absolute bottom-3 right-3
               bg-blue-100 transition-all duration-500 hover:border-2 hover:border-blue-300 hover:bg-blue-200"
                    onClick={handleAgree}
                  >
                    <p className=" text-gray-800">确定通过</p>
                  </div>
                )}

                {/* 驳回按钮 */}
                {(info.status === "已提交" ||
                  (info.status === "单位已审核" && roleName === "管理员")) && (
                  <div
                    className="h-9 w-28 px-3 select-none flex items-center justify-around rounded-sm absolute bottom-3 right-36
               bg-red-50 transition-all duration-500 hover:border-2 hover:border-red-300 hover:bg-red-100"
                    onClick={handleReject}
                  >
                    <p className=" text-gray-800">确定驳回</p>
                  </div>
                )}
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
