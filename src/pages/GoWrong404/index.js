import React from "react";
class index extends React.Component {
  render() {
    return (
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <p className="text-8xl text-gray-600 font-kaiti">404 Error!</p>
        <div className="h-12 w-full"></div>
        <p className="text-5xl text-gray-600 font-kaiti">
          Can't find this page...
        </p>
      </div>
    );
  }
}
export default index;
