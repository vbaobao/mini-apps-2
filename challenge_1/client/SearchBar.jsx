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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input name='searchValue' type='text' value={val} onChange={handleChange} />
        </label>
        <input type="submit" value="search!" />
      </form>
    </div>
  );
}

export default SearchBar;
