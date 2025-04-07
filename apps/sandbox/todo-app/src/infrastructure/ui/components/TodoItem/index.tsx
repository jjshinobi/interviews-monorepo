import { Todo } from "../../../../core/domain/entities/todo";
import {
  TodoContainer,
  TodoCheckbox,
  TodoTitle,
  TodoDescription,
  TodoActions,
  EditButton,
  DeleteButton,
  EditForm,
  SaveButton,
  CancelButton,
} from "./styles";
import { useState } from "react";

export const TodoItem = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || "",
  );

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle, editDescription || undefined);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <TodoContainer completed={todo.status === "completed"}>
      {isEditing ? (
        <EditForm>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Todo title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <div>
            <SaveButton onClick={handleSave}>Save</SaveButton>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          </div>
        </EditForm>
      ) : (
        <>
          <TodoCheckbox
            type="checkbox"
            checked={todo.status === "completed"}
            onChange={handleToggle}
          />
          <div>
            <TodoTitle completed={todo.status === "completed"}>
              {todo.title}
            </TodoTitle>
            {todo.description && (
              <TodoDescription>{todo.description}</TodoDescription>
            )}
          </div>
          <TodoActions>
            <EditButton onClick={handleEdit}>Edit</EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </TodoActions>
        </>
      )}
    </TodoContainer>
  );
};
