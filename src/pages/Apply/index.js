import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import BackgroundCard from "../../Component/BackgroundCard";

const MyHeader = styled.div`
  height: fit-content;
  width: 100%;
  margin-top: 1rem;
`;

const Label = styled.div`
  height: fit-content;
  width: 100%;
  font-weight: 700;
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  color: #374151;
  margin-top: 1.5rem;
  margin-bottom: 0.3rem;
  letter-spacing: 0.1em;
`;
// 填写申请页面
// props : 模板 id
export default function Apply(props) {
  const [info, setInfo] = useState({
    name: "大创",
  });
  return (
    <>
      <BackgroundCard>
        <div className="h-auto w-full min-h-0 px-6 shrink-0 flex flex-col justify-start items-center"></div>
      </BackgroundCard>
    </>
  );
}
