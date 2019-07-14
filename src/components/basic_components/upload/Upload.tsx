import React, {
  DragEvent,
  ChangeEvent
} from 'react';
import './Upload.scss';

interface Props {
  rootStyle?: object,
  tooltip?: string,
  tooltipStyle?: object,
  icon?: string,
  multiple?: boolean,
  accept: string,
  callback: Function,
  errorCallback: Function
}

const Upload = (props: Props) => {
  function inputFiles(event: ChangeEvent<HTMLInputElement>): void {
    addFiles(event.target.files);
    event.target.value = '';
  }
  
  function dropFiles(event: DragEvent): void {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  }
  
  // 筛选出可以上传的文件
  function addFiles(files: FileList | null) {
    if (files) {
      props.callback(Array.from(files).filter((file) => {
        if (props.accept === '*') {
          return true;
        }
        const [acceptLabel, acceptType] = props.accept.split('/');
        const [fileLabel, fileType] = file.type.split('/');
        if (acceptLabel === fileLabel && (acceptType === '*' || acceptType.includes(fileType))) {
          return true;
        }
        props.errorCallback(file);
        return false;
      }));
    }
  }

  return (
    <div
      className="upload-files-page"
      style={props.rootStyle}
      onDragOver={(e) => e.preventDefault()}
      onDrop={dropFiles}
    >
      <div className="tootip" style={props.tooltipStyle}>
        <svg className="icon icon-upload" aria-hidden="true">
          <use xlinkHref={props.icon} />
        </svg>
        <span>{props.tooltip}</span>
      </div>
      <input
        multiple={props.multiple}
        className="add-files-input"
        type="file"
        accept={props.accept}
        onChange={inputFiles}
      />
    </div>
  );
}

Upload.defaultProps = {
  rootStyle: {},
  tooltip: '点击或拖动文件到本区域上传',
  tooltipStyle: {},
  icon: '#icon-unie123',
  multiple: true,
  accept: '*',
  errorCallback: () => {}
}

export default Upload;
