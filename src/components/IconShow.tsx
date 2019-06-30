import React, { useState } from 'react';
import { BoolObj } from '../interface';
import './IconShow.scss';

const iconList = [
  'icon-delete0', 'icon-delete00', 'icon-delete000', 'icon-delete0000',
  'icon-delete1', 'icon-delete11', 'icon-delete111', 'icon-delete1111',
  'icon-delete2', 'icon-delete22', 'icon-delete222', 'icon-delete2222',
  'icon-delete3', 'icon-delete33', 'icon-delete333', 'icon-delete3333',
  'icon-delete4', 'icon-delete44', 'icon-delete444', 'icon-delete4444',
  'icon-delete5', 'icon-delete55', 'icon-delete555', 'icon-delete5555',
  'icon-delete6', 'icon-delete66', 'icon-delete666', 'icon-delete6666',
  'icon-delete7', 'icon-delete77', 'icon-delete777', 'icon-delete7777',
  'icon-delete8', 'icon-delete88', 'icon-delete888', 'icon-delete8888',
  'icon-delete9', 'icon-delete99', 'icon-delete999', 'icon-delete9999',
];

function arrToObj(arr: Array<string>): BoolObj {
  const obj: BoolObj = {};
  arr.forEach((item) => {
    obj[item] = false;
  });
  return obj;
}

const isEdit = false;

const IconShow: React.FC = () => {
  const [selectAllIcons, setSelectAllIcons]: [BoolObj, Function] = useState(arrToObj(iconList));
  
  function handleCopyCode(code: string): void {
    console.log(code);
  }

  function handleSelect(selectIcon: string): void {
    const newSelectAllIcons: BoolObj = { ...selectAllIcons };
    newSelectAllIcons[selectIcon] = !newSelectAllIcons[selectIcon];
    setSelectAllIcons(newSelectAllIcons);
  }

  return (
    <div className="icon-show-page">
      {
        iconList.map((icon, iconIndex) => (
          <figure
            className="icon-item"
            key={iconIndex}
            style={{border: isEdit
              ? selectAllIcons[icon] ? '1px solid #e94d0f' : '1px solid #ccc'
              : 'none'
            }}
            onClick={() => isEdit && handleSelect(icon)}>
            <svg className="icon icon-self" aria-hidden="true">
              <use xlinkHref="#icon-yiruwenjianjia" />
            </svg>
            <figcaption>{icon}</figcaption>
            <div className="icon-operation" style={{display: isEdit ? 'none' : 'flex'}}>
              <div className="icon-tool-container" title="修改代码名称">
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-grammar" />
                </svg>
              </div>
              <div className="icon-tool-container" title="下载图标">
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-unie122" />
                </svg>
              </div>
              <div className="icon-tool-container" title="删除图标">
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-piliangshanchu" />
                </svg>
              </div>
              <div className="icon-tool-container" title="添加至项目">
                <svg className="icon icon-tool" aria-hidden="true">
                  <use xlinkHref="#icon-yiruwenjianjia" />
                </svg>
              </div>
              <div
                className="icon-copy-container"
                onClick={() => handleCopyCode(icon)}>
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
        ['', '', '', '', '', '', '', '', ''].map((fill, fillIndex) => (
          <figure className="fill-item" key={fillIndex}>{fill}</figure>
        ))
      }
    </div>
  );
};

export default IconShow;
