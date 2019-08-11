import React, { useState, useCallback, useEffect } from 'react';
import { useFetch, useKeyDown } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Response } from '../interface';
import { tooltipConfigCreator, userMessageCreator } from '../redux/actions';
import Button from './basic_components/button/Button';
import Input from './basic_components/input/Input';
import UploadHead from './UploadHead';
import './Config.scss';

interface Props {
  stateUsername: string,
  history: any,
  avatar: string,
  tooltipConfigCreator: Function,
  userMessageCreator: Function
}

const Config = (props: Props) => {
  const { history, stateUsername, tooltipConfigCreator, userMessageCreator } = props;
  const [username, setUsername] = useState(props.stateUsername);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [cutHead, setCutHead] = useState(false);

  // 登出
  const [logoutUrl, setLogoutUrl] = useState('');
  const logoutResponse: Response = useFetch(logoutUrl);
  useEffect(() => {
    if (logoutResponse.state === 'success') {
      userMessageCreator({
        username: '',
        userId: '',
        avatar: '',
        personalProjects: []
      });
      history.push('/login');
    }
  }, [logoutResponse, stateUsername, history, tooltipConfigCreator, userMessageCreator]);


  // 更改信息
  const [userNewMessage, setUserNewMessage]: [object | null, Function] = useState(null);
  const configResetResponse: Response = useFetch('/updateUserMessage', 'POST', userNewMessage);
  const configResetCallback = useCallback(() => {
    if (password === repeatPassword) {
      setUserNewMessage({ username, password });
    } else {
      tooltipConfigCreator({ tooltip: '密码不一致', icon: '#icon-shibai-' });
    }
  }, [username, password, repeatPassword, tooltipConfigCreator]);

  useEffect(() => {
    if (configResetResponse.result === 'unFetch') {
      return;
    }
    if (configResetResponse.state === 'success') {
      tooltipConfigCreator({ tooltip: '更改信息成功', icon: '#icon-wancheng1' });
      setLogoutUrl('/logout');
    } else {
      tooltipConfigCreator({ tooltip: '当前不在线, 修改信息失败', icon: '#icon-shibai-' });
      history.push('/login');
    }
  }, [history, tooltipConfigCreator, configResetResponse]);

  useKeyDown(() => {
    if (username && password && repeatPassword) {
      configResetCallback();
    }
  }, 13);

  return (
    <div className="config-page">
      <UploadHead
        display={cutHead}
        callback={() => setCutHead(false)}
      />
      <header className="menu">
        <Button
          name="返回"
          btnBackground="#eee"
          callback={() => history.goBack()}
        />
        <Button
          name="登出"
          btnBackground="#fff"
          callback={() => setLogoutUrl('/logout')}
        />
      </header>
      <div
        className="cut-img-container"
        onClick={() => setCutHead(true)}
      >
        <div className="prompt">
          更换头像
        </div>
        <img
          src={
            props.avatar
              ? props.avatar
              : "https://avatars2.githubusercontent.com/u/27626713?s=460&v=4"
          }
          alt="个人头像"
        />
      </div>
      <form className="reset-container">
        <label className="input-container">
          <Input
            type="text"
            placeholder="用户名"
            defaultValue={username}
            callback={(username: string) => setUsername(username)}
          />
        </label>
        <label className="input-container">
          <Input
            type="password"
            placeholder="密码"
            callback={(password: string) => setPassword(password)}
          />
        </label>
        <label className="input-container">
          <Input
            type="password"
            placeholder="确认密码"
            callback={(password: string) => setRepeatPassword(password)}
          />
        </label>
        <Button
          disabled={!username || !password || !repeatPassword}
          name="更改信息"
          btnStyle={{width: "100%", marginTop: "1rem"}}
          callback={configResetCallback}
        />
      </form>
    </div>
  );
};

export default connect(
  (state: State) => ({
    stateUsername: state.userMessage.username,
    avatar: state.userMessage.avatar
  }),
  {
    tooltipConfigCreator,
    userMessageCreator
  }
)(Config);
