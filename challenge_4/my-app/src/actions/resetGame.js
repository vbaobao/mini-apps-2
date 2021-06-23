const resetGame = () => dispatch => {
  dispatch({
    type: 'RESET_GAME',
    payload: []
  })
};

export default resetGame;
