import React from 'react';

function SearchResults (props) {
  const results = props.data.map((event) => {
    const lang = event.lang
      ? <div className=""><span className="lang">Language</span> <div dangerouslySetInnerHTML={{__html: event.lang}}></div></div>
      : '';
    const category1 = event.category1
      ? <div><span className="category1">Category 1</span> <div dangerouslySetInnerHTML={{__html: event.category1}}></div></div>
      : '';
    const category2 = event.category2
      ? <div><span className="category2">Category 2</span> <div dangerouslySetInnerHTML={{__html: event.category2}}></div></div>
      : '';
    const granularity = event.granularity
      ? <div><span className="granularity">Granularity</span> <div dangerouslySetInnerHTML={{__html: event.granularity}}></div></div>
      : '';
    return (
      <div key={event._id} className="results">
        <div className="results_tags">
          <div>
            <span className="date">Date</span> <div>{event.date}</div>
          </div>
          {lang} {category1} {category2} {granularity}
        </div>
        <p dangerouslySetInnerHTML={{__html: event.description}}></p>
      </div>
    );
  });

  return (
    <div>{results}</div>
  );
}

export default SearchResults;
