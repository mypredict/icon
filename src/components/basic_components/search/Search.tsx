import React, { useState } from 'react';
import './Search.scss';

interface Props {
  name?: string,
  type?: string,
  style?: object,
  placeholder?: string,
  maxLength?: number,
  defaultValue?: string,
  filter: Function,
  callback: Function
}

const Search = (props: Props) => {
  const [value, setValue] = useState(props.defaultValue);

  function handleInput(value: string): void {
    const filterValue = props.filter(value);
    setValue(filterValue);
    props.callback(filterValue);
  }

  return (
    <input
      name={props.name}
      className="search-page"
      spellCheck={false}
      autoComplete="off"
      style={props.style}
      type={props.type}
      value={value}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      onChange={(e) => handleInput(e.target.value)}
    />
  );
};

Search.defaultProps = {
  defaultValue: '',
  type: 'text',
  filter: (value: string) => value.trim()
};

export default Search;
