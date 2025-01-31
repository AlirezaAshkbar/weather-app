import React from "react";
import { IoSearch } from "react-icons/io5";
import { cn } from "../utils/cn";
type Props = {
  className?: string;
  value: string;
  onchange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onsubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onsubmit}
      className={cn("px-2 flex relative items-center justify-center h-10",props.className)}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onchange}
        placeholder="Search location..."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-50 h-full "
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full">
        <IoSearch className="text-xl" />
      </button>
    </form>
  );
}
