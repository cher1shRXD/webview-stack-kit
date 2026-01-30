"use client";

import { useStack } from "./useStack";
import { CSSProperties } from "react";

const stackScreenStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100svh",
  transition:
    "transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s cubic-bezier(.4,0,.2,1)",
  background: "#fff",
  boxSizing: "border-box",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

export const NavigationStackView = () => {
  const { stack } = useStack();
  return (
    <>
      {stack.map((item, index) => {
        const isTop = index === stack.length - 1;
        const isPrev = index === stack.length - 2;
        let style: CSSProperties = { ...stackScreenStyle };
        if (isTop) {
          style.transform = "translateX(0)";
          style.opacity = 1;
          style.zIndex = 2;
        } else if (isPrev) {
          style.transform = "translateX(-20%)";
          style.opacity = 0.7;
          style.zIndex = 1;
        } else {
          style.transform = "translateX(100%)";
          style.opacity = 0;
          style.zIndex = 0;
        }
        return (
          <div key={item.id} style={style}>
            <item.Component {...item.props} />
          </div>
        );
      })}
    </>
  );
};
