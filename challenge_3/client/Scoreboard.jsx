import React from 'react';

function Scoreboard (props) {
  const gameRound = [];
  for (let i = 0; i < 10; i++) {
    gameRound.push(i);
  }

  const frames = gameRound.map((roundIndex) => {
    const round = props.scores[roundIndex];
    const first = (round && round.first !== null) ? round.first : ' ';
    let second = (round && round.second !== null) ? round.second : ' ';
    let third = '';
    const total = (round && round.total !== null) ? round.total : ' ';

    if (props.bonus && roundIndex === 9 && props.scores.length > 10) second = props.scores[10].first;
    if (props.bonus && roundIndex === 9 && props.scores.length === 12) third = <div className="frame">{props.scores[11].first}</div>;

    return (
      <div className="score-container" key={`round-${roundIndex}`}>
        <div className="frame-container">
          <div className="frame">{first}</div>
          <div className="frame">{second}</div>
          {third}
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
