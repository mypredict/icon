import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BoolObj, State } from '../interface';
import { selectAllCreator, selectIconsCreator } from '../redux/actions';
import { copyString } from '../tools/index';
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
  selectAllCreator: Function,
  selectIconsCreator: Function
}

const IconShow = (props: Props) => {
  const [icons, setIcons] = useState<BoolObj>(arrToObj(props.icons));

  // 单选
  function handleSelect(selectIcon: string): void {
    const newicons: BoolObj = { ...icons };
    newicons[selectIcon] = !newicons[selectIcon];
    setIcons(newicons);
  }

  useEffect(() => {
    if (props.selectAll) {
      // setIcons(arrToObj(props.icons, true));
      props.selectIconsCreator(props.icons);
    }
  }, [props.icons, props.selectAll, icons]);

  function handleChangeName(icon: string): void {
    console.log(icon, '修改名字');
  }

  function handleDownload(icon: string): void {
    console.log(icon, '下载图标');
  }

  function handleDelete(icon: string): void {
    console.log(icon, '删除图标');
  }

  function handleMove(icon: string): void {
    console.log(icon, '添加至项目')
  }

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
                title="删除图标"
                onClick={() => handleDelete(icon)}>
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-piliangshanchu" />
                </svg>
              </div>
              <div
                className="icon-tool-container"
                title="添加至项目"
                onClick={() => handleMove(icon)}>
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-yiruwenjianjia" />
                </svg>
              </div>
              <div className="icon-copy-container" onClick={() => copyString(icon)}>
                <svg className="icon icon-copy" aria-hidden="true">
                  <use xlinkHref="#icon-fuzhi" />
                </svg>
                复制代码
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
    selectAll: state.selectAll
  }),
  {
    selectAllCreator,
    selectIconsCreator
  }
)(IconShow);
