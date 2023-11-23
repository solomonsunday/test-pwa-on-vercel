import React from "react";

const AppLoader = ({ value }: { value?: number }) => {
  return (
    <div
      className={`${
        value ? `ml-${value}` : ""
      }  flex items-center justify-center my-20 `}
    >
      <img
        src={"/assets/images/app-blue-loader.gif"}
        alt="loader gif"
        className="text-white"
      />
    </div>
  );
};

export default AppLoader;
