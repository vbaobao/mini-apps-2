const sweep = () => dispatch => {
  dispatch({
    type: 'SWEEP',
    payload: ['swept']
  });
};

export default sweep;
