import React, {useState, useRef} from 'react';
import {debounce} from 'lodash';

const Search = ({submitQuery}) => {

  const [query, setQuery] = useState("");
  const debounced =useRef(debounce(q => submitQuery(q), 1000)).current;

  const handleChange = e => {
    setQuery(e.target.value);
    debounced(e.target.value);
  }

  return(
    <div className = "search-container d-flex mr-2">
      <input onChange = {handleChange} className = "form-control" type="search" placeholder = "Pretraga" value = {query}/>
    </div>
  );

}

export default Search;