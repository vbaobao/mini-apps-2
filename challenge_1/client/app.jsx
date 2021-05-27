import axios from 'axios';
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import SearchBar from './SearchBar.jsx';
import SearchResults from './SearchResults.jsx';

function App() {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePageChange = useCallback(async (e) => {
    try {
      const response = await axios.get('/search', {
        params: {
          search: searchTerm,
          page: e.selected + 1,
          offset: 10,
        }
      });
      setData(response.data.data);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
    }
  }, [pages]);

  const handleSubmit = useCallback(async (query) => {
    try {
      const response = await axios.get('/search', {
        params: {
          search: query,
          page: 1,
          offset: 10,
        }
      });
      setSearchTerm(query);
      setData(response.data.data);
      setPages(response.data.maxPages);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h1>Search From History</h1>
      <SearchBar handleSubmit={handleSubmit} />
      <h2>Results</h2>
      <SearchResults data={data}/>
      <ReactPaginate
        containerClassName={'pagination'}
        pageCount={pages}
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
