import { Todo, TodoStatus } from "./todo";

export type TodoList = {
  todos: Todo[];
  filter: TodoStatus | "all";
};
