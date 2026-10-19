import { useState } from 'react';
import './App.css';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const INITIAL_BOARD = ['', '', '', '', '', '', '', '', ''];

export default function App() {
  const [board, setBoard] = useState([...INITIAL_BOARD]);
  const [turn, setTurn] = useState('X');
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);

  const handleCellClick = (i) => {
    // Ignore occupied cells and moves after the game ends
    if (board[i] !== '' || winner !== null) {
      return;
    }

    // Create the updated board
    const nextBoard = board.map((cell, index) => (index === i ? turn : cell));

    setBoard(nextBoard);

    // Check whether the current player has won
    const winPattern = WINNING_COMBINATIONS.find((pattern) =>
      pattern.every((index) => nextBoard[index] === turn)
    );

    if (winPattern) {
      setWinner(turn);
      setWinningCells(winPattern);

      if (turn === 'X') {
        setXScore((prev) => prev + 1);
      } else {
        setOScore((prev) => prev + 1);
      }

      return;
    }

    // Check for a draw
    if (nextBoard.every((cell) => cell !== '')) {
      setWinner('Draw');
      setDraws((prev) => prev + 1);
      return;
    }

    // Switch turns only if the game continues
    setTurn((prev) => (prev === 'X' ? 'O' : 'X'));
  };

  const restartRound = () => {
    setBoard([...INITIAL_BOARD]);
    setTurn('X');
    setWinner(null);
    setWinningCells([]);
  };

  const resetAll = () => {
    restartRound();
    setXScore(0);
    setOScore(0);
    setDraws(0);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title" style={{ fontWeight: 'bolder' }}>
          Tic-Tac-Toe
        </h1>

        <div className="info">
          <div className="stat">
            <p style={{ color: 'red' }}>X: {xScore}</p>
          </div>

          <div className="stat">
            <p style={{ color: 'grey' }}>Draws: {draws}</p>
          </div>

          <div className="stat">
            <p style={{ color: 'blue' }}>O: {oScore}</p>
          </div>
        </div>

        <div className="turn">
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {winner === 'Draw'
              ? "It's a Draw! 🤝"
              : winner
                ? `Winner: ${winner}! 🎉`
                : `Turn: ${turn}`}
          </p>
        </div>

        <div className="board">
          {board.map((cell, i) => {
            const isWinningCell = winningCells.includes(i);

            return (
              <button
                key={i}
                className="cell"
                style={{
                  backgroundColor: isWinningCell ? '#4cd137' : '',
                  color: isWinningCell ? 'white' : '',
                }}
                onClick={() => handleCellClick(i)}
                disabled={cell !== '' || winner !== null}
              >
                {cell}
              </button>
            );
          })}
        </div>

        <div className="ctas">
          <button className="cta" onClick={restartRound}>
            {winner && winner !== 'Draw' ? 'Play Again' : 'Restart Round'}
          </button>

          <button className="cta" onClick={resetAll}>
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
