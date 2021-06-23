import React, { useState, useEffect } from 'react';
import Pins from './Pins.jsx';
import Scoreboard from './Scoreboard.jsx';

function Bowling (props) {
  const [scores, setScores] = useState([]);
  const [rolls, setRolls] = useState([]);
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
    setRolls([...rolls, Number(pin)]);

    const updatedScores = [...scores];
    let currentTotal = updatedScores[updatedScores.length - 1]?.total || 0;

    if (isFirstFrame && Number(pin) === 10) {
      updatedScores.push({
        first: 'X',
        second: ' ',
        total: currentTotal + 10,
      });
    } else if (isFirstFrame) {
      updatedScores.push({
        first: pin,
        total: currentTotal + Number(pin),
      });
      toggleFrame();
    } else if (!isFirstFrame && Number(updatedScores[updatedScores.length - 1].first) + Number(pin) === 10) {
      updatedScores[updatedScores.length - 1].second = '/';
      updatedScores[updatedScores.length - 1].total = currentTotal + Number(pin);
      toggleFrame();
    } else {
      updatedScores[updatedScores.length - 1].second = pin;
      updatedScores[updatedScores.length - 1].total = currentTotal + Number(pin);
      toggleFrame();
    }

    setScores(updatedScores);

    if (currentFrame === maxFrames) {
      console.log('Game is over!');
      setGameState(false);
    } else {
      setCurrentFrame(currentFrame + 1);
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
