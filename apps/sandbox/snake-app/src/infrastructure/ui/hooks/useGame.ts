import { useState, useEffect, useRef, useCallback } from "react";
import { GameState } from "../../../core/domain/entities/game";
import { Direction } from "../../../core/domain/entities/position";
import { createGame } from "../../../core/useCases/createGame";
import { startGame } from "../../../core/useCases/startGame";
import { pauseGame } from "../../../core/useCases/pauseGame";
import { updateGame } from "../../../core/useCases/updateGame";
import { resetGame } from "../../../core/useCases/resetGame";

export const useSnakeGame = (width = 20, height = 20, speed = 150) => {
  const [gameState, setGameState] = useState<GameState>(
    createGame({ width, height }),
  );
  const directionRef = useRef<Direction>(gameState.snake.direction);
  const gameLoopRef = useRef<number | null>(null);

  const clearGameLoop = useCallback(() => {
    if (gameLoopRef.current !== null) {
      window.clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    directionRef.current = newDirection;
  }, []);

  const gameTick = useCallback(() => {
    setGameState((state) =>
      updateGame({
        state,
        newDirection: directionRef.current,
      }),
    );
  }, []);

  const start = useCallback(() => {
    setGameState((state) => {
      const newState = startGame({ state });

      if (newState.status === "STARTED" && gameLoopRef.current === null) {
        gameLoopRef.current = window.setInterval(gameTick, speed);
      }

      return newState;
    });
  }, [gameTick, speed]);

  const pause = useCallback(() => {
    clearGameLoop();
    setGameState((state) => pauseGame({ state }));
  }, [clearGameLoop]);

  const reset = useCallback(() => {
    clearGameLoop();
    setGameState((state) => resetGame({ state }));
  }, [clearGameLoop]);

  useEffect(() => {
    return () => {
      clearGameLoop();
    };
  }, [clearGameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          changeDirection("UP");
          break;
        case "ArrowDown":
          changeDirection("DOWN");
          break;
        case "ArrowLeft":
          changeDirection("LEFT");
          break;
        case "ArrowRight":
          changeDirection("RIGHT");
          break;
        case " ":
          if (gameState.status === "PAUSED") {
            start();
          } else if (gameState.status === "STARTED") {
            pause();
          }
          break;
        case "r":
        case "R":
          reset();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeDirection, gameState.status, start, pause, reset]);

  return {
    gameState,
    start,
    pause,
    reset,
    isNew: gameState.status === "NEW",
    isRunning: gameState.status === "STARTED",
    isPaused: gameState.status === "PAUSED",
    isGameOver: gameState.status === "FINISHED",
    score: gameState.score,
  };
};
