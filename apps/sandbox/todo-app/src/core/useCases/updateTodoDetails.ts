import { Todo } from "../domain/entities/todo";
import { updateTodo } from "../domain/services/todoService";
import { TodoRepository } from "../domain/interfaces/todoRepository.ts";

export const updateTodoDetails = async ({
  repository,
  id,
  title,
  description,
}: {
  repository: TodoRepository;
  id: string;
  title: string;
  description?: string;
}): Promise<Todo> => {
  const todo = await repository.getTodoById(id);
  const updatedTodo = updateTodo({ todo, title, description });
  return await repository.updateTodo(updatedTodo);
};
