import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function SearchBar({
  onSubmit,
  placeHolder,
}: {
  onSubmit?: any;
  placeHolder?: string;
}) {
  const [term, setTerm] = useState("");

  const handleChange = (event: any) => {
    let query = event.target.value;
    onSubmit(query);
    setTerm(query);
  };
  // Reuseable search bar
  return (
    <>
      <label className="relative block w-80 md:w-96 md:py-5 ">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
          <MagnifyingGlassIcon className="w-6 h-6 " />
        </span>
        <input
          type="text"
          onChange={handleChange}
          autoComplete="false"
          className="p-2 pl-10 placeholder-gray-700 bg-transparent border border-gray-300 rounded-lg w-80 focus:outline-none focus:border-blue-500"
          placeholder={placeHolder}
          value={term}
        />
      </label>
    </>
  );
}
