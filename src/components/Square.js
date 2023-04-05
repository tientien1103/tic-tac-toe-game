import React from "react";

function Square({ index, square, handleClick }) {
  return (
    <button className={"square"} onClick={() => handleClick(index)}>
      {square}
    </button>
  );
}

export default Square;
