import { TodoRepository } from "../../core/domain/interfaces/todoRepository.ts";
import { Todo } from "../../core/domain/entities/todo.ts";

export const createTodoMemoryRepository = async (): Promise<TodoRepository> => {
  let todos: Todo[] = [];

  const loadData = async (): Promise<void> => {
    try {
      const response = await fetch("https://dummyjson.com/todos");
      const data = await response.json();

      todos = data.todos.map((item: any) => ({
        id: item.id.toString(),
        title: item.todo,
        status: item.completed ? "completed" : "active",
        createdAt: new Date(),
      }));
    } catch (error) {
      console.error(`Error loading todos`, error);
      todos = [];
    }
  };

  await loadData();

  return {
    async getAllTodos(): Promise<Todo[]> {
      return [...todos];
    },

    async getTodoById(id: string): Promise<Todo> {
      const todo = todos.find((todo) => todo.id === id);

      if (!todo) {
        throw new Error(`Todo with id ${id} not found`);
      }

      return { ...todo };
    },

    async addTodo(todo: Todo): Promise<Todo> {
      todos.push({ ...todo });
      return { ...todo };
    },

    async updateTodo(todo: Todo): Promise<Todo> {
      const index = todos.findIndex((t) => t.id === todo.id);

      if (index === -1) {
        throw new Error(`Todo with id ${todo.id} not found`);
      }

      todos[index] = { ...todo };

      return { ...todo };
    },

    async deleteTodo(id: string): Promise<void> {
      const index = todos.findIndex((todo) => todo.id === id);

      if (index === -1) {
        throw new Error(`Todo with id ${id} not found`);
      }

      todos.splice(index, 1);
    },
  };
};
