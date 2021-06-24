const initialState = {
  board: [],
  revealed: [],
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
