import React from 'react';

function Pins (props) {
  const numbers = [];
  const pinsRemaining = props.isFirstFrame ? 10 : 10 - props.currentRound.first;

  for (let i = 0; i <= 10; i++) {
    numbers.push(i);
  }

  const clickHandler = (e) => {
    props.selectPin(e.target.value);
  };

  const pins = numbers.map((pin) => {
    const button = pin <= pinsRemaining && props.gameState
      ? <button key={`pin-button-${pin}`} value={pin} onClick={clickHandler}>{pin}</button>
      : <button key={`pin-button-${pin}`} value={pin} className="inactive">{pin}</button>;

    return (
      <div key={`pin-${pin}`}>
        {button}
      </div>
    )
  });

  return (
    <div className="pins-wrapper">
      {pins}
    </div>
  );
}

export default Pins;
