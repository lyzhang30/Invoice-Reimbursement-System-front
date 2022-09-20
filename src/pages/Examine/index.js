import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TopNav from "../../Component/TopNav";
import { BackSvg } from "../../svg";
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

// // 审核页面
// props : 模板 id
export default function Examine(props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    projectName: "大创",
    time: "2022-09-05",
    userName: "lyzhang",
    account_from: "923467921365293875482",
    account_to: "32984623764712648962746",
    nowState: "已提交",
    feedback: "",
    invoices: [{ taitou: "汕头大学", unitPrice: 12, num: 3, total: 36 }],
  });

  const [file, setFile] = useState(undefined);

  function handleBack() {
    navigate(-1);
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
                  className="w-32 h-full flex justify-center items-center text-green-700 
              px-2 mb-2 rounded select-none float-right font-bold mr-20"
                >
                  状态：{info.nowState}
                </div>
              </div>

              {/* 基本信息 */}
              <BasicInfo>
                <p>
                  <Label>报销项目：</Label>
                  <Content>{info.projectName}</Content>
                </p>
                <p>
                  <Label>申报人姓名：</Label>
                  <Content>{info.userName}</Content>
                </p>
                <p>
                  <Label>申报时间：</Label>
                  <Content>{info.time}</Content>
                </p>
                <p>
                  <Label>到账银行账号：</Label>
                  <Content>{info.account_to}</Content>
                </p>
              </BasicInfo>
              {/* 附件上传 */}
              <div className="w-full h-24 px-6  ">
                <Label>附件：</Label>
                <div className="h-8 w-full mt-2 bg-gray-50">
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
                    <div className="w-full h-107 bg-blue-50 flex flex-col justify-between items-center mb-3">
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
                            单价：{item.unitPrice}（元）
                          </div>
                          <div className="h-full w-fit ">数量：{item.num}</div>
                          <div className="h-full w-fit ">
                            总金额：{item.total}（元）
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
              {info.nowState === "已提交" && (
                <div
                  className="h-9 w-28 px-3 select-none flex items-center justify-around rounded-sm absolute bottom-3 right-3
               bg-blue-100 transition-all duration-500 hover:border-2 hover:border-blue-300 hover:bg-blue-200"
                >
                  <p className=" text-gray-800">确定通过</p>
                </div>
              )}

              {/* 驳回按钮 */}
              {info.nowState === "已提交" && (
                <div
                  className="h-9 w-28 px-3 select-none flex items-center justify-around rounded-sm absolute bottom-3 right-36
               bg-red-50 transition-all duration-500 hover:border-2 hover:border-red-300 hover:bg-red-100"
                >
                  <p className=" text-gray-800">确定驳回</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="h-10 w-full shrink-0 flex justify-center items-center text-gray-600">
          Shan Tou University
        </div>
      </div>
    </>
  );
}
