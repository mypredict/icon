import React, { useState, useEffect, useCallback } from 'react';
import { useFetch3 } from '../../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Response } from '../../interface';
import { NavLink } from 'react-router-dom';
import { Navigation } from '../../interface';
import { teamProjectsCreator } from '../../redux/actions';
import Button from '../basic_components/button/Button';
import './Menu.scss';

interface Props {
  history: any,
  teamProjects: Array<string>,
  personalProjects: Array<string>,
  currentName: string,
  teamProjectsCreator: Function
}

const Menu = (props: Props) => {
  const { history, teamProjects, personalProjects, currentName, teamProjectsCreator } = props;
  const [chapterTitleNum, setChapterTitleNum] = useState(0);

  function handleClick(chapterIndex: number): void {
    setChapterTitleNum(chapterIndex);
  }

  // 监听路由的变化并请求当前项目的数据
  const listenUrl = useCallback((location: any, teamProjects: Array<string> = props.teamProjects) => {
    const [type, name] = location.pathname.slice(1).split('/');
      if (type === 'icon') {
        if (!teamProjects.includes(name) && teamProjects.length) {
          history.push(`/icon/${teamProjects[0]}`);
        }
      }
  }, [history, currentName, props.teamProjects]);

  useEffect(() => {
    const historyListener = history.listen((location: any) => listenUrl(location));
    return () => historyListener();
  }, [history]);

  useEffect(() => {
    listenUrl(history.location, teamProjects);
  }, [history, teamProjects]);

  // 获取团队项目列表
  const request = useFetch3();
  useEffect(() => {
    request.get('/teamProjects', (response: Response) => {
      const newTeamProjects = response.result.map((item: any) => item.name);
      teamProjectsCreator(newTeamProjects);
    });
  }, [teamProjectsCreator]);
  
  // 更新项目列表
  const [menuJson, setMenuJson]: [Array<Navigation>, Function] = useState([]);
  useEffect(() => {
    setMenuJson([
      {
        primaryNavigation: '团队项目',
        secondaryNavigation: teamProjects
      },
      {
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
            style={{ height: chapterTitleNum === chapterIndex ? 'auto' : '2rem' }}
            onClick={() => handleClick(chapterIndex)}>
            <Button
              name={chapter.primaryNavigation}
              btnBackground="#fff"
            />
            {
              chapter.secondaryNavigation.length > 0
                ? chapter.secondaryNavigation.map((item, itemIndex) => (
                  <NavLink to={`/icon/${item}`} className="project-menu" key={itemIndex}>
                    <div className="chapter-item">
                      {item}
                    </div>
                  </NavLink>
                ))
                : (
                  <div className="chapter-item">
                    还没有创建项目...
                  </div>
                )
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
    currentName: state.currentProject.name
  }),
  {
    teamProjectsCreator
  }
)(Menu);
