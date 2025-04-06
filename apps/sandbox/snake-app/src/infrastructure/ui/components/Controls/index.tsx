import { StyledControls, Button, ScoreDisplay, GameStatus } from "./styles";

export const Controls = ({
  isNew,
  isRunning,
  isPaused,
  isGameOver,
  score,
  onStart,
  onPause,
  onReset,
}: {
  isNew: boolean;
  isRunning: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  score: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}) => {
  return (
    <StyledControls>
      <ScoreDisplay>Score: {score}</ScoreDisplay>
      <div>
        {!isRunning && !isGameOver && (
          <Button onClick={onStart}>
            {isPaused && !isNew ? "Resume" : "Start"}
          </Button>
        )}
        {isRunning && <Button onClick={onPause}>Pause</Button>}
        <Button onClick={onReset}>Reset</Button>
      </div>
      <GameStatus>
        {isGameOver && "Game Over!"}
        {isPaused && !isGameOver && "Paused"}
        {isRunning && "Playing"}
      </GameStatus>
    </StyledControls>
  );
};
