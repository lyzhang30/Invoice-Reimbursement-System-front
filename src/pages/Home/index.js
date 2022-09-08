import React from "react";
import BackgroundCard from "../../Component/BackgroundCard";
import ItemCard from "../../Component/ItemCard";

// TODO:获取所有项目的列表
export default function Home() {
  return (
    <>
      <BackgroundCard>
        <div
          className="h-auto w-full min-h-0  shrink-0 grid grid-flow-row grid-cols-4
         gap-14 auto-cols-fr place-items-center"
        >
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
          <ItemCard></ItemCard>
        </div>
      </BackgroundCard>
    </>
  );
}
