import { selectCell } from './minesweeper';

const sweep = (cell, board, revealed, n) => dispatch => {
  dispatch({
    type: 'SWEEP',
    payload: selectCell(cell, board, revealed, n)
  });
};

export default sweep;
