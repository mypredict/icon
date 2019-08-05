import React, { useState } from 'react';
import { connect } from 'react-redux';
import { State } from '../interface';
import { tooltipConfigCreator } from '../redux/actions';
import Button from './basic_components/button/Button';
import './IconTemplate.scss';

interface Props {
  display: boolean,
  callback: Function,
  projectId: string,
  tooltipConfigCreator: Function
}

const IconTemplate = (props: Props) => {
  const [templateCode, setTemplateCode] = useState('{{iconName}}');

  function handleCreateNewTemplate() {
    localStorage.setItem(`${props.projectId}Code`, templateCode);
    props.tooltipConfigCreator({
      tooltip: '更改模板代码成功',
      icon: '#icon-wancheng1'
    });
    props.callback();
  }

  return (
    <div
      className="dialog-mask"
      style={{display: props.display ? "block" : "none"}}
    >
      <div className="icon-template-dialog">
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
          <h3>图片链接模板:</h3>
          <textarea
            className="icon-template"
            wrap="off"
            spellCheck={false}
            value={templateCode}
            onChange={(e) => setTemplateCode(e.target.value)}
          />
        </div>
        <footer className="btn-container">
          <Button
            name={"取消"}
            callback={() => props.callback()}
            btnStyle={{marginRight: '1rem'}}
          />
          <Button
            disabled={templateCode.includes('{{iconName}}') ? false : true}
            name={"确定"}
            callback={handleCreateNewTemplate}
          />
        </footer>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    projectId: state.currentProject.id
  }),
  {
    tooltipConfigCreator
  }
)(IconTemplate);
