import { StackAction, StackState } from "./types"

export const stackReducer = (state: StackState, action: StackAction): StackState => {
  switch (action.type) {
    case 'PUSH':
      return { stack: [...state.stack, action.item] }
    case 'POP':
      return { stack: state.stack.slice(0, -1) }
  }
}
