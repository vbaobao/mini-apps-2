import React from 'react';

function DatesDropdown(props) {
  const handleChange = (e) => {
    if (props.type === "start") {
      if (e.target.name === "month") {
        props.changeDate({ month: e.target.value }, null)
      } else {
        props.changeDate({ year: e.target.value }, null);
      }
    } else {
      if (e.target.name === "month") {
        props.changeDate(null, { month: e.target.value })
      } else {
        props.changeDate( null, { year: e.target.value });
      }
    }
  };
  const months = (
    <select name="month" onChange={handleChange} required>
      <option value=""></option>
      <option value="01">January</option>
      <option value="02">February</option>
      <option value="03">March</option>
      <option value="04">April</option>
      <option value="05">May</option>
      <option value="06">June</option>
      <option value="07">July</option>
      <option value="08">August</option>
      <option value="09">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
  );

  const years = (
    <select name="year" onChange={handleChange} required>
      <option value=""></option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2019">2019</option>
      <option value="2018">2018</option>
      <option value="2017">2017</option>
      <option value="2016">2016</option>
      <option value="2015">2015</option>
      <option value="2014">2014</option>
      <option value="2013">2013</option>
      <option value="2012">2012</option>
      <option value="2011">2011</option>
      <option value="2010">2010</option>
    </select>
  );
  return (
    <div>
      <label>
        Month:
        {months}
      </label>
      <label>
        Year:
        {years}
      </label>
    </div>
  );
};

export default DatesDropdown;
