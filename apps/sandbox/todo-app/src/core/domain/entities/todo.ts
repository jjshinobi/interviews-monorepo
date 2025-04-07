export type TodoStatus = "active" | "completed";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: Date;
};
