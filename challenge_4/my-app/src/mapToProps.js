import resetGame from './actions/resetGame';
import sweep from './actions/sweep';

export const mapStateToProps = state => ({ ...state });

export const mapDispatchToProps = dispatch => ({
  resetGame: (n = 10, mines = 10) => dispatch(resetGame()),
  sweep: (cell, board, revealed, n) => dispatch(sweep(cell, board, revealed, n))
});
