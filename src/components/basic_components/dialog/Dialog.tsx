import React from 'react';
import Button from '../button/Button';
import './Dialog.scss';

interface Props {
  display: boolean,
  title: string,
  callback: Function
}

const Dialog = (props: Props) => {

  function closeCallback() {
    console.log('ok');
  }

  function sureCallback() {
    console.log('ok');
  }

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
            callback={closeCallback}
          />
        </header>
        <div className="content-container">
          <h3>{props.title}</h3>
          <input type="text"/>
        </div>
        <footer className="btn-container">
          <Button name={"取消"} callback={closeCallback} btnStyle={{marginRight: '1rem'}} />
          <Button name={"确定"} callback={sureCallback} />
        </footer>
      </div>
    </div>
  );
};

export default Dialog;
