import React, { useState } from 'react';
import { connect } from 'react-redux';
import { State } from '../interface';
import { bulkEditCreator, selectAllCreator } from '../redux/actions';
import { copyString } from '../tools/index';
import './IconTool.scss';

interface Props {
  bulkEdit: boolean,
  bulkEditCreator: Function,
  selectAll: boolean,
  selectAllCreator: Function
}

const IconTool = (props: Props) => {
  const [isProject, setIsProject] = useState<boolean>(true);

  function handleDelete(): void {
    if (props.bulkEdit) {
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
        <button className="btn-operation btn-copy" onClick={() => copyString('123')}>
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-fuzhi" />
          </svg>
          复制链接
        </button>
        <button className="btn-operation">
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-unie123" />
          </svg>
          上传图标
        </button>
        <button
          className="btn-operation"
          style={{color: props.bulkEdit ? '#33a5ad' : '#666'}}
          onClick={() => props.bulkEditCreator(!props.bulkEdit)}>
          <svg
            className="icon icon-operation"
            style={{color: props.bulkEdit ? '#33a5ad' : '#666'}}
            aria-hidden="true">
            <use xlinkHref="#icon-piliang-copy" />
          </svg>
          批量编辑
        </button>
        <button className="btn-operation">
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-unie122" />
          </svg>
          {
            props.bulkEdit ? '下载图标' : '下载项目'
          }
        </button>
        <button className="btn-operation" style={{display: props.bulkEdit ? 'block' : 'none'}}>
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-yiruwenjianjia" />
          </svg>
          添加至项目
        </button>
        <button className="btn-operation" onClick={handleDelete}>
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-shanchu1" />
          </svg>
          {
            props.bulkEdit ? '删除图标' : '删除项目'
          }
        </button>
        <input
          style={{display: props.bulkEdit ? 'block' : 'none'}}
          className="select-all-icon"
          type="checkbox"
          checked={props.selectAll}
          onChange={(event) => props.selectAllCreator(event.target.checked)}/>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    bulkEdit: state.bulkEdit,
    selectAll: state.selectAll
  }),
  {
    bulkEditCreator,
    selectAllCreator
  }
)(IconTool);
