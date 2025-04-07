import styled from "styled-components";

export const TodoContainer = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.completed ? 0.7 : 1)};
`;

export const TodoCheckbox = styled.input`
  margin-right: 16px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const TodoTitle = styled.h3<{ completed: boolean }>`
  margin: 0;
  font-size: 16px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.completed ? "#888" : "#333")};
`;

export const TodoDescription = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
`;

export const TodoActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

export const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const EditForm = styled.div`
  width: 100%;

  input,
  textarea {
    width: 100%;
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

export const SaveButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0b7dda;
  }
`;

export const CancelButton = styled.button`
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;
