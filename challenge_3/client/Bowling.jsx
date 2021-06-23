import React, { useState, useEffect } from 'react';
import Pins from './Pins.jsx';
import Scoreboard from './Scoreboard.jsx';

function Bowling (props) {
  const [scores, setScores] = useState([]);
  const [owedOneRound, setOwedOneRound] = useState([]);
  const [owedTwoRounds, setOwedTwoRounds] = useState([]);
  const [isFirstFrame, setIsFirstFrame] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [gameState, setGameState] = useState(true);
  const [bonus, setBonus] = useState(false);
  const maxFrames = 20;

  const toggleFrame = () => setIsFirstFrame(!isFirstFrame);

  const resetGame = () => {
    setScores([]);
    setOwedOneRound([]);
    setOwedTwoRounds([]);
    setIsFirstFrame(true);
    setCurrentFrame(0);
    setBonus(false);
    setGameState(true);
  };

  const selectPin = (pin) => {
    const updatedScores = [...scores];
    const newOwedOneRound = [];
    const newOwedTwoRounds = [];
    let bonusPlaceholder = bonus;
    let strike = false;

    for (const round of owedOneRound) {
      for (let i = round; i < updatedScores.length; i++) {
        updatedScores[i].total += Number(pin);
      }
    }

    for (const round of owedTwoRounds) {
      newOwedOneRound.push(round);
      for (let i = round; i < updatedScores.length; i++) {
        updatedScores[i].total += Number(pin);
      }
    }

    let currentTotal = updatedScores[updatedScores.length - 1]?.total || 0;

    if (isFirstFrame && Number(pin) === 10) {
      updatedScores.push({
        first: 'X',
        second: ' ',
        total: currentTotal + 10,
      });
      strike = true;
      newOwedTwoRounds.push(updatedScores.length - 1);
      if (updatedScores.length >= 10) {
        setBonus(true);
        bonusPlaceholder = true;
      };
    } else if (isFirstFrame) {
      updatedScores.push({
        first: pin,
        total: currentTotal + Number(pin),
      });
    } else if (isFirstFrame && bonus) {
      updatedScores.push({
        first: pin,
        total: currentTotal + Number(pin),
      });
    } else if (!isFirstFrame && Number(updatedScores[updatedScores.length - 1].first) + Number(pin) === 10) {
      updatedScores[updatedScores.length - 1].second = '/';
      updatedScores[updatedScores.length - 1].total = currentTotal + Number(pin);
      newOwedOneRound.push(updatedScores.length - 1);
    } else {
      updatedScores[updatedScores.length - 1].second = pin;
      updatedScores[updatedScores.length - 1].total = currentTotal + Number(pin);
    }

    setScores(updatedScores);
    setOwedOneRound(newOwedOneRound);
    setOwedTwoRounds(newOwedTwoRounds);

    let framePlaceholder = currentFrame;
    if (bonusPlaceholder) {
      setCurrentFrame(currentFrame + 0.75);
      framePlaceholder += 0.75;
    } else if (strike) {
      setCurrentFrame(currentFrame + 2);
      framePlaceholder += 2;
    } else {
      setCurrentFrame(currentFrame + 1);
      framePlaceholder += 1;
      toggleFrame();
    }

    if (framePlaceholder >= maxFrames) setGameState(false);
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
      <Scoreboard scores={scores} isFirstFrame={isFirstFrame} bonus={bonus}/>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
}

export default Bowling;
