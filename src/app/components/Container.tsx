import React from "react";
import { cn } from "../utils/cn";

function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("w-full bg-white border flex rounded-xl py-4 shadow-sm",props.className)}
    />
  );
}

export default Container;
