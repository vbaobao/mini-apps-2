import React from 'react';

function Board (props) {
  const clickHandler = (e) => {
    props.sweep(e.target.getAttribute('value'));
  };

  const board = props.board.map((cell, index) => {
    const isRevealed = props.revealed[index];
    return (
      <div
        key={index} value={index}
        className={isRevealed ? 'cell-container' : 'cell-container hidden'}
        onClick={clickHandler}
      >
        <span>
          {isRevealed ? cell : ' '}
        </span>
      </div>
    );
  });

  return (
    <div className="board-container">
      {board}
    </div>
  );
}

export default Board;
