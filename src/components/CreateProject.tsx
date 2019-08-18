import React, { useState, useCallback } from 'react';
import { useFetch3, useKeyDown } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Response } from '../interface';
import { tooltipConfigCreator } from '../redux/actions';
import Button from './basic_components/button/Button';
import Input from './basic_components/input/Input';
import './CreateProject.scss';

interface Props {
  history: any,
  display: boolean,
  callback: Function,
  tooltipConfigCreator: Function
}

const CreateProject = (props: Props) => {
  const { history, callback, tooltipConfigCreator } = props;
  const [name, setName] = useState('');
  const [iconType, setIconType] = useState('img');
  const [attribution, setAttribution] = useState('personal');

  useKeyDown(() => {
    name && handleRequest();
  }, 13);

  useKeyDown(() => {
    props.callback()
  }, 27);

  const requestCreateProject = useFetch3();
  function handleRequest() {
    requestCreateProject.post('/createProject', {
      name,
      iconType,
      type: attribution
    }, (data: Response) => {
      createCallback(data);
    });
  }
  const createCallback = useCallback((createResponse: Response) => {
    if (createResponse.state === 'success') {
      tooltipConfigCreator({
        tooltip: '新项目创建成功',
        icon: '#icon-wancheng1',
        rootStyle: { boxShadow: 'none' }
      });
      history.push(`/icon/${attribution}/${name}`);
      callback();
      window.location.reload();
      return;
    }
    if (createResponse.result === 'not login') {
      tooltipConfigCreator({ tooltip: '当前不在线, 请先登录', icon: '#icon-shibai-' });
      callback();
      history.push('/login');
      return;
    }
    if (createResponse.result === 'repeat') {
      tooltipConfigCreator({
        tooltip: '项目名称已存在',
        icon: '#icon-shibai-',
        rootStyle: { boxShadow: 'none' }
      });
    }
    if (createResponse.result === 'server is error') {
      tooltipConfigCreator({
        tooltip: '服务器错误',
        icon: '#icon-shibai-',
        rootStyle: { boxShadow: 'none' }
      });
    }
  }, [name, callback, history, tooltipConfigCreator, attribution]);

  return (
    <div
      className="dialog-mask"
      style={{display: props.display ? "block" : "none"}}
    >
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
            <Input
              style={{width: "12rem"}}
              maxLength={15}
              callback={(value: string) => setName(value)}
            />
          </div>
          <div className="select-container">
            <label className="label">项目类型:</label>
            <input
              className="input-radio img"
              name="iconType"
              type="radio"
              value="img"
              checked={iconType === "img"}
              onChange={(event) => setIconType(event.target.value)}
            />
            <input
              className="input-radio svg"
              name="iconType"
              type="radio"
              value="svg"
              checked={iconType === "svg"}
              onChange={(event) => setIconType(event.target.value)}
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
          <Button
            name={"取消"}
            callback={() => props.callback()}
            btnStyle={{marginRight: '1rem'}}
          />
          <Button
            disabled={name ? false : true}
            name={"确定"}
            callback={handleRequest}
          />
        </footer>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    tooltip: state.tooltipConfig.tooltip
  }),
  {
    tooltipConfigCreator
  }
)(CreateProject);
