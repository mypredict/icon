import React, { useReducer } from 'react';
import { useCopy, useFetch3 } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Action, Response } from '../interface';
import {
  bulkEditCreator,
  selectAllCreator,
  tooltipConfigCreator,
  currentProjectCreator
} from '../redux/actions';
import Dialog from './basic_components/dialog/Dialog';
import CreateProject from './CreateProject';
import IconTemplate from './IconTemplate';
import UploadIcons from './UploadIcons';
import AddTo from './AddTo';
import './IconTool.scss';

interface DialogsDisplay {
  createProject: boolean,
  iconTemplate: boolean,
  uploadIcons: boolean,
  deleteProject: boolean,
  addToProject: boolean,
  deleteIcons: boolean,
  tooltipDisplay: boolean
}

const dialogsDisplay = {
  createProject: false,
  iconTemplate: false,
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
  currentProject: object,
  icons: Array<string>,
  link: string,
  projectId: string,
  projectName: string,
  projectType: string,
  teamProjects: Array<string>,
  bulkEditCreator: Function,
  selectAllCreator: Function,
  tooltipConfigCreator: Function,
  currentProjectCreator: Function
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
          if (props.projectType === 'team' && props.projectName === props.teamProjects[0]) {
            props.history.push(`/icon/team/${props.teamProjects[1]}`);
          } else {
            props.history.push(`/icon/team/${props.teamProjects[0]}`);
          }
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
        path: props.link
      };
      request.post('/deleteIcon', postMessage, (data: Response) => {
        if (data.state === 'success') {
          props.currentProjectCreator({
            ...props.currentProject,
            icons: data.result.icons
          });
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
    if (props.bulkEdit) {
      alert('下载项目');
    }
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

  console.log(123)

  return (
    <div className="icon-tool">
      <CreateProject
        history={props.history}
        display={dialogs.createProject}
        callback={() => dispatch({ type: 'createProject' })}
      />
      <IconTemplate
        display={dialogs.iconTemplate}
        callback={() => dispatch({ type: 'iconTemplate' })}
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
      <div className="project-create">
        <button
          className="btn-operation btn-create"
          onClick={createProject}
        >
          <svg className="icon icon-create" aria-hidden="true">
            <use xlinkHref="#icon-add-author" />
          </svg>
          新建项目
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
        <span className="icon-count">共{props.icons.length}个图标</span>
        <button className="btn-operation btn-copy" onClick={() => copyLink(props.link)}>
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
    currentProjectCreator
  }
)(IconTool);
