import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'

function Board (props) {
  const clickHandler = (e) => {
    if (props.status) props.sweep(e.target.getAttribute('value'));
  };

  const board = props.board.map((cell, index) => {
    const isRevealed = props.revealed[index];
    const cellIcon = cell === -100 ? 	<FontAwesomeIcon icon={faBomb} /> : cell;
    return (
      <div
        key={index} value={index}
        className={isRevealed ? 'cell-container' : 'cell-container hidden'}
        onClick={clickHandler}
      >
        <span>
          {isRevealed ? cellIcon : ' '}
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
