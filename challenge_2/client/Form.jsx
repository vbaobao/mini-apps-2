import React, { useState } from 'react';
import MonthsDropdown from './MonthsDropdown.jsx';
import YearsDropdown from './YearsDropdown.jsx';

function Form (props) {
  const [formStart, setFormStart] = useState({ month: '', year: '' });
  const [formEnd, setFormEnd] = useState({ month: '', year: '' });

  const handleChange = (e) => {
    props.changeCurrency(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log({...formStart});
    console.log({...formEnd});
    props.changeStartDate({...formStart});
    props.changeEndDate({...formEnd});
    e.preventDefault();
  };

  const handleDateChange = (e) => {
    const info = e.target.name.split(' ');
    if (info[0] === 'start') {
      const temp = formStart;
      temp[info[1]] = e.target.value;
      setFormStart(temp);
    } else {
      const temp = formEnd;
      temp[info[1]] = e.target.value;
      setFormEnd(temp);
    }
    console.log('Start update: ', formStart);
    console.log('End update: ', formEnd);
  }

  return (
    <div className="options">
      <form className="currency_type">
        <label>
          Currency:
          <select onChange={handleChange}>
            <option value=""></option>
            <option value="CNY">CNY</option>
            <option value="CAD">CAD</option>
            <option value="HKD">HKD</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="RUB">RUB</option>
            <option value="THB">THB</option>
            <option value="TWD">TWD</option>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
          </select>
        </label>
      </form>
      <form className="date_range" onSubmit={handleSubmit}>
        <div className="date_range_start">
          <label>From:</label>
          <MonthsDropdown dateType="start" handleDateChange={handleDateChange} />
          <YearsDropdown dateType="start" handleDateChange={handleDateChange} />
        </div>
        <div className="date_range_end">
          <label>To:</label>
          <MonthsDropdown dateType="end" handleDateChange={handleDateChange} />
          <YearsDropdown dateType="end" handleDateChange={handleDateChange} />
        </div>
        <input type="submit" value="look at new range" />
      </form>
    </div>
  );
};

export default Form;
