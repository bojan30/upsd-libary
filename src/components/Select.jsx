import React, {useState} from 'react';

const Select = ({handleSelected, options, title}) => {
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    handleSelected(e.target.value);
  }

  return (
    <div className="select-container ml-2">
      <div className="input-group">
        <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">{title}</label>
        </div>
        <select value = {selected} onChange = {handleSelect} className="custom-select">
          {
            options.map(option => {
              return (
                <option key = {option.value} value={option.value}>{option.text}</option>
              );
            })
          }
        </select>
      </div>
    </div>
  );

}

export default Select; 