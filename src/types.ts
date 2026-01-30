import type { ComponentType } from "react";

export interface StackItem<P = any> {
  id: string;
  Component: ComponentType<P>;
  props: P;
  transition?: "push" | "pop";
}

export interface StackState {
  stack: StackItem[];
}

export type StackAction =
  | { type: "PUSH"; item: StackItem }
  | { type: "POP" }
  | { type: "REMOVE"; id: string };

export interface StackApi {
  stack: StackItem[];

  push<P>(component: ComponentType<P>, props: P): void;

  pop(): void;

  remove(id: string): void;
}
