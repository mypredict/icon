import React from 'react';
import './Button.scss';

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined,
  disabledKeyDown?: boolean,
  disabled?: boolean,
  name?: string,
  btnStyle?: object,
  btnColor?: string,
  btnBackground?: string,
  icon?: string,
  iconStyle?: object,
  iconColor?: string,
  callback: Function
}

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      style={{
        ...props.btnStyle,
        background: props.disabled ? "#eee" : props.btnBackground,
        color: props.disabled ? "#aaa" : props.btnColor
      }}
      className={`btn-root ${props.disabled ? "btn-disabled" : ""}` }
      onClick={() => !props.disabled && props.callback()}
      onKeyDown={(e) => props.disabledKeyDown && e.preventDefault()}
    >
      <svg
        style={{
          ...props.iconStyle,
          color: props.disabled ? "#999" : props.iconColor,
          display: props.icon ? "block" : "none"
        }}
        className="icon icon-btn"
        aria-hidden="true"
      >
        <use xlinkHref={props.icon} />
      </svg>
      {props.name}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  disabledKeyDown: true,
  disabled: false,
  name: '',
  btnStyle: {},
  btnColor: '',
  btnBackground: '',
  icon: '',
  iconStyle: {},
  iconColor: '',
  callback: () => {}
};

export default Button;
