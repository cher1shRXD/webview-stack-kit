"use client";

import { ComponentProps } from "react";

export const Stack = (props: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={`stack-view ${props.className || ""}`}
      style={{ ...props.style, width: "100%", height: "100%" }}>
      {props.children}
    </div>
  );
};
