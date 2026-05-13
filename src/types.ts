export type Point = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface GameState {
  snake: Point[];
  food: Point;
  direction: Direction;
  gameOver: boolean;
  score: number;
  highScore: number;
  isPaused: boolean;
}
