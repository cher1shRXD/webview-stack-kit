import { StackAction, StackState } from "../types"

export const stackReducer = (state: StackState, action: StackAction): StackState => {
  switch (action.type) {
    case 'PUSH':
      return { stack: [...state.stack, { ...action.item, transition: 'push' }] }
    case 'POP':
      return {
        ...state,
        stack: state.stack.map((item, index) => {
          if (index === state.stack.length - 1) {
            return { ...item, transition: 'pop' }
          }
          return item
        }),
      }
    case 'REMOVE':
      return {
        ...state,
        stack: state.stack.filter(item => item.id !== action.id),
      }
  }
  return state
}
