const resetGame = () => dispatch => {
  dispatch({
    type: 'RESET_GAME',
    payload: {
      board: [],
      revealed: [],
      hidden: [],
      status: true
    }
  })
};

export default resetGame;
