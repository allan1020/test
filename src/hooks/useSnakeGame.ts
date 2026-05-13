import { useCallback, useEffect, useState, useRef } from "react";
import { GameState, Direction } from "../types";
import { INITIAL_SNAKE, TICK_RATE_MS, GRID_SIZE, DIR_MAP } from "../constants";
import { getRandomFoodPosition } from "../utils";

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: getRandomFoodPosition(INITIAL_SNAKE),
    direction: 'UP',
    gameOver: false,
    isPaused: true,
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0', 10),
  });

  const directionQueue = useRef<Direction[]>([]);
  const stateRef = useRef(gameState);
  stateRef.current = gameState;

  const startGame = useCallback(() => {
    directionQueue.current = [];
    setGameState(prev => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: getRandomFoodPosition(INITIAL_SNAKE),
      direction: 'UP',
      gameOver: false,
      isPaused: false,
      score: 0,
    }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const changeDirection = useCallback((newDir: Direction) => {
    if (stateRef.current.isPaused || stateRef.current.gameOver) return;

    const lastDir = directionQueue.current.length > 0 
      ? directionQueue.current[directionQueue.current.length - 1]
      : stateRef.current.direction;

    const isOpposite = (dir1: Direction, dir2: Direction) => {
      if (dir1 === 'UP' && dir2 === 'DOWN') return true;
      if (dir1 === 'DOWN' && dir2 === 'UP') return true;
      if (dir1 === 'LEFT' && dir2 === 'RIGHT') return true;
      if (dir1 === 'RIGHT' && dir2 === 'LEFT') return true;
      return false;
    };

    if (newDir !== lastDir && !isOpposite(newDir, lastDir)) {
      if (directionQueue.current.length < 3) {
        directionQueue.current.push(newDir);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          changeDirection('UP');
          break;
        case "ArrowDown":
        case "s":
        case "S":
          changeDirection('DOWN');
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          changeDirection('LEFT');
          break;
        case "ArrowRight":
        case "d":
        case "D":
          changeDirection('RIGHT');
          break;
        case " ":
          if (stateRef.current.gameOver) {
            startGame();
          } else {
            pauseGame();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, startGame, pauseGame]);

  useEffect(() => {
    if (gameState.isPaused || gameState.gameOver) return;

    const moveSnake = () => {
      setGameState((prev) => {
        let currentDir = prev.direction;
        if (directionQueue.current.length > 0) {
          currentDir = directionQueue.current.shift()!;
        }

        const head = prev.snake[0];
        const move = DIR_MAP[currentDir];
        const newHead = {
          x: head.x + move.x,
          y: head.y + move.y,
        };

        // 1. 檢查是否撞破邊界
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          return { ...prev, gameOver: true, isPaused: true };
        }

        // 2. 檢查是否撞到自己。蛇往前走時尾巴會離開原本位置，所以只需要檢查扣除最後一節的身體
        const bodyToCheck = prev.snake.slice(0, -1);
        if (bodyToCheck.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          return { ...prev, gameOver: true, isPaused: true };
        }

        // 製作新蛇身陣列
        const newSnake = [newHead, ...prev.snake];
        let newFood = prev.food;
        let newScore = prev.score;
        let newHighScore = prev.highScore;

        // 3. 檢查是否吃到食物
        if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
          newScore += 10;
          if (newScore > newHighScore) {
            newHighScore = newScore;
            localStorage.setItem('snakeHighScore', newHighScore.toString());
          }
          newFood = getRandomFoodPosition(newSnake);
        } else {
          // 沒吃到食物，移除最後一節尾巴來維持移動狀態
          newSnake.pop();
        }

        return {
          ...prev,
          snake: newSnake,
          direction: currentDir, 
          food: newFood,
          score: newScore,
          highScore: newHighScore
        };
      });
    };

    // 使用 setInterval 定時觸發 moveSnake
    const intervalId = setInterval(moveSnake, TICK_RATE_MS);
    return () => clearInterval(intervalId);
  }, [gameState.isPaused, gameState.gameOver]);

  return { gameState, startGame, pauseGame, changeDirection };
};
