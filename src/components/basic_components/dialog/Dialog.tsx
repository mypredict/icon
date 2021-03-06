import React, { useState } from 'react';
import { useKeyDown } from '../../../custom_hooks/index';
import Button from '../button/Button';
import './Dialog.scss';

interface Props {
  display: boolean,
  title: string,
  input?: boolean,
  defaultValue: string,
  inputPlaceholder?: string,
  maxLength?: number,
  callback: Function
}

const Dialog = (props: Props) => {
  const [inputValue, setInputValue] = useState(props.defaultValue);

  useKeyDown(() => {
    if ((props.input && inputValue) || !props.input) {
      props.callback(true, inputValue.trim());
    }
  }, 13);

  useKeyDown(() => {
    props.callback(false);
  }, 27);

  return (
    <div
      className="dialog-mask"
      style={{display: props.display ? "block" : "none"}}
    >
      <div className="dialog-page">
        <header className="icon-close-container">
          <Button
            icon={"#icon-close-page"}
            btnStyle={{padding: "10px", borderRadius: "50%"}}
            btnBackground={"#fff"}
            iconStyle={{width: "1rem", height: "1rem"}}
            callback={() => props.callback(false)}
          />
        </header>
        <div className="content-container">
          <h3>{props.title}</h3>
          {
            props.input && (
              <input
                value={inputValue}
                className="dialog-input"
                type="text"
                placeholder={props.inputPlaceholder}
                maxLength={props.maxLength}
                onChange={(e) => setInputValue(e.target.value)}
              />
            )
          }
        </div>
        <footer className="btn-container">
          <Button
            name={"取消"}
            btnStyle={{marginRight: '1rem'}}
            callback={() => props.callback(false)}
          />
          <Button
            name={"确定"}
            disabled={props.input ? inputValue ? false : true : false}
            callback={() => props.callback(true, inputValue.trim())}
          />
        </footer>
      </div>
    </div>
  );
};

Dialog.defaultProps = {
  defaultValue: ''
};

export default Dialog;
