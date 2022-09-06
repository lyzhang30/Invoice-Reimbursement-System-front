import loginBackgroundImg from "./../../img/FAF430C58267CAC39DB76652942_F5EAB55C_C4AC3.jpg";

export default function Login(props) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      {/* 背景图 */}
      <div
        className=" rounded flex justify-start items-center px-52 shrink-0"
        style={{
          height: "90%",
          width: "95%",
          backgroundImage: `url(${loginBackgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // boxShadow: "-8px -8px 5px 0px rgba(200,200,200,0.8)",
        }}
      >
        <div className="h-5/6 w-5/12 min-w-fit flex flex-col justify-start items-center shrink-0 space-y-32">
          <h1 className="text-gray-600 text-7xl">汕大财务报销系统</h1>
          {/* 登录框 */}
          <div
            className="h-3/6 w-10/12 bg-gray-300 round flex flex-col justify-start items-center rounded-2xl
        bg-opacity-90 p-5 space-y-3"
            style={{
              backdropFilter: "blur(5px)",
            }}
          >
            <h2 className="text-4xl text-gray-500 my-3">登录</h2>
            <div
              className="h-20 w-full bg-pink-10 flex justify-start items-center text-gray-500 
            text-3xl space-x-5"
            >
              <p>账号:</p>
              <input
                type="text"
                className="h-3/5 w-7/12 flex-grow px-5 text-gray-600 py-2 rounded border focus:outline-none focus:ring-2"
              />
            </div>
            <div
              className="h-20 w-full bg-pink-10 flex justify-start items-center text-gray-500 
            text-3xl space-x-5"
            >
              <p>密码:</p>
              <input
                type="text"
                className="h-3/5 w-7/12 flex-grow px-5 text-gray-600 py-2 rounded border focus:outline-none focus:ring-2"
              />
            </div>
            <button className="h-12 w-4/12 rounded outline-none bg-blue-100 hover:bg-blue-200">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
