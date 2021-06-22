import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Pins from './Pins.jsx';
import Scoreboard from './Scoreboard.jsx';

function App (props) {
  const [scores, setScores] = useState([]);
  const [isFirstFrame, setIsFirstFrame] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);
  const maxFrames = 10;

  const toggleFrame = () => setIsFirstFrame(!isFirstFrame);

  const selectPin = (pin) => {
    const updatedScores = [...scores];

    if (isFirstFrame) {
      updatedScores.push({ first: pin });
    } else {
      const lastRound = updatedScores.length - 1;
      updatedScores[lastRound].second = pin;
    }

    setScores(updatedScores);

    if (currentFrame + 1 === maxFrames) {
      console.log('Game is over!');
    } else {
      setCurrentFrame(currentFrame + 1);
      toggleFrame();
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
      <Pins selectPin={selectPin} />
      <Scoreboard scores={scores} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
