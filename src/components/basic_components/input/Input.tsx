import React, { useState } from 'react';
import './Input.scss';

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

const Input = (props: Props) => {
  const [value, setValue] = useState(props.defaultValue);

  function handleInput(input: string): void {
    const filterValue = props.filter(input);
    setValue(filterValue);
    props.callback(filterValue);
  }

  return (
    <input
      name={props.name}
      className="input-page"
      spellCheck={false}
      style={props.style}
      type={props.type}
      value={value}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      onChange={(e) => handleInput(e.target.value)}
    />
  );
};

Input.defaultProps = {
  defaultValue: '',
  type: 'text',
  filter: (value: string) => value.trim()
};

export default Input;
