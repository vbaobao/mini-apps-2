import React from 'react';

function SearchResults (props) {
  console.log(props.data);
  const results = props.data.map((event) => {
    return (
      <div key={event._id}>
        <div>
          <div><span className="date">{event.date}</span>{event.description}</div>
        </div>
        <div>
          <span className="lang">{event.lang}</span>
          <span className="category1">{event.category1}</span>
          <span className="category2">{event.category2}</span>
          <span className="granularity">{event.granularity}</span>
        </div>
      </div>
    );
  });

  return (
    <div>{results}</div>
  );
}

export default SearchResults;
