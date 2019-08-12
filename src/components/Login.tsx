import React, { useState, useEffect, useCallback } from 'react';
import { useFetch, useKeyDown } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { userMessageCreator, tooltipConfigCreator } from '../redux/actions';
import { Response } from '../interface';
import Button from './basic_components/button/Button';
import Input from './basic_components/input/Input';
import './Login.scss';

interface Props {
  userMessageCreator: Function,
  tooltipConfigCreator: Function,
  history: any
}

const Login = (props: Props) => {
  const [loginShow, setLoginShow] = useState(true);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [repeatRegisterPassword, setRepeatRegisterPassword] = useState('');
  const { tooltipConfigCreator } = props;

  // 登录
  const [loginData, setLoginData]: [object | null, Function] = useState(null);
  const loginResponse: Response = useFetch('/login', 'POST', loginData);
  const loginCallback = useCallback(() => {
    setLoginData({
      username: loginUsername,
      password: loginPassword
    });
  }, [loginUsername, loginPassword]);

  // 注册
  const [registerData, setRegisterData]: [object | null, Function] = useState(null);
  const registerResponse: Response = useFetch('/register', 'POST', registerData);
  const registerCallback = useCallback(() => {
    if (registerPassword === repeatRegisterPassword) {
      setRegisterData({
        username: registerUsername,
        password: registerPassword
      });
    } else {
      tooltipConfigCreator({ tooltip: '密码不一致', icon: '#icon-shibai-' });
    }
  }, [registerUsername, registerPassword, repeatRegisterPassword, tooltipConfigCreator]);

  useKeyDown(() => {
    if (loginShow && loginUsername && loginPassword) {
      loginCallback();
    }
    if (!loginShow && registerUsername && registerPassword && repeatRegisterPassword) {
      registerCallback();
    }
  }, 13);

  const { userMessageCreator, history } = props;
  useEffect(() => {
    if (loginResponse.state === 'success') {
      const { username, _id, avatar, personalProjects, teamProjects } = loginResponse.result;
      userMessageCreator({
        username,
        avatar,
        personalProjects,
        teamProjects,
        userId: _id,
      });
      history.push('/icon/team');
    } else {
      loginResponse.result === 'passwordError' &&
        tooltipConfigCreator({ tooltip: '密码错误', icon: '#icon-shibai-' });
      loginResponse.result === null &&
        tooltipConfigCreator({ tooltip: '不存在此用户', icon: '#icon-shibai-' });
      loginResponse.result === 'server is error' &&
        tooltipConfigCreator({ tooltip: '服务器错误', icon: '#icon-shibai-' });
    }
  }, [loginResponse, userMessageCreator, tooltipConfigCreator, history]);

  useEffect(() => {
    if (registerResponse.state === 'success') {
      tooltipConfigCreator({ tooltip: '注册成功', icon: '#icon-wancheng1' });
      setLoginShow(true);
    } else {
      registerResponse.result === 'repeat' &&
        tooltipConfigCreator({ tooltip: '用户名已存在', icon: '#icon-shibai-' });
    }
  }, [registerResponse, tooltipConfigCreator]);

  return (
    <div className="login-page">
      <header className="menu">
        <Button
          name="注册"
          btnBackground="#fff"
          btnColor={loginShow ? '' : '#159ed4'}
          callback={() => setLoginShow(false)}
        />
        <Button
          name="登录"
          btnBackground="#fff"
          btnColor={loginShow ? '#159ed4' : ''}
          callback={() => setLoginShow(true)}
        />
      </header>
      <div
        className="login-container"
        style={{height: loginShow ? 'auto' : 0}}
      >
        <label className="input-container">
          <Input
            type="text"
            placeholder="用户名"
            callback={(username: string) => setLoginUsername(username)}
          />
        </label>
        <label className="input-container">
          <Input
            type="password"
            placeholder="密码"
            callback={(password: string) => setLoginPassword(password)}
          />
        </label>
        <Button
          disabled={!loginUsername || !loginPassword}
          name="登录"
          btnStyle={{width: "100%", marginTop: "1rem"}}
          callback={loginCallback}
        />
      </div>
      <form className="register-container" style={{height: loginShow ? 0 : 'auto'}}>
        <label className="input-container">
          <Input
            type="text"
            placeholder="用户名"
            callback={(username: string) => setRegisterUsername(username)}
          />
        </label>
        <label className="input-container">
          <Input
            type="password"
            placeholder="密码"
            callback={(password: string) => setRegisterPassword(password)}
          />
        </label>
        <label className="input-container">
          <Input
            type="password"
            placeholder="确认密码"
            callback={(password: string) => setRepeatRegisterPassword(password)}
          />
        </label>
        <Button
          disabled={!registerUsername || !registerPassword || !repeatRegisterPassword}
          name="注册"
          btnStyle={{width: "100%", marginTop: "1rem"}}
          callback={registerCallback}
        />
      </form>
    </div>
  );
};

export default connect(
  null,
  {
    userMessageCreator,
    tooltipConfigCreator
  }
)(Login);
