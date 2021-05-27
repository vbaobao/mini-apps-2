import React, { useState } from 'react';

function SearchBar (props) {
  const [val, setVal] = useState('');
  
  const handleChange = (e) => {
    setVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(val);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
        className="bar"
          name="searchValue"
          type="text" value={val}
          onChange={handleChange}
          placeholder="Enter search here" />
      </label>
      <input className="button" type="submit" value="search!" />
    </form>
  );
}

export default SearchBar;
