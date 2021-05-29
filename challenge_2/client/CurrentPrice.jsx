import React from 'react';

function CurrentPrice (props) {
  const rate = props.data?.bpi?.[props.currency]?.rate
    ? props.data.bpi?.[props.currency].rate: '';
  const currencyCode = props.data?.bpi?.[props.currency]?.code
    ? props.data.bpi?.[props.currency]?.code : '';
  const lastUpdate = props.data?.time?.updated ? props.data.time.updated : '';
  return (
    <div>
      <div>
        <span className="crypto name">1 BTC</span>
        <span className="crypto arrow">➲</span>
        <span className="crypto price">
          <span className="crypto rate">{rate}</span> {currencyCode}
        </span>
      </div>
      <div>
        <b>Last updated:</b> {lastUpdate}
      </div>
    </div>
  );
};

export default CurrentPrice;
