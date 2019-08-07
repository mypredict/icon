import React, { useState, useRef, useEffect } from 'react';
import { useFetch3 } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Response } from '../interface';
import { tooltipConfigCreator } from '../redux/actions';
import Button from './basic_components/button/Button';
import { cutImage } from '../tools/index.js';
import './UploadHead.scss';

interface Props {
  display: boolean,
  callback: Function,
  tooltipConfigCreator: Function
}

const UploadHead = (props: Props) => {
  const canvasContainer = useRef(null);
  const previewContainer = useRef(null);
  const inputFile = useRef(null);
  const submitBtn = useRef(null);
  useEffect(() => {
    if (
      canvasContainer.current
      && previewContainer.current
      && inputFile.current
      && submitBtn.current
    ) {
      cutImage(
        canvasContainer.current,
        previewContainer.current,
        inputFile.current,
        submitBtn.current,
        (data: string) => {
          console.log(data);
        }
      );
    }
  }, [canvasContainer, previewContainer, inputFile, submitBtn]);

  return (
    <div
      className="dialog-mask"
      style={{display: props.display ? "block" : "none"}}
    >
      <div className="upload-head-dialog">
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
          <div className="canvasContainer" ref={canvasContainer}></div>
          <div className="previewContainer" ref={previewContainer}></div>
        </div>
        <footer className="btn-container">
          <input
            ref={inputFile}
            accept="image/*"
            type="file"
          />
          <button ref={submitBtn}>上传</button>
        </footer>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    tooltip: state.tooltipConfig.tooltip
  }),
  {
    tooltipConfigCreator
  }
)(UploadHead);
