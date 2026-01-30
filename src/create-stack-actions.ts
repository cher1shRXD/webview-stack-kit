import { nanoid } from "nanoid";
import { StackAction } from "./types";

export const createStackActions = (dispatch: React.Dispatch<StackAction>) => {
  return {
    push<P>(Component: React.ComponentType<P>, props: P) {
      dispatch({
        type: "PUSH",
        item: {
          id: nanoid(),
          Component,
          props,
        },
      });
    },

    pop() {
      dispatch({ type: "POP" });
    },
  };
};
