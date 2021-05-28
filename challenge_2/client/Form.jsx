import React, { useState } from 'react';
import MonthsDropdown from './MonthsDropdown.jsx';
import YearsDropdown from './YearsDropdown.jsx';

function Form (props) {
  const [start, setStart] = useState({ month: '', year: '' });
  const [end, setEnd] = useState({ month: '', year: '' });

  const handleChange = (e) => {
    props.changeCurrency(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(start, end);
    props.changeDates(start, end);
    e.preventDefault();
  };

  const handleDateChange = (e) => {
    const info = e.target.name.split(' ');
    if (info[0] === 'start') {
      const temp = start;
      temp[info[1]] = e.target.value;
      setStart(temp);
    } else {
      const temp = end;
      temp[info[1]] = e.target.value;
      setEnd(temp);
    }
  }

  return (
    <div className="options">
      <form className="currency_type">
        <label>
          Currency:
          <select onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="GPB">GPB</option>
            <option value="EUR">EUR</option>
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
