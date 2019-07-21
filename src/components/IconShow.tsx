import React, { useReducer, useEffect } from 'react';
import { useCopy } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { BoolObj, State, Action } from '../interface';
import { selectAllCreator, selectIconsCreator } from '../redux/actions';
import Dialog from './basic_components/dialog/Dialog';
import IconZoom from './IconZoom';
import AddTo from './AddTo';
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
  icons: Array<string>,
  bulkEdit: boolean,
  selectAll: boolean,
  selectIcons: Array<string>,
  selectAllCreator: Function,
  selectIconsCreator: Function
}

const IconShow = (props: Props) => {
  const copyCode = useCopy();

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

  function editNameCallback(sure: boolean, newName: string) {
    if (sure) {
      console.log(newName);
    } else {
      dialogsDispatch({ type: 'editName' });
    }
  }

  function handleDownload(icon: string): void {
    console.log(icon, '下载图标');
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

  function deleteIconsCallback(close: boolean): void {
    if (close) {
      dialogsDispatch({ type: 'deleteIcons' });
    } else {
      dialogsDispatch({ type: 'deleteIcons' });
    }
  }

  return (
    <div className="icon-show-page">
      <Dialog
        display={dialogs.editName}
        title="修改图标名称"
        input={true}
        inputPlaceholder="图标名称"
        maxLength={20}
        callback={editNameCallback}
      />
      <IconZoom
        display={dialogs.iconZoom}
        iconType="svg"
        iconName={dialogs.iconName}
        callback={() => dialogsDispatch({ type: 'iconZoom' })}
      />
      <AddTo
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
            style={{border: props.bulkEdit
              ? icons[icon] ? '1px solid #e94d0f' : '1px solid #ccc'
              : 'none'
            }}
            onClick={() => props.bulkEdit && selectDispatch({ type: "selectSingle", data: icon })}>
            <svg className="icon icon-self" aria-hidden="true">
              <use xlinkHref="#icon-yiruwenjianjia" />
            </svg>
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
                onClick={() => copyCode(icon)}>
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
    icons: state.currentProject.icons,
    bulkEdit: state.bulkEdit,
    selectAll: state.selectAll,
    selectIcons: state.selectIcons
  }),
  {
    selectAllCreator,
    selectIconsCreator
  }
)(IconShow);
