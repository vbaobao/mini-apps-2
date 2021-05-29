import React, { useRef, useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function History (props) {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  let chart, labels, data, config;

  if (!props.data?.bpi) {
    chart = <p>...loading</p>;
  } else {
    chart = <canvas ref={chartContainer} />;
    labels = Object.keys(props.data.bpi);
    data = {
      labels: labels,
      datasets: [{
        label: 'BTC closing price',
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 1,
        data: Object.values(props.data.bpi),
      }]
    };
    config = {
      type: 'line',
      data,
      options: {}
    };
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartInstance) chartInstance.destroy();
      const newChartInstance = new Chart(chartContainer.current, config);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.data]);

  return (
    <div>
      {chart}
    </div>
  );
};

export default History;
