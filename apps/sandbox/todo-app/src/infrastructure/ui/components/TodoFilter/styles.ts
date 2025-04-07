import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#4caf50" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid ${(props) => (props.active ? "#4caf50" : "#ddd")};
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "#45a049" : "#f5f5f5")};
  }
`;
