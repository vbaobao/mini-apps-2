import { createNewBoard } from '../actions/minesweeper';

const initialState = {
  board: createNewBoard(10, 10),
  revealed: new Array(10 * 10).fill(0),
  status: true
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_GAME':
      return {
        ...state,
        ...action.payload
      };
    case 'SWEEP':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default game;
