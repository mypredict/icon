import React, { useRef, useEffect } from 'react';
import { useFetch3 } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Response } from '../interface';
import { tooltipConfigCreator } from '../redux/actions';
import Button from './basic_components/button/Button';
import { cutImage } from '../tools/index.js';
import './UploadHead.scss';

interface Props {
  userId: string,
  display: boolean,
  callback: Function,
  tooltipConfigCreator: Function
}

const UploadHead = (props: Props) => {
  const { userId } = props;
  const canvasContainer = useRef(null);
  const previewContainer = useRef(null);
  const inputFile = useRef(null);
  const submitBtn = useRef(null);
  const request = useFetch3();

  useEffect(
    () => {
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
            const imgMessage = {
              imgData: data,
              imgName: `${userId}.png`
            };
            request.post('/replaceAvatar', imgMessage, (response: Response) => {
              if (response.state === "error") {
                tooltipConfigCreator({
                  tooltip: '上传头像失败',
                  icon: '#icon-shibai-'
                })
                return;
              }
              window.location.reload();
            })
          }
        );
      }
    },
    [
      request,
      canvasContainer,
      previewContainer,
      inputFile,
      submitBtn,
      userId
    ]
  );
  
  return (
    <div
      className="dialog-mask"
      style={{
        visibility: props.display ? "visible" : "hidden"
      }}
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
            className="input-img"
            ref={inputFile}
            accept="image/*"
            type="file"
          />
          <button className="upload-img" ref={submitBtn}>上传</button>
        </footer>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    tooltip: state.tooltipConfig.tooltip,
    userId: state.userMessage.userId
  }),
  {
    tooltipConfigCreator
  }
)(UploadHead);
