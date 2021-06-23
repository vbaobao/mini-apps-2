import React from 'react';

function Scoreboard (props) {
  const gameRound = [];
  for (let i = 0; i < 10; i++) {
    gameRound.push(i);
  }

  const frames = gameRound.map((roundIndex) => {
    const round = props.scores[roundIndex];
    const first = (round && round.first !== null) ? round.first : ' ';
    const second = (round && round.second !== null) ? round.second : ' ';
    const total = (round && round.total !== null) ? round.total : ' ';
    return (
      <div className="score-container" key={`round-${roundIndex}`}>
        <div className="frame-container">
          <div className="frame">{first}</div>
          <div className="frame">{second}</div>
        </div>
        <div className="total-score">{total}</div>
      </div>
    );
  });

  return (
    <div className="score-wrapper">
      {frames}
    </div>
  );
}

export default Scoreboard;
