import React from 'react';
import './Tooltip.scss';

interface Props {
  display: boolean,
  title: string,
  rootStyle?: Object,
  icon?: string,
  iconStyle?: Object
}

const Tooltip = (props: Props) => {
  return (
    <div
      className="tooltip-page"
      style={{...props.rootStyle, display: props.display ? "block" : "none"}}
    >
      <svg
        className="icon icon-tooltip"
        style={{...props.iconStyle, display: props.icon ? "inline-block" : "none"}}
        aria-hidden="true"
      >
        <use xlinkHref={props.icon} />
      </svg>
      {props.title}
    </div>
  );
};

export default Tooltip;
