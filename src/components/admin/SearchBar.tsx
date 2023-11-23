import React from "react";

const SearchBar = ({
  keyWord,
  setKeyWord,
  handleSerchAction,
}: {
  keyWord: string;
  setKeyWord: (value: string) => void;
  handleSerchAction: any;
}) => {
  return (
    <div>
      <input
        type="text"
        className="px-3 py-2 bg-transparent border border-gray-300 rounded-lg w-72 placeholder:text-slate-500 placeholder:left-0 focus:ring-0 focus:border-blue-300 focus:outline-none"
        key="random1"
        value={keyWord}
        placeholder={"Search"}
        onChange={(e) => handleSerchAction(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
