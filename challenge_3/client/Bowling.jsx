import React, { useState, useEffect } from 'react';
import Pins from './Pins.jsx';
import Scoreboard from './Scoreboard.jsx';

function Bowling (props) {
  const [scores, setScores] = useState([]);
  const [isFirstFrame, setIsFirstFrame] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [gameState, setGameState] = useState(true);
  const maxFrames = 20;

  const toggleFrame = () => setIsFirstFrame(!isFirstFrame);

  const resetGame = () => {
    setScores([]);
    setIsFirstFrame(true);
    setCurrentFrame(1);
    setGameState(true);
  };

  const selectPin = (pin) => {
    const updatedScores = [...scores];

    if (isFirstFrame) {
      updatedScores.push({
        first: Number(pin),
        total: Number(pin),
      });
    } else {
      const lastRound = updatedScores.length - 1;
      updatedScores[lastRound].second = Number(pin);
      updatedScores[lastRound].total = updatedScores[lastRound].first + Number(pin);
    }

    setScores(updatedScores);

    if (currentFrame === maxFrames) {
      console.log('Game is over!');
      setGameState(false);
    } else {
      setCurrentFrame(currentFrame + 1);
      toggleFrame();
    }
  };

  return (
    <div>
      <h1>{gameState ? 'Let\'s Play!' : 'Game over!'}</h1>
      <Pins
        selectPin={selectPin}
        isFirstFrame={isFirstFrame}
        currentRound={scores[scores.length - 1]}
        gameState={gameState}
      />
      <Scoreboard scores={scores} isFirstFrame={isFirstFrame} />
      <button onClick={resetGame}>Restart</button>
    </div>
  );
}

export default Bowling;
