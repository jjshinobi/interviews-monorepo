import { Todo } from "../entities/todo.ts";

export interface TodoRepository {
  getAllTodos(): Promise<Todo[]>;

  getTodoById(id: string): Promise<Todo>;

  addTodo(todo: Todo): Promise<Todo>;

  updateTodo(todo: Todo): Promise<Todo>;

  deleteTodo(id: string): Promise<void>;
}
