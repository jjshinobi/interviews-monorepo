import { TodoRepository } from "../domain/interfaces/todoRepository.ts";

export const deleteTodo = async ({
  repository,
  id,
}: {
  repository: TodoRepository;
  id: string;
}): Promise<void> => {
  await repository.deleteTodo(id);
};
