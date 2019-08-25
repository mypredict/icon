import React, { useReducer } from 'react';
import { useCopy, useFetch3 } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Action, Response, CurrentProject } from '../interface';
import {
  bulkEditCreator,
  selectAllCreator,
  tooltipConfigCreator,
  currentProjectCreator,
  selectIconsCreator
} from '../redux/actions';
import Dialog from './basic_components/dialog/Dialog';
import CreateProject from './CreateProject';
import IconTemplate from './IconTemplate';
import ColorMatching from './ColorMatching';
import UploadIcons from './UploadIcons';
import AddTo from './AddTo';
import { serverPath } from '../config/index';
import './IconTool.scss';

interface DialogsDisplay {
  createProject: boolean,
  iconTemplate: boolean,
  colorMatching: boolean,
  uploadIcons: boolean,
  deleteProject: boolean,
  addToProject: boolean,
  deleteIcons: boolean,
  tooltipDisplay: boolean
}

const dialogsDisplay = {
  createProject: false,
  iconTemplate: false,
  colorMatching: false,
  uploadIcons: false,
  deleteProject: false,
  addToProject: false,
  deleteIcons: false,
  tooltipDisplay: false
};

interface Props {
  history: any,
  userId: string,
  bulkEdit: boolean,
  selectIcons: Array<string>,
  selectAll: boolean,
  currentProject: CurrentProject,
  icons: Array<string>,
  link: string,
  projectId: string,
  projectName: string,
  projectType: string,
  teamProjects: Array<string>,
  bulkEditCreator: Function,
  selectAllCreator: Function,
  tooltipConfigCreator: Function,
  currentProjectCreator: Function,
  selectIconsCreator: Function
}

const IconTool = (props: Props) => {
  const copyLink = useCopy();
  const request = useFetch3();

  function reducer(state: DialogsDisplay, action: Action): DialogsDisplay {
    switch(action.type) {
      case 'createProject':
        return { ...state, createProject: !state.createProject };
      case 'iconTemplate':
        return { ...state, iconTemplate: !state.iconTemplate };
      case 'colorMatching':
        return { ...state, colorMatching: !state.colorMatching };
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
      const deleteProjectMessage = {
        projectId: props.projectId,
        name: props.projectName,
        link: props.link,
        type: props.projectType
      }
      dispatch({ type: 'deleteProject' });
      request.post('/deleteProject', deleteProjectMessage, (response: Response) => {
        if (response.state === 'success') {
          props.tooltipConfigCreator({
            tooltip: '删除项目成功',
            icon: '#icon-wancheng1'
          });
          props.history.push(`/icon/team/`);
          window.location.reload();
          return;
        }
        if (response.result === 'unRoot') {
          props.tooltipConfigCreator({
            tooltip: '没有删除此项目的权限',
            icon: '#icon-shibai-'
          });
        } else {
          props.tooltipConfigCreator({
            tooltip: '删除项目失败',
            icon: '#icon-shibai-'
          });
        }
      })
    } else {
      dispatch({ type: 'deleteProject' });
    }
  }

  function deleteIconsCallback(deleteIcons: boolean) {
    dispatch({ type: 'deleteIcons' });
    if (deleteIcons) {
      const postMessage = {
        iconNames: props.selectIcons,
        projectId: props.projectId,
        path: props.link,
        iconType: props.currentProject.iconType
      };
      request.post('/deleteIcon', postMessage, (data: Response) => {
        if (data.state === 'success') {
          props.currentProjectCreator({
            ...props.currentProject,
            icons: data.result.icons,
            iconGroups: data.result.iconGroups
          });
          props.selectIconsCreator([]);
        } else {
          props.tooltipConfigCreator({
            tooltip: '删除图片失败',
            icon: '#icon-shibai-'
          });
        }
      });
    }
  }

  function handleDownload() {
    window.open(
      `${serverPath}/batchDownload?path=${props.link}`,
      '_self'
    );
  }

  function createProject() {
    if (props.userId) {
      dispatch({ type: 'createProject' });
    } else {
      props.tooltipConfigCreator({
        tooltip: '请先登录'
      })
    }
  }

  return (
    <div className="icon-tool">
      {
        dialogs.createProject &&
        <CreateProject
          history={props.history}
          display={dialogs.createProject}
          callback={() => dispatch({ type: 'createProject' })}
        />
      }
      {
        dialogs.iconTemplate &&
        <IconTemplate
          display={dialogs.iconTemplate}
          callback={() => dispatch({ type: 'iconTemplate' })}
        />
      }
      {
        dialogs.colorMatching &&
        <ColorMatching
          display={dialogs.colorMatching}
          callback={() => dispatch({ type: 'colorMatching' })}
        />
      }
      <UploadIcons
        display={dialogs.uploadIcons}
        callback={() => dispatch({ type: 'uploadIcons' })}
      />
      {
        dialogs.addToProject &&
        <AddTo
          display={dialogs.addToProject}
          callback={() => dispatch({ type: 'addToProject' })}
        />
      }
      {
        dialogs.deleteProject &&
        <Dialog
          display={dialogs.deleteProject}
          title={"确定删除此项目?"}
          callback={deleteProjectCallback}
        />
      }
      {
        dialogs.deleteIcons &&
        <Dialog
          display={dialogs.deleteIcons}
          title={"确定删除选中图标?"}
          callback={deleteIconsCallback}
        />
      }
      <div className="project-create">
        <button
          className="btn-operation btn-create"
          onClick={createProject}
        >
          <svg className="icon icon-create" aria-hidden="true">
            <use xlinkHref="#icon-xinjian" />
          </svg>
          新建项目
        </button>
        <button
          style={{display: props.projectId ? 'block' : 'none'}}
          className="btn-operation btn-template btn-copy"
          onClick={() => copyLink(props.link)}
        >
          <svg className="icon icon-create" aria-hidden="true">
            <use xlinkHref="#icon-fuzhi" />
          </svg>
          复制链接
        </button>
        <button
          style={{display: props.projectId ? 'block' : 'none'}}
          className="btn-operation btn-template"
          onClick={() => dispatch({ type: 'colorMatching' })}
        >
          <svg className="icon icon-create" aria-hidden="true">
            <use xlinkHref="#icon-yulanbeijingse" />
          </svg>
          调节背景色
        </button>
        <button
          style={{display: props.projectId ? 'block' : 'none'}}
          className="btn-operation btn-template"
          onClick={() => dispatch({ type: 'iconTemplate' })}
        >
          <svg className="icon icon-create" aria-hidden="true">
            <use xlinkHref="#icon-last-cache" />
          </svg>
          模板代码
        </button>
      </div>
      <div
        className="project-information"
        style={{display: props.projectId ? 'flex' : 'none'}}>
        <span
          className="icon-count"
          style={{minWidth: props.bulkEdit ? '6rem' : '5rem'}}
        >
          共{props.bulkEdit ? `${props.selectIcons.length}/` : ''}{props.icons.length}个图标
        </span>
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
          className={`btn-operation`}
          onClick={handleDownload}
        >
          <svg className="icon icon-operation" aria-hidden="true">
            <use xlinkHref="#icon-unie122" />
          </svg>
          下载项目
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
    userId: state.userMessage.userId,
    bulkEdit: state.bulkEdit,
    selectAll: state.selectAll,
    selectIcons: state.selectIcons,
    currentProject: state.currentProject,
    icons: state.currentProject.icons,
    link: state.currentProject.link,
    projectId: state.currentProject.id,
    projectName: state.currentProject.name,
    projectType: state.currentProject.type,
    teamProjects: state.teamProjects
  }),
  {
    bulkEditCreator,
    selectAllCreator,
    tooltipConfigCreator,
    currentProjectCreator,
    selectIconsCreator
  }
)(IconTool);
