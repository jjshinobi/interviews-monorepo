import { AppContainer, Title } from "./styles";
import { Game } from "./components/Game";

const App = () => {
  return (
    <AppContainer>
      <Title>Snake Game</Title>
      <Game width={20} height={15} speed={1000} />
    </AppContainer>
  );
};

export default App;
