import {
  createTodoItem,
  filterTodos,
  toggleTodoStatus,
  updateTodo,
} from "../../../../src/core/domain/services/todoService.ts";
import { Todo } from "../../../../src/core/domain/entities/todo.ts";

describe("Todo Service", () => {
  describe("createTodoItem", () => {
    it("should create a todo with the given id and title", () => {
      const todo = createTodoItem({ id: "1", title: "Test Todo" });

      expect(todo.id).toBe("1");
      expect(todo.title).toBe("Test Todo");
      expect(todo.status).toBe("active");
      expect(todo.createdAt).toBeInstanceOf(Date);
    });
  });

  describe("toggleTodoStatus", () => {
    it("should toggle a todo from active to completed", () => {
      const todo: Todo = {
        id: "1",
        title: "Test Todo",
        status: "active",
        createdAt: new Date(),
      };

      const toggledTodo = toggleTodoStatus({ todo });

      expect(toggledTodo.status).toBe("completed");
      expect(toggledTodo.id).toBe(todo.id);
      expect(toggledTodo.title).toBe(todo.title);
      expect(toggledTodo.createdAt).toBe(todo.createdAt);
    });

    it("should toggle a todo from completed to active", () => {
      const todo: Todo = {
        id: "1",
        title: "Test Todo",
        status: "completed",
        createdAt: new Date(),
      };

      const toggledTodo = toggleTodoStatus({ todo });

      expect(toggledTodo.status).toBe("active");
    });
  });

  describe("updateTodo", () => {
    it("should update the title of a todo", () => {
      const todo: Todo = {
        id: "1",
        title: "Old Title",
        description: "Old Description",
        status: "active",
        createdAt: new Date(),
      };

      const updatedTodo = updateTodo({
        todo,
        title: "New Title",
        description: "New Description",
      });

      expect(updatedTodo.title).toBe("New Title");
      expect(updatedTodo.description).toBe("New Description");
      expect(updatedTodo.id).toBe(todo.id);
      expect(updatedTodo.status).toBe(todo.status);
      expect(updatedTodo.createdAt).toBe(todo.createdAt);
    });
  });

  describe("filterTodos", () => {
    const todos: Todo[] = [
      {
        id: "1",
        title: "Active Todo",
        status: "active",
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Completed Todo",
        status: "completed",
        createdAt: new Date(),
      },
      {
        id: "3",
        title: "Another Active Todo",
        status: "active",
        createdAt: new Date(),
      },
    ];

    it('should return all todos when filter is "all"', () => {
      const filteredTodos = filterTodos({ todos, filter: "all" });
      expect(filteredTodos).toHaveLength(3);
    });

    it('should return only active todos when filter is "active"', () => {
      const filteredTodos = filterTodos({ todos, filter: "active" });
      expect(filteredTodos).toHaveLength(2);
      expect(filteredTodos.every((todo) => todo.status === "active")).toBe(
        true,
      );
    });

    it('should return only completed todos when filter is "completed"', () => {
      const filteredTodos = filterTodos({ todos, filter: "completed" });
      expect(filteredTodos).toHaveLength(1);
      expect(filteredTodos.every((todo) => todo.status === "completed")).toBe(
        true,
      );
    });
  });
});
