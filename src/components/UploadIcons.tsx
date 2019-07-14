import React, { useState } from 'react';
import { useFileSize } from '../custom_hooks/index';
import Button from './basic_components/button/Button';
import Upload from './basic_components/upload/Upload';
import Progress from './basic_components/progress/Progress';
import './UploadIcons.scss';

interface Props {
  display: boolean,
  callback: Function
}

const files = [
  {
    name: '温江名称.jpeg',
    size: 1234
  }
]

const UploadIcons = (props: Props) => {
  const fileSize = useFileSize();
  const [uploadStatus, setUploadStatus] = useState(true);

  function closeUploadCallback() {
    // props.callback();
  }

  function uploadStatusCallback() {
    setUploadStatus(!uploadStatus);
  }

  function uploadFilesCallback(files: Array<object>): void {
    console.log(11111, files);
  }

  function uploadFilesCallbackError(file: object): void {
    alert('文件错误');
  }

  return (
    <div
      className="dialog-mask"
      style={{display: props.display ? "block" : "none"}}
    >
      <div className="upload-icons-page">
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
          <h3>上传图标</h3>
          <Upload
            accept="image/*"
            callback={uploadFilesCallback}
            errorCallback={uploadFilesCallbackError}
          />
          <div className="progress">
            {
              files.map((file, fileIndex) => (
                <div className="file-progress-container" key={fileIndex}>
                  <div className="control">
                    <span className="file-name" title={file.name}>{file.name}</span>
                    <span>{fileSize(file.size)}</span>
                    <div className="tools">
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-bt_quxiao_b" />
                      </svg>
                      <svg
                        className="icon"
                        aria-hidden="true"
                        onClick={() => {}}
                      >
                        <use xlinkHref={true ? "#icon-xueyuan-shipinzanting" : "#icon-kaishi1"} />
                      </svg>
                    </div>
                  </div>
                  <Progress value={60} />
                </div>
              ))
            }
          </div>
        </div>
        <footer className="btn-container">
          <Button
            name="全部取消"
            disabled={files.length > 0 ? false : true}
            callback={closeUploadCallback}
            btnStyle={{marginRight: '1rem'}}
          />
          <Button
            name={`全部${uploadStatus ? "暂停" : "开始"}`}
            disabled={files.length > 0 ? false : true}
            callback={uploadStatusCallback}
          />
        </footer>
      </div>
    </div>
  );
};

export default UploadIcons;
