import { Point } from "./types";
import { GRID_SIZE } from "./constants";

/**
 * 輔助函數：在畫面上隨機生成一個不與蛇身體重疊的食物座標
 */
export const getRandomFoodPosition = (snake: Point[]): Point => {
  let position: Point = { x: 0, y: 0 };
  let isOnSnake = true;
  
  // 持續隨機生成，直到座標不和蛇的任何一節身體重疊為止
  while (isOnSnake) {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    
    // eslint-disable-next-line no-loop-func
    isOnSnake = snake.some((segment) => segment.x === position.x && segment.y === position.y);
  }
  
  return position;
};
