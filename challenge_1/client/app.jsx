import axios from 'axios';
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import SearchBar from './SearchBar.jsx';
import SearchResults from './SearchResults.jsx';

function App(props) {
  const [data, setData] = useState([]);

  const handlePageChange = useCallback((e) => {
    console.log(e.selected);
  }, []);

  const handleSubmit = useCallback((e) => {
    console.log(e);
  }, []);

  return (
    <div>
      Test
      <SearchBar handleSubmit={handleSubmit} />
      <SearchResults data={data}/>
      <ReactPaginate
          pageCount={Math.ceil(data.length/10)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          previousLabel={'<<'}
          nextLabel={'>>'}
          onPageChange={handlePageChange}
        />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
