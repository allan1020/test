import { Trophy, Play, Pause, RotateCcw, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useSnakeGame } from "./hooks/useSnakeGame";
import { SnakeBoard } from "./components/SnakeBoard";

export default function App() {
  const { gameState, startGame, pauseGame, changeDirection } = useSnakeGame();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-900 overflow-hidden relative p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 to-stone-950 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 -z-10 pointer-events-none" />

      <main className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center z-10 mx-auto">
        
        <div className="relative w-full max-w-[600px] flex-shrink-0 group flex justify-center">
          <SnakeBoard gameState={gameState} />

          {gameState.gameOver && (
            <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg border-4 border-rose-500/50 z-20">
              <h2 className="text-4xl md:text-5xl font-black text-rose-500 mb-2 tracking-widest drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                遊戲結束
              </h2>
              <p className="text-lg text-stone-300 mb-8 font-medium">
                最終得分: <span className="text-amber-400 font-bold">{gameState.score}</span>
              </p>
              <button
                tabIndex={-1}
                onClick={startGame}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(225,29,72,0.4)] cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                重新開始
              </button>
            </div>
          )}

          {!gameState.gameOver && gameState.isPaused && (
            <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-20">
              <Gamepad2 className="w-16 h-16 text-amber-500 mb-6 opacity-80" />
              <button
                tabIndex={-1}
                onClick={startGame}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 px-8 py-3 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer"
              >
                <Play className="w-6 h-6 fill-current" />
                {gameState.score === 0 ? "開始遊戲" : "繼續遊戲"}
              </button>
              <p className="mt-6 text-stone-400 text-sm font-medium bg-stone-900/50 px-4 py-2 rounded-full hidden md:block">
                按下 <kbd className="font-mono text-amber-400 font-bold mx-1">空白鍵</kbd> 以進行遊戲
              </p>
            </div>
          )}
        </div>

        <aside className="w-full lg:w-72 flex flex-col gap-6 flex-shrink-0">
          
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black italic tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-600 drop-shadow-sm mb-1">
              貪食蛇大冒險
            </h1>
            <p className="text-stone-400 text-sm font-medium tracking-wide">CLASSIC SNAKE REACT</p>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 shadow-xl supports-[backdrop-filter]:backdrop-blur-md">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  目前分數
                </p>
                <div className="text-5xl font-black text-white font-mono tracking-tight">
                  {gameState.score}
                </div>
              </div>
              <div className="h-px w-full bg-stone-800" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1 pl-1">最高紀錄</p>
                  <div className="text-2xl font-bold text-amber-500 font-mono tracking-tight">
                    {gameState.highScore}
                  </div>
                </div>
                <Trophy className="w-10 h-10 text-amber-500/20" />
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden w-full max-w-[280px] mx-auto mt-2">
            <div className="grid grid-cols-3 gap-3">
              <div />
              <button 
                onClick={() => changeDirection('UP')} 
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 p-5 rounded-2xl flex justify-center items-center active:bg-amber-500 active:text-stone-900 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ArrowUp className="w-8 h-8" />
              </button>
              <div />
              <button 
                onClick={() => changeDirection('LEFT')} 
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 p-5 rounded-2xl flex justify-center items-center active:bg-amber-500 active:text-stone-900 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={() => changeDirection('DOWN')} 
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 p-5 rounded-2xl flex justify-center items-center active:bg-amber-500 active:text-stone-900 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ArrowDown className="w-8 h-8" />
              </button>
              <button 
                onClick={() => changeDirection('RIGHT')} 
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 p-5 rounded-2xl flex justify-center items-center active:bg-amber-500 active:text-stone-900 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ArrowRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Desktop Instructions */}
          <div className="hidden lg:block bg-stone-900/50 border border-stone-800/50 rounded-2xl p-5">
            <p className="text-stone-400 text-sm mb-4 font-medium text-center uppercase tracking-widest px-2">鍵盤操作指南</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-stone-300 text-sm">
                <span className="font-medium text-stone-400">移動</span>
                <div className="flex gap-1.5">
                  <kbd className="bg-stone-800 border-b-2 border-stone-700 px-2.5 py-1 rounded-md font-mono font-bold shadow-sm">W</kbd>
                  <kbd className="bg-stone-800 border-b-2 border-stone-700 px-2.5 py-1 rounded-md font-mono font-bold shadow-sm">A</kbd>
                  <kbd className="bg-stone-800 border-b-2 border-stone-700 px-2.5 py-1 rounded-md font-mono font-bold shadow-sm">S</kbd>
                  <kbd className="bg-stone-800 border-b-2 border-stone-700 px-2.5 py-1 rounded-md font-mono font-bold shadow-sm">D</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between text-stone-300 text-sm">
                <span className="font-medium text-stone-400">方向鍵</span>
                <div className="flex gap-1.5">
                  <kbd className="bg-stone-800 border-b-2 border-stone-700 px-2.5 py-1 rounded-md font-mono font-bold shadow-sm">↑</kbd>
                  <kbd className="bg-stone-800 border-b-2 border-stone-700 px-2.5 py-1 rounded-md font-mono font-bold shadow-sm">↓</kbd>
                  <kbd className="bg-stone-800 border-b-2 border-stone-700 px-2.5 py-1 rounded-md font-mono font-bold shadow-sm">←</kbd>
                  <kbd className="bg-stone-800 border-b-2 border-stone-700 px-2.5 py-1 rounded-md font-mono font-bold shadow-sm">→</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between text-stone-300 text-sm">
                <span className="font-medium text-stone-400">暫停/繼續</span>
                <kbd className="bg-stone-800 border-b-2 border-stone-700 px-4 py-1.5 rounded-md font-mono font-bold text-xs tracking-wider shadow-sm">SPACE</kbd>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                tabIndex={-1}
                onClick={pauseGame}
                disabled={gameState.gameOver}
                className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border-2 border-stone-700 hover:border-amber-500 hover:text-amber-500 text-stone-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold tracking-wide cursor-pointer w-full justify-center"
              >
                {gameState.isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                {gameState.isPaused ? "繼續遊戲" : "暫停遊戲"}
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
