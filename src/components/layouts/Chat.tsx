import React, { FC, useState } from "react";

const Chat: FC = () => {
  const [comments] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <div className="hidden w-3/12 h-full py-3 mt-32 overflow-auto border rounded-2xl border-slate-300 md:block">
      <div className="sticky px-4 py-2 ">
        <p className="font-bold">Live chat</p>
      </div>
      <div className="border border-slate-200"></div>
      <div className=" overflow-auto  max-h-[31rem]">
        {comments.map((item) => (
          <div className="flex items-center px-4 pt-1">
            <div className="px-4 py-3 bg-red-500 rounded-full">
              {/* <Image src="/assests/images/google.svg" width={30} height={0} /> */}
              <p>D</p>
            </div>
            <div className="py-3 pl-3">
              {" "}
              <span className="font-bold">Dana Jones</span> - consectetur fuga
              consequatur, pariatur consequatur.
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 mt-10 max-h-[15rem]">
        <input
          type="text"
          placeholder="Say something"
          className="w-full py-2 pl-3 border bg-slate-100 border-slate-300 rounded-2xl placeholder:text-xs placeholder:px-5 focus:outline-none focus:border-blue-300"
        />
      </div>
    </div>
  );
};

export default Chat;
