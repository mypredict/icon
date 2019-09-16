import React, { useState, useEffect } from 'react';
import './Checkbox.scss';

interface Props {
  checked: boolean,
  onChange: Function,
  label?: string,
  labelStyle?: Object,
  checkedStyle?: Object,
  unCheckedStyle?: Object,
  disabled?: boolean,
  children?: Object
};

const Checkbox = (props: Props) => {
  const { checked, checkedStyle, unCheckedStyle, disabled } = props;
  const [rootStyle, setRootStyle] = useState({});

  useEffect(() => {
    let newStyle = {};
    if (checked) {
      newStyle = {
        border: '1px solid #6DCEEE',
        background: '#6DCEEE',
        ...checkedStyle
      };
    } else {
      newStyle = {
        border: '1px solid #ddd',
        background: '#fff',
        ...unCheckedStyle
      };
    }
    if (disabled) {
      newStyle = { ...newStyle, background: '#eee' };
    }
    setRootStyle(newStyle);
  }, [checked, checkedStyle, unCheckedStyle, disabled]);

  return (
    <label
      className="checkbox-page"
      style={rootStyle}
    >
      <input
        disabled={props.disabled}
        type="checkbox"
        className="checkbox"
        style={{cursor: props.disabled ? 'default' : 'pointer'}}
        checked={props.checked}
        onChange={(event) => props.onChange(event.target.checked)}
      />
      <span
        className="label"
        style={{
          ...props.labelStyle,
          cursor: props.disabled ? 'default' : 'pointer'
        }}
      >
        {props.label}
      </span>
      {props.children}
    </label>
  );
};

Checkbox.defaultProps = {
  label: '',
  labelStyle: {},
  checkedStyle: {},
  unCheckedStyle: {},
  disabled: false
};

export default Checkbox;
