import React from 'react';

function Scoreboard (props) {
  const frames = props.scores.map((frame) => {
    return (
      <div>
        <div>
          <div className="frames">{frame.first}</div>
          <div className="frames">{frame.second}</div>
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
