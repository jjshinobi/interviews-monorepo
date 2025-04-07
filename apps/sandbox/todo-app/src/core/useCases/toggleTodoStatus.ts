import { Todo } from "../domain/entities/todo";
import { TodoRepository } from "../domain/interfaces/todoRepository.ts";
import { toggleTodoStatus } from "../domain/services/todoService";

export const toggleTodo = async ({
  repository,
  id,
}: {
  repository: TodoRepository;
  id: string;
}): Promise<Todo> => {
  const todo = await repository.getTodoById(id);
  const updatedTodo = toggleTodoStatus({ todo });
  return await repository.updateTodo(updatedTodo);
};
