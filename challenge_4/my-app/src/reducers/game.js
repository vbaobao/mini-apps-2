const game = (state = {}, action) => {
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
