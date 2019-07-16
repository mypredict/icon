import React, { useReducer } from 'react';
import { useCopy } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Action } from '../interface';
import { bulkEditCreator, selectAllCreator } from '../redux/actions';
import Dialog from './basic_components/dialog/Dialog';
import Tooltip from './basic_components/tooltip/Tooltip';
import CreateProject from './CreateProject';
import UploadIcons from './UploadIcons';
import AddTo from './AddTo';
import './IconTool.scss';

interface DialogsDisplay {
  createProject: boolean,
  uploadIcons: boolean,
  deleteProject: boolean,
  addToProject: boolean,
  deleteIcons: boolean,
  tooltipDisplay: boolean
}

const dialogsDisplay = {
  createProject: false,
  uploadIcons: false,
  deleteProject: false,
  addToProject: false,
  deleteIcons: false,
  tooltipDisplay: false
};

interface Props {
  bulkEdit: boolean,
  bulkEditCreator: Function,
  selectAll: boolean,
  selectAllCreator: Function,
  selectIcons: Array<string>
}

const IconTool = (props: Props) => {
  const copyLink = useCopy();

  function reducer(state: DialogsDisplay, action: Action): DialogsDisplay {
    switch(action.type) {
      case 'createProject':
        return { ...state, createProject: !state.createProject };
      case 'uploadIcons':
        return { ...state, uploadIcons: !state.uploadIcons };
      case 'deleteProject':
        return { ...state, deleteProject: !state.deleteProject };
      case 'addToProject':
        return { ...state, addToProject: !state.addToProject };
      case 'deleteIcons':
        return { ...state, deleteIcons: !state.deleteIcons };
      case 'tooltipDisplay':
        return { ...state, tooltipDisplay: !state.tooltipDisplay};
      default:
        return state;
    }
  }
  const [dialogs, dispatch] = useReducer(reducer, dialogsDisplay);

  function handleDelete(): void {
    if (props.bulkEdit) {
      props.selectIcons.length && dispatch({ type: 'deleteIcons' });
    } else {
      dispatch({ type: 'deleteProject' });
    }
  }

  function deleteProjectCallback(close: boolean): void {
    if (close) {
      dispatch({ type: 'deleteProject' });
    } else {
      dispatch({ type: 'deleteProject' });
    }
  }

  function deleteIconsCallback(close: boolean): void {
    if (close) {
      dispatch({ type: 'deleteIcons' });
    } else {
      dispatch({ type: 'deleteIcons' });
    }
  }

  function handleDownload(): void {
    if (props.bulkEdit) {
      props.selectIcons.length && alert('下载图标');
    } else {
      alert('下载项目');
    }
  }

  return (
    <div className="icon-tool">
      <CreateProject
        display={dialogs.createProject}
        callback={() => dispatch({ type: 'createProject' })}
      />
      <UploadIcons
        display={dialogs.uploadIcons}
        callback={() => dispatch({ type: 'uploadIcons' })}
      />
      <AddTo
        display={dialogs.addToProject}
        callback={() => dispatch({ type: 'addToProject' })}
      />
      <Dialog
        display={dialogs.deleteProject}
        title={"确定删除此项目?"}
        callback={deleteProjectCallback}
      />
      <Dialog
        display={dialogs.deleteIcons}
        title={"确定删除选中图标?"}
        callback={deleteIconsCallback}
      />
      <Tooltip
        display={dialogs.tooltipDisplay}
        title={"chenggongle"}
      />
      <div className="project-create">
        <button
          className="btn-operation btn-create"
          onClick={() => dispatch({ type: 'createProject' })}
        >
          <svg className="icon icon-create" aria-hidden="true">
            <use xlinkHref="#icon-add-author" />
          </svg>
          新建项目
        </button>
      </div>
      <div
        className="project-information"
        style={{display: true ? 'flex' : 'none'}}>
        <span className="icon-count">共24个图标</span>
        <button className="btn-operation btn-copy" onClick={() => copyLink('123')}>
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-fuzhi" />
          </svg>
          复制链接
        </button>
        <button
          className="btn-operation"
          onClick={() => dispatch({ type: 'uploadIcons' })}
        >
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-unie123" />
          </svg>
          上传图标
        </button>
        <button
          className={`btn-operation ${props.bulkEdit && "btn-bulk-edit"}`}
          onClick={() => props.bulkEditCreator(!props.bulkEdit)}
        >
          <svg
            className={`icon icon-operation ${props.bulkEdit && "btn-bulk-edit"}`}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-piliang-copy" />
          </svg>
          批量编辑
        </button>
        <button
          className={`btn-operation ${props.bulkEdit && !props.selectIcons.length && "btn-disabled"}`}
          onClick={handleDownload}
        >
          <svg
            className={`icon icon-operation ${props.bulkEdit && !props.selectIcons.length && "btn-disabled"}`}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-unie122" />
          </svg>
          {
            props.bulkEdit ? "下载图标" : "下载项目"
          }
        </button>
        <button
          className={`btn-operation ${props.bulkEdit && !props.selectIcons.length && "btn-disabled"}`}
          style={{ display: props.bulkEdit ? "block" : "none" }}
          onClick={() => props.selectIcons.length && dispatch({ type: 'addToProject' })}
        >
          <svg
            className={`icon icon-operation ${props.bulkEdit && !props.selectIcons.length && "btn-disabled"}`}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-yiruwenjianjia" />
          </svg>
          添加至项目
        </button>
        <button
          className={`btn-operation ${props.bulkEdit && !props.selectIcons.length && "btn-disabled"}`}
          onClick={handleDelete}
        >
          <svg
            className={`icon icon-operation ${props.bulkEdit && !props.selectIcons.length && "btn-disabled"}`}
            aria-hidden="true"
          >
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
          onChange={(event) => props.selectAllCreator(event.target.checked)}
        />
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    bulkEdit: state.bulkEdit,
    selectAll: state.selectAll,
    selectIcons: state.selectIcons
  }),
  {
    bulkEditCreator,
    selectAllCreator
  }
)(IconTool);
