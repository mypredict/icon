import React from 'react';
import './SingleIconTools.scss';

interface Props {
  icon: string,
  callback: Function
}

const SingleIconTools = (props: Props) => {
  
  return (
    <div className="icon-operation-page">
      <div
        className="icon-tool-container"
        title="修改代码名称"
        onClick={() => props.callback(props.icon, 'handleEditName')}>
        <svg className="icon icon-tool" aria-hidden="true">
          <use xlinkHref="#icon-grammar" />
        </svg>
      </div>
      <div
        className="icon-tool-container"
        title="下载图标"
        onClick={() => props.callback(props.icon, 'handleDownload')}>
        <svg className="icon icon-tool" aria-hidden="true">
          <use xlinkHref="#icon-unie122" />
        </svg>
      </div>
      <div
        className="icon-tool-container"
        title="查看大图"
        onClick={() => props.callback(props.icon, 'handleZoom')}>
        <svg className="icon icon-tool" aria-hidden="true">
          <use xlinkHref="#icon-fangda1" />
        </svg>
      </div>
      <div
        className="icon-tool-container"
        title="添加至项目"
        onClick={() => props.callback(props.icon, 'handleAddTo')}>
        <svg className="icon icon-tool" aria-hidden="true">
          <use xlinkHref="#icon-yiruwenjianjia" />
        </svg>
      </div>
      <div
        className="icon-tool-container"
        title="删除图标"
        onClick={() => props.callback(props.icon, 'handleDelete')}>
        <svg className="icon icon-tool" aria-hidden="true">
          <use xlinkHref="#icon-piliangshanchu" />
        </svg>
      </div>
      <div
        className="icon-tool-container icon-copy-container"
        title="复制代码"
        onClick={() => props.callback(props.icon, 'handleCopyCode')}>
        <svg className="icon icon-tool" aria-hidden="true">
          <use xlinkHref="#icon-fuzhi" />
        </svg>
      </div>
    </div>
  );
};

export default SingleIconTools;
