import { createNewBoard } from './minesweeper';

const resetGame = (n = 10, mines = 10) => dispatch => {
  const newState = {
    board: createNewBoard(n, mines),
    revealed: new Array(n * n).fill(0),
    status: true
  };

  dispatch({
    type: 'RESET_GAME',
    payload: newState
  })
};

export default resetGame;
