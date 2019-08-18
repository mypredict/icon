import React, { useState, useEffect } from 'react';
import { useKeyDown } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { State } from '../interface';
import { iconBgcCreator } from '../redux/actions';
import Button from './basic_components/button/Button';
import './ColorMatching.scss';

interface Props {
  projectId: string,
  display: boolean,
  callback: Function,
  iconBgcCreator: Function
}

const ColorMatching = (props: Props) => {
  const [color, setColor] = useState('#fff');
  function handleChangeComplete(color: any) {
    setColor(color);
    iconBgcCreator(color.hex);
    localStorage.setItem(`${props.projectId}Color`, color.hex);
  }

  const { projectId, iconBgcCreator } = props;
  useEffect(() => {
    setColor(localStorage.getItem(`${projectId}Color`) || '#fff');
  }, [projectId]);

  useKeyDown(() => {
    props.callback();
  }, 13);

  useKeyDown(() => {
    props.callback();
  }, 27);

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
            onChange={handleChangeComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    projectId: state.currentProject.id
  }),
  {
    iconBgcCreator
  }
)(ColorMatching);
