import { TodoRepository } from "../domain/interfaces/todoRepository.ts";
import { Todo, TodoStatus } from "../domain/entities/todo.ts";
import { filterTodos } from "../domain/services/todoService.ts";

export const getFilteredTodos = async ({
  repository,
  filter,
}: {
  repository: TodoRepository;
  filter: TodoStatus | "all";
}): Promise<Todo[]> => {
  const allTodos = await repository.getAllTodos();
  return filterTodos({ todos: allTodos, filter });
};
