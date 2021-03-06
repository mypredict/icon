import React, { useState, useEffect, useCallback } from 'react';
import { useFetch3 } from '../../custom_hooks/index';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { State, Response, Navigation } from '../../interface';
import {
  teamProjectsCreator,
  tooltipConfigCreator,
  currentProjectCreator,
  bulkEditCreator,
  selectAllCreator,
  selectIconsCreator,
  iconBgcCreator
} from '../../redux/actions';
import Button from '../basic_components/button/Button';
import './Menu.scss';

interface Props {
  history: any,
  teamProjects: Array<string>,
  personalProjects: Array<string>,
  currentName: string,
  currentType: string,
  teamProjectsCreator: Function,
  tooltipConfigCreator: Function,
  currentProjectCreator: Function,
  bulkEditCreator: Function,
  selectAllCreator: Function,
  selectIconsCreator: Function,
  iconBgcCreator: Function
}

const Menu = (props: Props) => {
  const {
    history,
    currentName,
    currentType,
    teamProjects,
    personalProjects,
    teamProjectsCreator,
    tooltipConfigCreator,
    currentProjectCreator,
    bulkEditCreator,
    selectAllCreator,
    selectIconsCreator,
    iconBgcCreator
  } = props;
  const [chapterTitleNum, setChapterTitleNum] = useState({
    team: true,
    personal: true
  });
  const request = useFetch3();

  function handleClick(chapterType: 'team' | 'personal'): void {
    setChapterTitleNum({
      ...chapterTitleNum,
      [chapterType]: !chapterTitleNum[chapterType]
    });
  }

  // 监听路由的变化并请求当前项目的数据
  const listenUrl = useCallback((location: any) => {
    const [route, type, name] = location.pathname.slice(1).split('/');
      // 如果路径不是 icon 或者当前路径就是当前项目则直接返回
      if (route !== 'icon' || (type === currentType && name === currentName)) {
        return;
      }
      // 如果路径不对返回
      if (!['team', 'personal'].includes(type) || !name) {
        return;
      }
      selectIconsCreator([]);
      // 路径都对则请求当前项目
      request.get(`/icon/${type}/${name}`, (response: Response) => {
        if (response.state === 'error') {
          if (!response.result) {
            tooltipConfigCreator({
              tooltip: '不存在此项目',
              icon: '#icon-shibai-'
            });
            return;
          }
          if (response.result === 'not online') {
            tooltipConfigCreator({
              tooltip: '不在登录状态无法访问个人项目',
              icon: '#icon-shibai-'
            });
            return;
          }
          tooltipConfigCreator({
            tooltip: '服务器出现错误',
            icon: '#icon-shibai-'
          });
          return;
        }
        const { _id, userId, name, type, iconType, url, icons, iconGroups } = response.result;
        currentProjectCreator({
          id: _id,
          name,
          type,
          iconType,
          link: url,
          members: [userId],
          icons,
          iconGroups,
        });
        bulkEditCreator(false);
        selectAllCreator(false);
        iconBgcCreator(localStorage.getItem(`${_id}Color`) || '#fff');
      });
  }, [
    request,
    currentName,
    currentType,
    tooltipConfigCreator,
    currentProjectCreator,
    bulkEditCreator,
    selectAllCreator,
    selectIconsCreator,
    iconBgcCreator
  ]);

  useEffect(() => {
    const historyListener = history.listen((location: any) => listenUrl(location));
    return () => historyListener();
  }, [history, listenUrl]);

  useEffect(() => {
    listenUrl(history.location);
  }, [history, listenUrl]);

  // 获取团队项目列表
  useEffect(() => {
    if (teamProjects.length > 0) {
      return;
    }
    request.get('/teamProjects', (response: Response) => {
      const newTeamProjects = response.result.map((item: any) => item.name).reverse();
      teamProjectsCreator(newTeamProjects);
    });
  }, [request, teamProjects, teamProjectsCreator]);
  
  // 更新项目列表
  const [menuJson, setMenuJson]: [Array<Navigation>, Function] = useState([]);
  useEffect(() => {
    setMenuJson([
      {
        type: 'team',
        primaryNavigation: '团队项目',
        secondaryNavigation: teamProjects
      },
      {
        type: 'personal',
        primaryNavigation: '个人项目',
        secondaryNavigation: personalProjects
      }
    ]);
  }, [teamProjects, personalProjects]);

  return (
    <nav className="menu-container">
      {
        menuJson.map((chapter, chapterIndex) => (
          <div
            className="chapter"
            key={chapterIndex}
            style={{
              height: chapterTitleNum[chapter.type]
                ? `${chapter.secondaryNavigation.length * 2 + 2}rem`
                : "2rem"
            }}
          >
            <Button
              name={chapter.primaryNavigation}
              btnBackground="#fff"
              btnColor={props.currentType === chapter.type ? "#159ed4" : ""}
              callback={() => handleClick(chapter.type)}
            />
            {
              chapter.secondaryNavigation.map((item, itemIndex) => (
                <NavLink
                  to={`/icon/${chapter.type}/${item}`}
                  className="project-menu"
                  key={itemIndex}
                >
                  <div className="chapter-item">
                    {item}
                  </div>
                </NavLink>
              ))
            }
          </div>
        ))
      }
    </nav>
  );
};

export default connect(
  (state: State) => ({
    personalProjects: state.userMessage.personalProjects,
    teamProjects: state.teamProjects,
    currentName: state.currentProject.name,
    currentType: state.currentProject.type
  }),
  {
    teamProjectsCreator,
    tooltipConfigCreator,
    currentProjectCreator,
    bulkEditCreator,
    selectAllCreator,
    selectIconsCreator,
    iconBgcCreator
  }
)(Menu);
