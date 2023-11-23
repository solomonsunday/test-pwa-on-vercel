import React from "react";

interface TextContentProps {
  data: {
    text: string;
  };
}
export const TextContent: React.FC<TextContentProps> = ({ data: { text } }) => {
  return <div className="Text">{text}</div>;
};
