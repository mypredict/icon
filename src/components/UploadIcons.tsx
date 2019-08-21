import React, { useState } from 'react';
import { useFileSize, useUpload } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Response } from '../interface';
import { tooltipConfigCreator, currentProjectCreator } from '../redux/actions';
import Button from './basic_components/button/Button';
import Upload from './basic_components/upload/Upload';
import Progress from './basic_components/progress/Progress';
import './UploadIcons.scss';

interface Icons {
  [key: string]: {
    name: string,
    size: number
  }
}

interface IconsProgress {
  [key: string]: number
}

interface Props {
  display: boolean,
  callback: Function,
  projectId: string,
  path: string,
  currentProject: object,
  tooltipConfigCreator: Function,
  currentProjectCreator: Function
}

const UploadIcons = (props: Props) => {
  const fileSize = useFileSize();
  const request = useUpload();

  const [uploadIcons, setUploadIcons]: [Icons, Function] = useState({});
  const [iconsProgress, setIconsProgress]: [IconsProgress, Function] = useState({});

  function uploadFilesCallback(files: Array<File>): void {
    // 过滤重复图标
    const newFiles: Array<File> = [];
    const newUploadIcons: Icons = {};
    files.forEach((file) => {
      if (uploadIcons[file.name]) {
        props.tooltipConfigCreator({
          tooltip: `上传文件中已包含${file.name}`,
          icon: '#icon-shibai-',
          rootStyle: { boxShadow: 'none' }
        });
      } else {
        newUploadIcons[file.name] = {
          name: file.name,
          size: file.size
        };
        newFiles.push(file);
      }
    });
    setUploadIcons({ ...uploadIcons, ...newUploadIcons });

    // 开始上传
    let maxIconsLength = 0;
    const newIconsProgress: IconsProgress = {};
    const message = {
      projectId: props.projectId,
      path: props.path
    }
    newFiles.forEach((file) => {
      request(
        message,
        file,
        (percentComplete: number, responseData?: any) => {
          // 处理 useState 异步问题
          newIconsProgress[file.name] = percentComplete;
          setIconsProgress({ ...iconsProgress, ...newIconsProgress });
          if (responseData && responseData.icons.length >= maxIconsLength) {
            maxIconsLength = responseData.icons.length;
            props.currentProjectCreator({
              ...props.currentProject,
              icons: responseData.icons,
              iconGroups: responseData.iconGroups
            });
          }
        },
        (responseError: Response) => {
          if (responseError.result === 'repeat') {
            props.tooltipConfigCreator({
              tooltip: `服务器中已包含${file.name}`,
              icon: '#icon-shibai-',
              rootStyle: { boxShadow: 'none' }
            });
            newIconsProgress[file.name] = -1;
            setIconsProgress({ ...iconsProgress, ...newIconsProgress });
          } else {
            props.tooltipConfigCreator({
              tooltip: `${file.name}文件上传失败`,
              icon: '#icon-shibai-',
              rootStyle: { boxShadow: 'none' }
            });
            newIconsProgress[file.name] = -2;
            setIconsProgress({ ...iconsProgress, ...newIconsProgress });
          }
        }
      );
    });
  }

  function handleClose() {
    setUploadIcons({});
    props.callback();
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
            callback={handleClose}
          />
        </header>
        <div className="content-container">
          <h3>上传图标</h3>
          <Upload
            accept="image/*"
            callback={uploadFilesCallback}
          />
          <div className="progress">
            {
              Object.values(uploadIcons).map((file, fileIndex) => (
                <div className="file-progress-container" key={fileIndex}>
                  <div className="control">
                    <span className="file-name" title={file.name}>{file.name}</span>
                    <span>{fileSize(file.size)}</span>
                    <span
                      className="toolTip"
                      style={{
                        color: iconsProgress[file.name] === 100
                          ? '#79dadf'
                          : iconsProgress[file.name] >= 0
                            ? '#555'
                            : '#ee7f53'
                      }}
                    >
                      {
                        iconsProgress[file.name] === 100
                          ? '完成'
                          : iconsProgress[file.name] >= 0
                            ? '上传中'
                            : iconsProgress[file.name] === -1
                              ? '重复'
                              : '失败'
                      }
                    </span>
                  </div>
                  <Progress
                    value={
                      iconsProgress[file.name] > 0
                        ? iconsProgress[file.name]
                        : 0
                    }
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    path: state.currentProject.link,
    projectId: state.currentProject.id,
    currentProject: state.currentProject
  }),
  {
    tooltipConfigCreator,
    currentProjectCreator
  }
)(UploadIcons);
