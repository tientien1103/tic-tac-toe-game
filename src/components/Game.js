import React, { useState, useEffect } from "react";
import Board from "./Board";

let moveIndex = 0;
let currentMove = 0;

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  // const [currentMove, setCurrentMove] = useState(0)

  const [history, setHistory] = useState([
    {
      title: "Go to game start",
      squares,
      xIsNext,
      winner,
    },
  ]);

  //Declaring a Winner
  useEffect(() => {
    const newWinner = calculateWinner(squares);

    if (newWinner) {
      setWinner(newWinner);
    }
  }, [squares]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player click
  const handleClick = (i) => {
    // squares[i] nếu đã có giá trị hoặc đã có người thắng cuộc, thì ngưng
    if (squares[i] || winner) {
      return;
    }

    const newXIsNext = !xIsNext;

    const newSquares = squares.map((square, index) => {
      if (index === i) {
        // if xIsNext => người đánh sẽ là X => set 'X'
        // else => người đánh sẽ là 'O' => set 'O' cho squares[i]
        let newSquare = xIsNext ? "X" : "O";
        return newSquare;
      }

      return square;
    });

    if (currentMove) {
      moveIndex = currentMove + 1;
    } else {
      moveIndex++;
    }

    if (currentMove) {
      setHistory([
        ...history.slice(0, moveIndex),
        {
          title: `Go to move #${moveIndex}`,
          squares: newSquares,
          xIsNext: newXIsNext,
          winner,
        },
      ]);
    } else {
      setHistory([
        ...history,
        {
          title: `Go to move #${moveIndex}`,
          squares: newSquares,
          xIsNext: newXIsNext,
          winner,
        },
      ]);
    }

    // squares[i] nếu nó chưa có giá trị, thì mình set 'X' hoặc 'O'
    // ki thuat setState cho array - cập nhật 1 phần tử khi có index của phần tử đó
    setSquares(newSquares);

    // toggle xIsNext
    setXIsNext(newXIsNext); // !true = false

    currentMove = 0;
  };

  //Restart game
  const handlRestart = () => {
    // reset các state của app
    // reset winner, xIsNext, squares
    setWinner(null);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setHistory([
      {
        title: "Go to game start",
        squares,
        xIsNext,
        winner,
      },
    ]);
    currentMove = 0;
    moveIndex = 0;
  };

  const handleClickHistory = (i) => {
    const historyAtI = history[i];
    const { winner, squares, xIsNext } = historyAtI;

    currentMove = i;

    setWinner(winner);
    setSquares(squares);
    setXIsNext(xIsNext);
  };

  console.log("history", history);

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />
        {/* render component history */}
        <div className="history">
          <h4>History</h4>
          <ul>
            {history.map((record, index) => {
              return (
                <li
                  className="his"
                  // onClick={(event) => handleClickHistory(event)}
                  onClick={() => handleClickHistory(index)}
                >
                  {record.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
