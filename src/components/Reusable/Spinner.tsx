import React from "react";
import ReactLoading from "react-loading";

export const Spinner = ({
  type,
  color = "white",
  width,
  height,
}: {
  type?: string;
  color?: string;
  width?: number;
  height?: number;
}) => (
  <div className="flex items-center justify-center">
    <ReactLoading type={"spokes"} color={color} width={width} height={height} />{" "}
  </div>
);
