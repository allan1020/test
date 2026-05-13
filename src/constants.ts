import { Point } from "./types";

// 網格大小
export const GRID_SIZE = 20;

// 遊戲刷新速率，對應蛇的移動速率
export const TICK_RATE_MS = 150;

// 初始蛇的座標狀態（位在畫面中間，預設 3 節身體，往上移動）
export const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

export const DIR_MAP: Record<string, Point> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};
