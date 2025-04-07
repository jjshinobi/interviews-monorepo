import { Todo } from "../domain/entities/todo";
import { createTodoItem } from "../domain/services/todoService";
import { TodoRepository } from "../domain/interfaces/todoRepository.ts";
import { v4 } from "uuid";

export const createTodo = async ({
  repository,
  title,
  description,
}: {
  repository: TodoRepository;
  title: string;
  description?: string;
}): Promise<Todo> => {
  return await repository.addTodo(
    createTodoItem({ id: v4(), title, description }),
  );
};
