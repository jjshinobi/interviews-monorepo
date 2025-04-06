import React from "react";
import { AppContainer, Title } from "./styles";
import { Game } from "./components/Game";

const App: React.FC = () => {
  return (
    <AppContainer>
      <Title>Snake Game</Title>
      <Game width={20} height={15} speed={1000} />
    </AppContainer>
  );
};

export default App;
