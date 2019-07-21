import React from 'react';
import { NavLink } from 'react-router-dom';
import './Head.scss';

const isLine = false;
const Head: React.FC = () => {
  return (
    <header className="head-container">
      <div className="head-portrait">
        {
          isLine ? (
            <NavLink to="/config" className="config-img">
              <div className="prompt">
                个人设置
              </div>
              <img src="https://avatars2.githubusercontent.com/u/27626713?s=460&v=4" alt="个人头像"/>
            </NavLink>
          ) : (
            <NavLink to="/login" className="login-img">
              <svg className="icon icon-login" aria-hidden="true">
                <use xlinkHref="#icon-denglurizhi" />
              </svg>
            </NavLink>
          )
        }
      </div>
      {
        isLine ? (
          <span>个人姓名</span>
        ) : (
          <NavLink to="/login" className="login-button">
            <span>点击登录</span>
          </NavLink>
        )
      }
    </header>
  );
};

export default Head;
