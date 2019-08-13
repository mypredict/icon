import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { State } from '../interface';
import Button from './basic_components/button/Button';
import './ColorMatching.scss';

interface Props {
  projectId: string,
  display: boolean,
  callback: Function
}

const ColorMatching = (props: Props) => {
  const [color, setColor] = useState('#fff');
  function handleChangeComplete(color: any) {
    setColor(color);
    localStorage.setItem(`${props.projectId}Color`, color.hex);
  }

  const { projectId } = props;
  useEffect(() => {
    setColor(localStorage.getItem(`${projectId}Color`) || '#fff');
  }, [projectId]);

  return (
    <div
      className="dialog-mask"
      style={{display: props.display ? "block" : "none"}}
    >
      <div className="color-matching-dialog">
        <header className="icon-close-container">
          <Button
            icon={"#icon-close-page"}
            btnStyle={{padding: "10px", borderRadius: "50%"}}
            btnBackground={"#fff"}
            iconStyle={{width: "1rem", height: "1rem"}}
            callback={() => props.callback()}
          />
        </header>
        <div className="content-container">
          <SketchPicker
            width={'90%'}
            color={color}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    projectId: state.currentProject.id
  })
)(ColorMatching);
