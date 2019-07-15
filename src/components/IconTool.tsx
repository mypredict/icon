import React, { useState, useReducer } from 'react';
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
  addToProject: true,
  deleteIcons: false,
  tooltipDisplay: false
};

interface Props {
  bulkEdit: boolean,
  bulkEditCreator: Function,
  selectAll: boolean,
  selectAllCreator: Function
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

  const [isProject, setIsProject] = useState<boolean>(true);

  function handleDelete(): void {
    if (props.bulkEdit) {
      console.log('删除选中');
    } else {
      setIsProject(!isProject);
    }
  }

  function createProjectCallback() {
    alert(1);
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
        display={false}
        title={"are you sure?"}
        callback={createProjectCallback}
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
          className="btn-operation"
          style={{color: props.bulkEdit ? '#3ebcee' : ''}}
          onClick={() => props.bulkEditCreator(!props.bulkEdit)}
        >
          <svg
            className="icon icon-operation"
            style={{color: props.bulkEdit ? '#3ebcee' : ''}}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-piliang-copy" />
          </svg>
          批量编辑
        </button>
        <button className="btn-operation">
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-unie122" />
          </svg>
          {
            props.bulkEdit ? "下载图标" : "下载项目"
          }
        </button>
        <button
          className="btn-operation"
          style={{display: props.bulkEdit ? "block" : "none"}}
          onClick={() => dispatch({ type: 'addToProject' })}
        >
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
          onChange={(event) => props.selectAllCreator(event.target.checked)}
        />
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
