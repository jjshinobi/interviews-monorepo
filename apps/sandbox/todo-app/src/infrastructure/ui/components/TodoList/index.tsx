import { Todo } from "../../../../core/domain/entities/todo";
import { TodoItem } from "../TodoItem";
import {
  ListContainer,
  EmptyMessage,
  LoadingMessage,
  ErrorMessage,
} from "./styles";

export const TodoList = ({
  todos,
  loading,
  error,
  onToggle,
  onUpdate,
  onDelete,
}: {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
  onDelete: (id: string) => void;
}) => {
  if (loading) {
    return <LoadingMessage>Loading todos...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (todos.length === 0) {
    return <EmptyMessage>No todos found</EmptyMessage>;
  }

  return (
    <ListContainer>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ListContainer>
  );
};
