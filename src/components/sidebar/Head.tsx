import React, { useEffect } from 'react';
import { useFetch } from '../../custom_hooks/index';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { State } from '../../interface';
import { userMessageCreator } from '../../redux/actions';
import './Head.scss';

interface Props {
  username: string,
  avatar: string,
  history: any,
  userMessageCreator: Function
}

const Head = (props: Props) => {
  const { userMessageCreator, history } = props;
  const response = useFetch('/isOnLine', 'GET');
  useEffect(() => {
    if (response.state === 'success') {
      const { username, _id, avatar, personalProjects } = response.result;
      userMessageCreator({
        username,
        avatar,
        personalProjects,
        userId: _id,
      });
    }
  }, [response, userMessageCreator, history]);

  return (
    <header className="head-container">
      <div className="head-portrait">
        {
          props.username ? (
            <NavLink to="/config" className="config-img">
              <div className="prompt">
                个人设置
              </div>
              <img
                src={
                  props.avatar
                    ? props.avatar
                    : "https://avatars2.githubusercontent.com/u/27626713?s=460&v=4"
                }
                alt="个人头像"
              />
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
        props.username ? (
          <span>{props.username}</span>
        ) : (
          <NavLink to="/login" className="login-button">
            <span>点击登录</span>
          </NavLink>
        )
      }
    </header>
  );
};

export default connect(
  (state: State) => ({
    username: state.userMessage.username,
    avatar: state.userMessage.avatar
  }),
  {
    userMessageCreator
  }
)(Head);
