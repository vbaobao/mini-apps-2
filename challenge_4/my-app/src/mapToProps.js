import resetGame from './actions/resetGame';
import sweep from './actions/sweep';

export const mapStateToProps = state => ({ ...state });

export const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame()),
  sweep: () => dispatch(sweep())
});
