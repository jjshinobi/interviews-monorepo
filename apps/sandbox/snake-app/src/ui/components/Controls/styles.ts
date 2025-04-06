import styled from "styled-components";

export const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

export const Button = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #303f9f;
  }
`;

export const ScoreDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const GameStatus = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => (props.children === "Game Over!" ? "#F44336" : "#333")};
`;
