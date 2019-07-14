import React from 'react';
import './Progress.scss';

interface Props {
  rootStyle?: object,
  barStyle?: object,
  valueStyle?: object,
  valueBackground?: string,
  numStyle?: object,
  disabled?: boolean,
  value: number
}

const Progress = (props: Props) => {
  return (
    <div className="progress-page" style={props.rootStyle}>
      <div className="bar" style={props.barStyle}>
        <div
          className="value"
          style={{
            ...props.valueStyle,
            background: props.disabled ? "#bbb" : props.valueBackground,
            width: `${props.value}%`
          }}
        >
        </div>
      </div>
      <span className="progress-num" style={props.numStyle}>{props.value}%</span>
    </div>
  );
};

Progress.defaultProps = {
  disabled: false
}

export default Progress;
