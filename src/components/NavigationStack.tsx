"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { StackProvider } from "../context/stack-provider";
import { NavigationStackView } from "./NavigationStackView";
import { getSearchParams } from "../utils/get-search-params";

export const NavigationStack = ({ children }: PropsWithChildren) => {
  const [dynamicPadding, setDynamicPadding] = useState({
    paddingTop: 0,
    paddingBottom: 0,
  });

  useEffect(() => {
    const searchParams = getSearchParams();
    const topPadding = Number(searchParams["top"] || 0);
    const bottomPadding = Number(searchParams["bottom"] || 0);
    setDynamicPadding({ paddingTop: topPadding, paddingBottom: bottomPadding });
  }, []);

  return (
    <StackProvider>
      <NavigationStackView />
      <div
        style={{
          paddingTop: dynamicPadding.paddingTop,
          paddingBottom: dynamicPadding.paddingBottom,
        }}>
        {children}
      </div>
    </StackProvider>
  );
};
