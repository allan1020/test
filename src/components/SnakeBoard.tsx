import { GameState } from "../types";
import { GRID_SIZE } from "../constants";

interface Props {
  gameState: GameState;
}

export const SnakeBoard = ({ gameState }: Props) => {
  const grid = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => 0));
  
  return (
    <div 
      className="flex flex-col border-4 border-amber-500 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.3)] bg-stone-900/40 backdrop-blur-sm relative transition-all"
      style={{
        width: '100%',
        maxWidth: '600px',
        aspectRatio: '1 / 1'
      }}
    >
      {grid.map((row, y) => (
        <div key={y} className="flex flex-1">
          {row.map((_, x) => {
            const isFood = gameState.food.x === x && gameState.food.y === y;
            const snakeIndex = gameState.snake.findIndex(s => s.x === x && s.y === y);
            const isSnake = snakeIndex !== -1;
            const isHead = snakeIndex === 0;

            let cellClass = "flex-1 border-[0.5px] border-amber-900/10 ";
            
            if (isHead) {
              cellClass += "bg-emerald-400 rounded-sm shadow-[0_0_10px_rgba(52,211,153,0.8)] z-10 scale-[1.05]";
            } else if (isSnake) {
              cellClass += "bg-emerald-500 rounded-sm scale-95 opacity-90";
            } else if (isFood) {
              cellClass += "bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.8)] scale-75 animate-pulse";
            } else {
              cellClass += "bg-transparent";
            }

            return <div key={`${x}-${y}`} className={cellClass} />;
          })}
        </div>
      ))}
    </div>
  );
};
