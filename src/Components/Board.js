import React , {useState,useEffect} from 'react';
import createBoard from '../Util/CreateBoard';
import {revealed} from '../Util/Reveal';
import Modal from './Modal';
import TopBar from "./TopBar";
import Cell from './Cell';
import './Board.css';

const Board = () => {
    const [board, setBoard] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [newTime, setTime] = useState(0);

  useEffect(() => {
    const generateBoard = () => {
      const getBoard = createBoard(10, 15, 20, setMineLocations);
      setNonMinesCount(100 - 20);
      setTime(0);
      setBoard(getBoard.board);
      setMineLocations(getBoard.mineLocation);
      setGameOver(false);
      setRestart(false);
    };
    generateBoard();
  }, [restart, setRestart]);

  const updateBoard = (x, y) => {
    if(board[x][y].revealed || gameOver){
        return;
    }  
    let newBoardValues = JSON.parse(JSON.stringify(board));
    let newNonMinesCount = nonMinesCount;
    if (newBoardValues[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        if (!newBoardValues[mineLocations[i][0]][mineLocations[i][1]].revealed) 
        {
          newBoardValues[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
          setBoard(newBoardValues);
        }
      }
      setGameOver(true);
    } else {
      // newBoardValues[x][y].revealed = true;
      newBoardValues = revealed(newBoardValues, x, y, newNonMinesCount);
      if (!newBoardValues) {
        return;
      }
      setBoard(newBoardValues.arr);
      setNonMinesCount(newBoardValues.newNonMinesCount);
      if(newBoardValues.newBoardValues ===0 ){
          setGameOver(true);
      }
    }
  };

  const flagCell = (x, y) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    newBoardValues[x][y].flagged = !newBoardValues[x][y].flagged;
    setBoard(newBoardValues);
    console.log(newBoardValues[x][y])
  };

  return (
    <div className="board">
      {gameOver && <Modal reset={setRestart} completeTime={newTime} />}
      <TopBar gameOver={gameOver} setTime={setTime} newTime={newTime} />
      {board?.map((row, index) => (
        
          <div className="board__row" key={index}>
            {row?.map((singleCell, index) => (
              
                <Cell
                  key={index}
                  data={singleCell}
                  updateBoard={updateBoard}
                  flagCell={flagCell}
                />
              
                ))}
          </div>
        
        ))}
    </div>
  );
}

export default Board;