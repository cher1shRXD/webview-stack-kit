import { createContext, ReactNode, useMemo, useReducer } from "react"
import { stackReducer } from "./stack-reducer"
import { createStackActions } from "../utils/create-stack-actions"
import { StackApi } from "../types"

export const StackContext = createContext<StackApi | null>(null)

export const StackProvider = ({ children }: { children: ReactNode
 }) => {
  const [state, dispatch] = useReducer(stackReducer, { stack: [] })

  const actions = useMemo(
    () => createStackActions(dispatch),
    [dispatch]
  )

  const api: StackApi = {
    stack: state.stack,
    ...actions,
  }

  return (
    <StackContext.Provider value={api}>
      {children}
    </StackContext.Provider>
  )
}
