import React from 'react';

function Scoreboard (props) {
  const frames = props.scores.map((round) => {
    return (
      <div key={`round-${round}`}>
        <div>
          <div className="frame">{round.first}</div>
          <div className="frame">{round.second}</div>
        </div>
        <div className="total-score"></div>
      </div>
    );
  });

  return (
    <div>
      {frames}
    </div>
  );
}

export default Scoreboard;
