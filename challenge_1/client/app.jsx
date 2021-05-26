import React, { useState }from 'react';
import ReactDOM from 'react-dom';

function App(props) {
  const [data, setData] = useState(null);
  return (<h1>Test</h1>);
}

ReactDOM.render(<App />, document.getElementById('root'));
