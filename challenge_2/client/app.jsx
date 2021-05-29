import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from './Form.jsx';
import CurrentPrice from './CurrentPrice.jsx';
import History from './History.jsx';

function App() {
  const [history, setHistory] = useState([]);
  const [closingPrice, setClosingPrice] = useState([]);
  const [start, setStart] = useState({ year: '', month: ''});
  const [end, setEnd] = useState({ year: '', month: '' });
  const [supportedCurrency, setSupportedCurrency] = useState('USD');

  useEffect(() => {
    getCurrentPrice();
    getHistoricalPrices();
    console.log('Getting new data ...');
  }, [start, end, supportedCurrency]);

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
      <CurrentPrice data={closingPrice} currency={supportedCurrency}/>
      <History data={history}/>
      <Form
        changeCurrency={setSupportedCurrency}
        changeStartDate={setStart}
        changeEndDate={setEnd}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
