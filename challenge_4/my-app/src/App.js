import './App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';
import Board from './components/Board';

function App(props) {
  const boardSize = 10;
  const numberOfMines = 10;
  const reset = () => { props.resetGame(boardSize, numberOfMines); };
  const sweep = (index) => { props.sweep(Number(index), props.game.board, props.game.revealed, boardSize); };

  return (
    <div className="App">
      <pre>
        { JSON.stringify(props) }
      </pre>
      <button onClick={reset}>Test reset</button>
      <button onClick={sweep} value="3">Test sweep</button>
      <Board
        board={props.game.board}
        revealed={props.game.revealed}
        status={props.game.status}
        boardSize={boardSize}
        sweep={sweep}
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
