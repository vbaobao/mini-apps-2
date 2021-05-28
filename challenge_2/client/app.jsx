import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from './Form.jsx';
import CurrentPrice from './CurrentPrice.jsx';
import Chart from './Chart.jsx';

function App() {
  const [history, setHistory] = useState([]);
  const [closingPrice, setClosingPrice] = useState([]);
  const [start, setStart] = useState({ year: '', month: ''});
  const [end, setEnd] = useState({ year: '', month: '' });
  const [supportedCurrency, setSupportedCurrency] = useState('');

  useEffect(() => {
    getCurrentPrice();
    getHistoricalPrices();
  }, [start, end, supportedCurrency]);

  const updateCurrency = useCallback((newCurrency) => {
    setSupportedCurrency(newCurrency);
  });

  const updateDateRange = useCallback(async (newStart, newEnd) => {
    setStart(newStart);
    setEnd(newEnd);
  });

  const getCurrentPrice = () => {
    const api = supportedCurrency
      ? `https://api.coindesk.com/v1/bpi/currentprice/${supportedCurrency}.json`
      : 'https://api.coindesk.com/v1/bpi/currentprice.json';
    return axios.get(api)
      .then((res) => setClosingPrice(res.data))
      .catch((err) => console.error(err));
  };
  
  const getHistoricalPrices = () => {
    let api = 'https://api.coindesk.com/v1/bpi/historical/close.json';
    if (start.year.length && end.year.length) {
      api += `?start=${start.year}-${start.month}-01&end=${end.year}-${end.month}-01`;
    } else if (start.year.length && !end.year.length) {
      api += `?start=${start.year}-${start.month}-01`;
    } else if (!start.year.length && end.year.length) {
      api += `?end=${end.year}-${end.month}-01`;
    }
    axios.get(api)
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Title</h1>
      <CurrentPrice data={closingPrice}/>
      <Chart data={history}/>
      <Form changeCurrency={updateCurrency} changeDates={updateDateRange}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
