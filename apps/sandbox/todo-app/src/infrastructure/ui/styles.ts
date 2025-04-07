import styled from "styled-components";

export const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #333;
    font-size: 2.5rem;
    margin: 0;
  }
`;

export const MainContent = styled.main`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
