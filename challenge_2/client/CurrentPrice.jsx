import React from 'react';

function CurrentPrice (props) {
  const crypto = props.data?.chartName ? props.data.chartName : '';
  const rate = props.data?.bpi?.USD.rate ? props.data.bpi.USD.rate : '';
  const currencyCode = props.data?.bpi?.USD.code ? props.data.bpi.USD.code : '';
  const lastUpdate = props.data?.time?.updated ? props.data.time.updated : '';
  return (
    <div>
      <div>
        <span className="crypto_name">
        {crypto}
        </span>
        <span className="crypto_price">
          <span className="crypto_rate">{rate}</span> {currencyCode}
        </span>
      </div>
      <div>
        <b>Last updated:</b> {lastUpdate}
      </div>
    </div>
  );
};

export default CurrentPrice;
