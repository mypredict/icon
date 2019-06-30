import React, { useState } from 'react';
import './IconTool.scss';

const IconTool: React.FC = () => {
  const [isProject, setIsProject] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  function handleCopyLink(): void {
    const input = document.createElement('input');
    input.value = `http://www.baidu.com/`;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  function handleEdit(): void {
    setIsEdit(!isEdit);
  }

  function handleSelectAll(status: boolean): void {
    setSelectAll(status);
  }

  function handleDelete(): void {
    if (isEdit) {
      console.log('删除选中');
    } else {
      setIsProject(!isProject);
    }
  }

  return (
    <div className="icon-tool">
      <div className="project-create">
        <button className="btn-operation btn-create">
          <svg className="icon icon-button" aria-hidden="true">
            <use xlinkHref="#icon-add-author" />
          </svg>
          新建项目
        </button>
      </div>
      <div
        className="project-information"
        style={{display: isProject ? 'flex' : 'none'}}>
        <span className="icon-count">共24个图标</span>
        <button className="btn-operation btn-copy" onClick={handleCopyLink}>
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-fuzhi" />
          </svg>
          复制链接
        </button>
        <button
          className="btn-operation"
          style={{color: isEdit ? '#33a5ad' : '#666'}}
          onClick={handleEdit}>
          <svg
            className="icon icon-operation"
            style={{color: isEdit ? '#33a5ad' : '#666'}}
            aria-hidden="true">
            <use xlinkHref="#icon-piliang-copy" />
          </svg>
          批量编辑
        </button>
        <button className="btn-operation">
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-unie122" />
          </svg>
          下载图标
        </button>
        <button className="btn-operation">
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-unie123" />
          </svg>
          上传图标
        </button>
        <button className="btn-operation" style={{display: isEdit ? 'block' : 'none'}}>
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-yiruwenjianjia" />
          </svg>
          移入项目
        </button>
        <button className="btn-operation" onClick={handleDelete}>
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-shanchu1" />
          </svg>
          {
            isEdit ? '删除选中' : '删除项目'
          }
        </button>
        <input
          style={{display: isEdit ? 'block' : 'none'}}
          className="select-all-icon"
          type="checkbox"
          checked={selectAll}
          onChange={(event) => handleSelectAll(event.target.checked)}/>
      </div>
    </div>
  );
};

export default IconTool;
