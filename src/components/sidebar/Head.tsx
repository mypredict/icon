import React from 'react';
import './Head.scss';

const Head: React.FC = () => {
  return (
    <header className="head-container">
      <div className="head-portrait">
        <div className="prompt">
          个人设置
        </div>
        <img src="https://avatars2.githubusercontent.com/u/27626713?s=460&v=4" alt="个人头像"/>
      </div>
      <span>点击登录</span>
    </header>
  );
};

export default Head;
