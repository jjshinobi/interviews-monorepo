import { Todo } from "../domain/entities/todo";
import { TodoRepository } from "../domain/interfaces/todoRepository.ts";

export const getTodos = async ({
  repository,
}: {
  repository: TodoRepository;
}): Promise<Todo[]> => {
  return await repository.getAllTodos();
};
