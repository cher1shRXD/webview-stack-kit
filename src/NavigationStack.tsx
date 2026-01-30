"use client";

import { PropsWithChildren } from "react"
import { StackProvider } from "./stack-provider";
import { NavigationStackView } from "./NavigationStackView";

export const NavigationStack = ({ children }: PropsWithChildren) => {
  return (
    <StackProvider>
      <NavigationStackView />
      {children}
    </StackProvider>
  )
}