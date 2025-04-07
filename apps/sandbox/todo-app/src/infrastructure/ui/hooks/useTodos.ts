import { useCallback, useEffect, useState } from "react";
import { Todo, TodoStatus } from "../../../../src/core/domain/entities/todo.ts";
import { TodoRepository } from "../../../../src/core/domain/interfaces/todoRepository.ts";
import { createTodoMemoryRepository } from "../../../../src/infrastructure/repository/todoMemoryRepository.ts";
import { getFilteredTodos } from "../../../../src/core/useCases/getFilteredTodos.ts";
import { createTodo } from "../../../../src/core/useCases/createTodo.ts";
import { toggleTodo } from "../../../../src/core/useCases/toggleTodoStatus.ts";
import { updateTodoDetails } from "../../../../src/core/useCases/updateTodoDetails.ts";
import { deleteTodo } from "../../../../src/core/useCases/deleteTodo.ts";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repository, setRepository] = useState<TodoRepository | null>(null);

  useEffect(() => {
    const initRepository = async () => {
      try {
        const repo = await createTodoMemoryRepository();
        setRepository(repo);
      } catch (err) {
        setError("Failed to initialize repository");
        setLoading(false);
      }
    };

    initRepository();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!repository) return;

      try {
        setLoading(true);
        const todosList = await getFilteredTodos({ repository, filter });
        setTodos(todosList);
        setError(null);
      } catch (err) {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [repository, filter]);

  const addTodo = useCallback(
    async (title: string, description?: string) => {
      if (!repository) return null;

      try {
        const newTodo = await createTodo({
          repository,
          title,
          description,
        });
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        return newTodo;
      } catch (err) {
        setError("Failed to add todo");
        return null;
      }
    },
    [repository],
  );

  const toggleTodoStatus = useCallback(
    async (id: string) => {
      if (!repository) return;

      try {
        const updatedTodo = await toggleTodo({ repository, id });
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
        );
      } catch (err) {
        setError("Failed to toggle todo status");
      }
    },
    [repository],
  );

  const updateTodo = useCallback(
    async (id: string, title: string, description?: string) => {
      if (!repository) return;

      try {
        const updatedTodo = await updateTodoDetails({
          repository,
          id,
          title,
          description,
        });
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
        );
      } catch (err) {
        setError("Failed to update todo");
      }
    },
    [repository],
  );

  const removeTodo = useCallback(
    async (id: string) => {
      if (!repository) return;

      try {
        await deleteTodo({ repository, id });
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } catch (err) {
        setError("Failed to delete todo");
      }
    },
    [repository],
  );

  const changeFilter = useCallback((newFilter: TodoStatus | "all") => {
    setFilter(newFilter);
  }, []);

  return {
    todos,
    loading,
    error,
    filter,
    addTodo,
    toggleTodoStatus,
    updateTodo,
    removeTodo,
    changeFilter,
  };
};
