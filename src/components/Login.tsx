import React, { useState, useEffect } from 'react';
import Button from './basic_components/button/Button';
import Input from './basic_components/input/Input';
import './Login.scss';

const Login: React.FC = () => {
  const [loginShow, setLoginShow] = useState(true);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [repeatRegisterPassword, setRepeatRegisterPassword] = useState('');

  function loginCallback(): void {
    alert(123);
  }

  function registerCallback(): void {
    alert(456);
  }

  useEffect(
    () => {
      const keyDown: EventListener = (e: any): void => {
        if (e.keyCode === 13) {
          if (loginShow && loginUsername && loginPassword) {
            loginCallback();
          }
          if (!loginShow && registerUsername && registerPassword && repeatRegisterPassword) {
            registerCallback();
          }
        }
      }
      document.addEventListener('keydown', keyDown);
      return () => document.removeEventListener('keydown', keyDown);
    },
    [
      loginShow,
      loginUsername,
      loginPassword,
      registerUsername,
      registerPassword,
      repeatRegisterPassword
    ]
  );

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
      <div className="login-container" style={{height: loginShow ? 'auto' : 0}}>
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
      <div className="login-container" style={{height: loginShow ? 0 : 'auto'}}>
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
          callback={loginCallback}
        />
      </div>
    </div>
  );
};

export default Login;
