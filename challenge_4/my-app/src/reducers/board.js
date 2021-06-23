const board = (state = [], action) => {
  switch (action.type) {
    case 'RESET_GAME':
      return action.payload;
    case 'SWEEP':
      return action.payload;
    default:
      return state;
  }
}

export default board;
