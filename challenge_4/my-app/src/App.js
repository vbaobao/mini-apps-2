import './App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';

function App(props) {
  const reset = (e) => { props.resetGame(); };
  const sweep = (e) => { props.sweep(); };

  return (
    <div className="App">
      <pre>
        { JSON.stringify(props) }
      </pre>
      <button onClick={reset}>Test reset</button>
      <button onClick={sweep}>Test sweep</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
