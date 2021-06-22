import React from 'react';

function Pins (props) {
  const numbers = [];

  const clickHandler = (e) => {
    props.selectPin(e.target.value);
  };

  for (let i = 0; i <= 10; i++) {
    numbers.push(i);
  }

  const pins = numbers.map((pin) => {
    return (
      <div key={`pin-${pin}`}>
        <button key={`pin-button-${pin}`} value={pin} onClick={clickHandler}>
          {pin}
        </button>
      </div>
    )
  });

  return (
    <div>
      {pins}
    </div>
  );
}

export default Pins;
