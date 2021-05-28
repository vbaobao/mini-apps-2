import React from 'react';

function Chart (props) {
  return (
    <div>
      <h2>Chart</h2>
      {JSON.stringify(props.data)}
    </div>
  );
};

export default Chart;
