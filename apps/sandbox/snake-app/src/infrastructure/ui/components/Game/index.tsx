import { Board } from "../Board";
import { Controls } from "../Controls";
import { GameContainer, GameInfo } from "./styles";
import { useSnakeGame } from "../../hooks/useGame.ts";

export const Game = ({
  width = 20,
  height = 15,
  speed = 150,
}: {
  width?: number;
  height?: number;
  speed?: number;
}) => {
  const {
    gameState,
    start,
    pause,
    reset,
    isNew,
    isRunning,
    isPaused,
    isGameOver,
    score,
  } = useSnakeGame(width, height, speed);

  return (
    <GameContainer>
      <Controls
        isNew={isNew}
        isRunning={isRunning}
        isPaused={isPaused}
        isGameOver={isGameOver}
        score={score}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />
      <Board gameState={gameState} />
      <GameInfo>
        <p>Use arrow keys to control the snake.</p>
        <p>Space to {isPaused ? "resume" : "pause"}, R to reset.</p>
      </GameInfo>
    </GameContainer>
  );
};
