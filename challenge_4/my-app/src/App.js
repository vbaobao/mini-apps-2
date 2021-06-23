import './App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';

function App(props) {
  const boardSize = 10;
  const numberOfMines = 10;
  const reset = () => { props.resetGame(boardSize, numberOfMines); };
  const sweep = (e) => { props.sweep(Number(e.target.value), props.game.board, props.game.revealed, boardSize); };

  return (
    <div className="App">
      <pre>
        { JSON.stringify(props) }
      </pre>
      <button onClick={reset}>Test reset</button>
      <button onClick={sweep} value="3">Test sweep</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
