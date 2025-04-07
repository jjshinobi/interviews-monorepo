import { Todo } from "../domain/entities/todo";
import { TodoRepository } from "../domain/interfaces/todoRepository.ts";

export const getTodoById = async ({
  repository,
  id,
}: {
  repository: TodoRepository;
  id: string;
}): Promise<Todo> => {
  return await repository.getTodoById(id);
};
