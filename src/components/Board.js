import React, { useState } from "react";
import Square from "./Square";

// squares là mảng 9 phần tử đại diện cho 9 ô theo thứ tự từ trái sang phải, từ trên xuống dưới
export default function Board({ squares, handleClick }) {
  // lấy ra 3 ô đầu tiên của maảng squares, có thể dùng squares.slice()
  const firstRow = squares.slice(0, 3);
  // lấy ra 3 ô tiếp theo của maảng squares
  const secondRow = squares.slice(3, 6);
  // lấy ra 3 ô cuối cùng
  const thirdRow = squares.slice(6, 9);

  return (
    <div className="board">
      <div>
        <div className="board-row">
          {/* firstRow render ra cac <Square square={square} /> */}
          {firstRow.map((square, index) => (
            <Square
              index={index}
              key={index}
              square={square}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="board-row">
          {/* secondRow render ra cac <Square /> */}
          {secondRow.map((square, index) => (
            <Square
              index={3 + index}
              key={index}
              square={square}
              handleClick={handleClick}
            />
          ))}
        </div>
        <div className="board-row">
          {/* thirdRow render ra cac <Square /> */}
          {thirdRow.map((square, index) => (
            <Square
              index={6 + index}
              key={index}
              square={square}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
