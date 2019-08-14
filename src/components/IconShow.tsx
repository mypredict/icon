import React, { useReducer, useEffect } from 'react';
import { useCopy, useFetch3 } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { BoolObj, State, Action, Response } from '../interface';
import {
  selectAllCreator,
  selectIconsCreator,
  tooltipConfigCreator,
  currentProjectCreator
} from '../redux/actions';
import Dialog from './basic_components/dialog/Dialog';
import IconZoom from './IconZoom';
import AddTo from './AddTo';
import AutoImg from './basic_components/autoImg/AutoImg';
import './IconShow.scss';

function arrToObj(arr: Array<string>, status: boolean = false): BoolObj {
  const obj: BoolObj = {};
  arr.forEach((item) => {
    obj[item] = status;
  });
  return obj;
}

interface DialogsDisplay {
  editName: boolean,
  iconZoom: boolean,
  addToProject: boolean,
  deleteIcons: boolean,
  tooltipDisplay: boolean,
  iconName: string
}

const dialogsDisplay = {
  editName: false,
  iconZoom: false,
  addToProject: false,
  deleteIcons: false,
  tooltipDisplay: false,
  iconName: ''
};

interface Props {
  currentProject: object,
  icons: Array<string>,
  projectId: string,
  link: string,
  bulkEdit: boolean,
  selectAll: boolean,
  selectIcons: Array<string>,
  iconBgc: string,
  selectAllCreator: Function,
  selectIconsCreator: Function,
  tooltipConfigCreator: Function,
  currentProjectCreator: Function
}

const IconShow = (props: Props) => {
  const copyCode = useCopy();
  const request = useFetch3();

  function selectReducer(state: BoolObj, action: Action): BoolObj {
    let newIcons = { ...state };
    let newSelectIcons = [];
    switch(action.type) {
      case 'selectSingle':
        newIcons[action.data] = !newIcons[action.data];
        newSelectIcons = Object.keys(newIcons).filter(icon => newIcons[icon]);
        props.selectIconsCreator(newSelectIcons);
        props.selectAllCreator(newSelectIcons.length === props.icons.length);
        return newIcons;
      case 'selectAll':
        if (props.selectAll) {
          newIcons = arrToObj(props.icons, true);
        } else {
          if (props.selectIcons.length === 0 || props.selectIcons.length === props.icons.length) {
            newIcons = arrToObj(props.icons, false);
          }
        }
        newSelectIcons = Object.keys(newIcons).filter(icon => newIcons[icon]);
        props.selectIconsCreator(newSelectIcons);
        return newIcons;
      default:
        return state;
    }
  }
  const [icons, selectDispatch] = useReducer(selectReducer, arrToObj(props.icons));

  function dialogsReducer(state: DialogsDisplay, action: Action): DialogsDisplay {
    switch (action.type) {
      case 'editName':
        return { ...state, editName: !state.editName };
      case 'iconZoom':
        return { ...state, iconZoom: !state.iconZoom };
      case 'addToProject':
        return { ...state, addToProject: !state.addToProject };
      case 'deleteIcons':
        return { ...state, deleteIcons: !state.deleteIcons };
      case 'iconName':
        return { ...state, iconName: action.data };
      default:
        return state;
    }
  }
  const [dialogs, dialogsDispatch] = useReducer(dialogsReducer, dialogsDisplay);

  // 全(不)选
  useEffect(() => {
    selectDispatch({ type: "selectAll" });
  }, [props.selectAll]);

  function handleEditName(icon: string): void {
    dialogsDispatch({ type: 'editName' });
    dialogsDispatch({ type: 'iconName', data: icon });
  }

  function editNameCallback(sure: boolean, name: string) {
    dialogsDispatch({ type: 'editName' });
    if (sure) {
      const newName = name + dialogs.iconName.slice(dialogs.iconName.lastIndexOf('.'));
      const message = {
        projectId: props.projectId,
        path: props.link,
        newName,
        oldName: dialogs.iconName
      };
      request.post('/iconRename', message, (data: Response) => {
        if (data.state === 'success') {
          props.currentProjectCreator({
            ...props.currentProject,
            icons: data.result.icons
          });
          return;
        }
        if (data.result === 'repeat') {
          props.tooltipConfigCreator({
            tooltip: '图片名称重复',
            icon: '#icon-shibai-'
          });
          return;
        }
        props.tooltipConfigCreator({
          tooltip: '修改图片名称失败',
          icon: '#icon-shibai-'
        });
      });
    }
  }

  function handleDownload(icon: string): void {
    window.open(
      `http://localhost:8000/download?path=${encodeURIComponent(props.link)}&filename=${icon}`,
      '_self'
    );
  }

  function handleZoom(icon: string): void {
    dialogsDispatch({ type: 'iconZoom' });
    dialogsDispatch({ type: 'iconName', data: icon });
  }

  function handleAddTo(icon: string): void {
    dialogsDispatch({ type: 'addToProject' });
    dialogsDispatch({ type: 'iconName', data: icon });
  }

  function handleDelete(icon: string): void {
    dialogsDispatch({ type: 'deleteIcons' });
    dialogsDispatch({ type: 'iconName', data: icon });
  }

  function deleteIconsCallback(deleteIcon: boolean): void {
    dialogsDispatch({ type: 'deleteIcons' });
    if (deleteIcon) {
      const postMessage = {
        iconNames: [dialogs.iconName],
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

  function handleCopyCode(icon: string) {
    const iconTemplate = localStorage.getItem(`${props.projectId}Code`) || '{{iconName}}';
    copyCode(iconTemplate.replace('{{iconName}}', icon));
  }

  return (
    <div className="icon-show-page">
      <Dialog
        display={dialogs.editName}
        title="修改图标名称"
        input={true}
        inputPlaceholder="图标名称, 不包含扩展名"
        maxLength={100}
        callback={editNameCallback}
      />
      <IconZoom
        src={`/icon/${props.link}/${dialogs.iconName}`}
        alt={dialogs.iconName}
        display={dialogs.iconZoom}
        callback={() => dialogsDispatch({ type: 'iconZoom' })}
      />
      <AddTo
        icon={dialogs.iconName}
        display={dialogs.addToProject}
        callback={() => dialogsDispatch({ type: 'addToProject' })}
      />
      <Dialog
        display={dialogs.deleteIcons}
        title={"确定删除选中图标?"}
        callback={deleteIconsCallback}
      />
      {
        props.icons.map((icon, iconIndex) => (
          <figure
            className="icon-item"
            key={iconIndex}
            style={{
              border: props.bulkEdit
                ? icons[icon] ? '1px solid #e94d0f' : '1px solid #ccc'
                : 'none'
            }}
            onClick={() => props.bulkEdit && selectDispatch({ type: "selectSingle", data: icon })}>
            <div className="icon-container">
              <AutoImg
                rootStyle={{background: props.iconBgc}}
                src={`/icon/${props.link}/${icon}`}
                alt={icon}
              />
            </div>
            <figcaption>{icon}</figcaption>
            <div
              className="icon-operation"
              style={{display: props.bulkEdit ? 'none' : 'flex'}}>
              <div
                className="icon-tool-container"
                title="修改代码名称"
                onClick={() => handleEditName(icon)}>
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-grammar" />
                </svg>
              </div>
              <div
                className="icon-tool-container"
                title="下载图标"
                onClick={() => handleDownload(icon)}>
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-unie122" />
                </svg>
              </div>
              <div
                className="icon-tool-container"
                title="查看大图"
                onClick={() => handleZoom(icon)}>
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-fangda1" />
                </svg>
              </div>
              <div
                className="icon-tool-container"
                title="添加至项目"
                onClick={() => handleAddTo(icon)}>
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-yiruwenjianjia" />
                </svg>
              </div>
              <div
                className="icon-tool-container"
                title="删除图标"
                onClick={() => handleDelete(icon)}>
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-piliangshanchu" />
                </svg>
              </div>
              <div
                className="icon-tool-container icon-copy-container"
                title="复制代码"
                onClick={() => handleCopyCode(icon)}>
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-fuzhi" />
                </svg>
              </div>
            </div>
          </figure>
        ))
      }
      {
        Array(10).fill('').map((fill, fillIndex) => (
          <figure className="fill-item" key={fillIndex}>{fill}</figure>
        ))
      }
    </div>
  );
};

export default connect(
  (state: State) => ({
    currentProject: state.currentProject,
    icons: state.currentProject.icons,
    projectId: state.currentProject.id,
    link: state.currentProject.link,
    bulkEdit: state.bulkEdit,
    selectAll: state.selectAll,
    selectIcons: state.selectIcons,
    iconBgc: state.iconBgc
  }),
  {
    selectAllCreator,
    selectIconsCreator,
    tooltipConfigCreator,
    currentProjectCreator
  }
)(IconShow);
