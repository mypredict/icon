import React, { useReducer, useEffect, useState } from 'react';
import { useCopy, useFetch3 } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { BoolObj, State, Action, Response } from '../interface';
import {
  selectAllCreator,
  selectIconsCreator,
  tooltipConfigCreator,
  currentProjectCreator
} from '../redux/actions';
import Search from './basic_components/search/Search';
import Button from './basic_components/button/Button';
import Dialog from './basic_components/dialog/Dialog';
import IconZoom from './IconZoom';
import AddTo from './AddTo';
import AutoImg from './basic_components/autoImg/AutoImg';
import SingleIconTools from './SingleIconTools';
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
  userId: string,
  members: Array<string>,
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

  function singleToolClick(icon: string, type: string) {
    dialogsDispatch({ type: 'iconName', data: icon });
    type === 'handleEditName' && dialogsDispatch({ type: 'editName' });
    type === 'handleZoom' && dialogsDispatch({ type: 'iconZoom' });
    type === 'handleAddTo' && dialogsDispatch({ type: 'addToProject' });
    type === 'handleDelete' && dialogsDispatch({ type: 'deleteIcons' });
    if (type === 'handleCopyCode') {
      const iconTemplate = localStorage.getItem(`${props.projectId}Code`) || '{{iconName}}';
      copyCode(iconTemplate.replace('{{iconName}}', icon));
    }
    if (type === 'handleDownload') {
      window.open(
        `http://localhost:8000/download?path=${encodeURIComponent(props.link)}&filename=${icon}`,
        '_self'
      );
    }
  }

  // 搜索筛选
  const [searchGroup, setSearchGroup] = useState('');
  const [searchValue, setSearchValue] = useState('');
  function searchCallback(input: string) {
    if (input.includes(':')) {
      const [group, value] = input.split(':');
      setSearchGroup(group.trim().toLowerCase());
      setSearchValue(value.trim().toLowerCase());
    } else {
      setSearchGroup('');
      setSearchValue(input.trim().toLowerCase());
    }
  }

  return (
    <div
      className="icon-show-page"
      style={{display: props.projectId ? "flex" : "none"}}
    >
      {
        dialogs.editName &&
        <Dialog
          display={dialogs.editName}
          title="修改图标名称"
          input={true}
          inputPlaceholder="图标名称, 不包含扩展名"
          maxLength={100}
          callback={editNameCallback}
        />
      }
      <IconZoom
        src={`/icon/${props.link}/${dialogs.iconName}`}
        alt={dialogs.iconName}
        display={dialogs.iconZoom}
        callback={() => dialogsDispatch({ type: 'iconZoom' })}
      />
      {
        dialogs.addToProject &&
        <AddTo
          icon={dialogs.iconName}
          display={dialogs.addToProject}
          callback={() => dialogsDispatch({ type: 'addToProject' })}
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
      <div className="icon-group-head">
        <span className="group-name">
          <svg className="icon icon-group" aria-hidden="true">
            <use xlinkHref="#icon-fenzu" />
          </svg>
          {"base"}
        </span>
        <div className="group-tools">
          <Search callback={searchCallback} placeholder={"value | group:value"} />
          {
            props.members.includes(props.userId) && (
              <>
                <Button
                  name="新建分组"
                  btnStyle={{ borderRadius: "1rem", marginLeft: '1.5rem' }}
                  callback={() => {}}
                />
                <Button
                  name="图片分组"
                  btnStyle={{ borderRadius: "1rem", marginLeft: '1.5rem' }}
                  callback={() => {}}
                />
              </>
            )
          }
        </div>
      </div>
      {
        props.icons
          .filter((icon) => icon.toLowerCase().includes(searchValue))
          .map((icon, iconIndex) => (
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
              {
                !props.bulkEdit &&
                <SingleIconTools icon={icon} callback={singleToolClick} />
              }
            </figure>
          )
        )
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
    userId: state.userMessage.userId,
    members: state.currentProject.members,
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
