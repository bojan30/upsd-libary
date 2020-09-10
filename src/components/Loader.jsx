import React from 'react';
import loader from '../images/loader.gif';
const Loader = () => {

  return (
    <div className = "loader-container">
      <img src={loader} alt="loader"/>
    </div>
  );

}

export default Loader;