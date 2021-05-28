import React from 'react';

function CurrentPrice (props) {
  return (
    <div>
      <h2>Current Price</h2>
      {JSON.stringify(props.data)}
    </div>
  );
};

export default CurrentPrice;
