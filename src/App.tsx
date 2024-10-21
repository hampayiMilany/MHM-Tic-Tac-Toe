import './Styles/App.scss'
import Board from './Components/GameBoard/GameBoard'
import GameStartMenu from './Components/GameStartMenu/GameStartMenu';
import { useState } from 'react';

function App() {
  const [playWithCpu, setPlayWithCPU] = useState(true);
  const [isGameStart, setIsGameStart] = useState(false);
  const [xIsFirst, setXIsFirst] = useState(true);

  function gameExited() {
    setIsGameStart(false);
    setXIsFirst(true);
  }

  return (
    <>
      {
        isGameStart === false ?
          <GameStartMenu
            xIsFirst={() => setXIsFirst(true)}
            oIsFirst={() => setXIsFirst(false)}
            startGame={() => setIsGameStart(true)}
            playWithCPU={() => setPlayWithCPU(true)}
            playWithPlayer={() => setPlayWithCPU(false)}
          />
          :
          <Board
            player1Name={playWithCpu ? 'YOU' : 'Player 1'}
            player2Name={playWithCpu ? 'CPU' : 'Player 2'}
            isCpuPlay={playWithCpu}
            whoIsFirst={xIsFirst}
            quitFromGame={gameExited}
          />
      }
    </>
  );

}

export default App
