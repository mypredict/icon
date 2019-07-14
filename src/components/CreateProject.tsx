import React, { useState } from 'react';
import { useMessage } from '../custom_hooks/index';
import Button from './basic_components/button/Button';
import Tooltip from './basic_components/tooltip/Tooltip';
import './CreateProject.scss';

interface Props {
  display: boolean,
  callback: Function
}

const CreateProject = (props: Props) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('svg');
  const [attribution, setAttribution] = useState('personal');
  const message = useMessage();

  function sureCallback() {
    if (name.trim()) {
      message.tooltip('123')
    }
  }

  return (
    <div
      className="dialog-mask"
      style={{display: props.display ? "block" : "none"}}
    >
      <Tooltip
        display={true}
        title={"正在创建项目"}
        icon={"#icon-wancheng1"}
      />
      <div className="create-project-dialog">
        <header className="icon-close-container">
          <Button
            icon={"#icon-close-page"}
            btnStyle={{padding: "10px", borderRadius: "50%"}}
            btnBackground={"#fff"}
            iconStyle={{width: "1rem", height: "1rem"}}
            callback={() => props.callback()}
          />
        </header>
        <div className="content-container">
          <h3>新建项目:</h3>
          <div className="select-container">
            <label className="label">项目名称:</label>
            <input
              className="name"
              name="name"
              type="text"
              maxLength={10}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="select-container">
            <label className="label">项目类型:</label>
            <input
              className="input-radio svg"
              name="type"
              type="radio"
              value="svg"
              checked={type === "svg"}
              onChange={(event) => setType(event.target.value)}
            />
            <input
              className="input-radio img"
              name="type"
              type="radio"
              value="img"
              checked={type === "img"}
              onChange={(event) => setType(event.target.value)}
            />
          </div>
          <div className="select-container">
            <label className="label">项目归属:</label>
            <input
              className="input-radio personal"
              name="attribution"
              type="radio"
              value="personal"
              checked={attribution === "personal"}
              onChange={(event) => setAttribution(event.target.value)}
            />
            <input
              className="input-radio team"
              name="attribution"
              type="radio"
              value="team"
              checked={attribution === "team"}
              onChange={(event) => setAttribution(event.target.value)}
            />
          </div>
        </div>
        <footer className="btn-container">
          <Button name={"取消"} callback={() => props.callback()} btnStyle={{marginRight: '1rem'}} />
          <Button name={"确定"} callback={sureCallback} />
        </footer>
      </div>
    </div>
  );
};

export default CreateProject;
