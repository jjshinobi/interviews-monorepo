import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 24px;
  background-color: white;
  border-radius: 4px;
  color: #666;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 24px;
  background-color: white;
  border-radius: 4px;
  color: #666;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 24px;
  background-color: #ffebee;
  border-radius: 4px;
  color: #c62828;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
