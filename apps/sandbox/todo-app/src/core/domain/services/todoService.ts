import { Todo, TodoStatus } from "../entities/todo";

export const createTodoItem = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}): Todo => {
  return {
    id,
    title,
    description,
    status: "active",
    createdAt: new Date(),
  };
};

export const toggleTodoStatus = ({ todo }: { todo: Todo }): Todo => {
  return {
    ...todo,
    status: todo.status === "active" ? "completed" : "active",
  };
};

export const updateTodo = ({
  todo,
  title,
  description,
}: {
  todo: Todo;
  title: string;
  description?: string;
}): Todo => {
  return {
    ...todo,
    title,
    description,
  };
};

export const filterTodos = ({
  todos,
  filter,
}: {
  todos: Todo[];
  filter: TodoStatus | "all";
}): Todo[] => {
  switch (filter) {
    case "active":
      return todos.filter((todo) => todo.status === "active");
    case "completed":
      return todos.filter((todo) => todo.status === "completed");
    default:
      return todos;
  }
};
