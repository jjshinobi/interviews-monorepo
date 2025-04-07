import React, { useState } from "react";
import {
  FormContainer,
  TitleInput,
  DescriptionInput,
  AddButton,
} from "./styles";

export const TodoForm = ({
  onAddTodo,
}: {
  onAddTodo: (title: string, description?: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      onAddTodo(title, description || undefined);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TitleInput
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        required
      />
      <DescriptionInput
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <AddButton type="submit">Add Todo</AddButton>
    </FormContainer>
  );
};
