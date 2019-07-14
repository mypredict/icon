import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { BoolObj, State, Action } from '../interface';
import { selectAllCreator, selectIconsCreator } from '../redux/actions';
import { useCopy } from '../custom_hooks/index';
import './IconShow.scss';

function arrToObj(arr: Array<string>, status: boolean = false): BoolObj {
  const obj: BoolObj = {};
  arr.forEach((item) => {
    obj[item] = status;
  });
  return obj;
}

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
  function reducer(state: BoolObj, action: Action): BoolObj {
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
  const [icons, dispatch] = useReducer(reducer, arrToObj(props.icons));

  // 单选
  function handleSelect(selectIcon: string): void {
    dispatch({
      type: "selectSingle",
      data: selectIcon
    });
  }

  // 全(不)选
  useEffect(() => {
    dispatch({ type: "selectAll" });
  }, [props.selectAll]);

  function handleChangeName(icon: string): void {
    console.log(icon, '修改名字');
  }

  function handleDownload(icon: string): void {
    console.log(icon, '下载图标');
  }

  function handleZoom(icon: string): void {
    console.log(icon, '放大图片');
  }

  function handleDelete(icon: string): void {
    console.log(icon, '删除图标');
  }

  function handleAddTo(icon: string): void {
    console.log(icon, '添加至项目')
  }

  console.log(1)

  return (
    <div className="icon-show-page">
      {
        props.icons.map((icon, iconIndex) => (
          <figure
            className="icon-item"
            key={iconIndex}
            style={{border: props.bulkEdit
              ? icons[icon] ? '1px solid #e94d0f' : '1px solid #ccc'
              : 'none'
            }}
            onClick={() => props.bulkEdit && handleSelect(icon)}>
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
                onClick={() => handleChangeName(icon)}>
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
