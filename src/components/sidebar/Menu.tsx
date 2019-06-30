import React, { useState } from 'react';
import { Navigation } from '../../interface';
import './Menu.scss';

let menuJson: Array<Navigation>;

menuJson = [
  {
    primaryNavigation: '团队项目',
    secondaryNavigation: ['团队项目1', '团队项目2', '团队项目3']
  },
  {
    primaryNavigation: '个人项目',
    secondaryNavigation: ['个人项目1', '个人项目2', '个人项目3']
  }
];

const Menu: React.FC = () => {
  const [chapterTitleNum, setChapterTitleNum] = useState(0);

  function handleClick(chapterIndex: number): void {
    setChapterTitleNum(chapterIndex);
  }

  return (
    <nav className="menu-container">
      {
        menuJson.map((chapter, chapterIndex) => (
          <div
            className="chapter"
            key={chapterIndex}
            style={{ height: chapterTitleNum === chapterIndex ? 'auto' : '2rem' }}
            onClick={() => handleClick(chapterIndex)}>
            <button className="chapter-title  button-common" >
              {chapter.primaryNavigation}
              <svg className="icon icon-button" aria-hidden="true">
                <use xlinkHref="#icon-controlMenu" />
              </svg>
            </button>
            {
              chapter.secondaryNavigation.map((item, itemIndex) => (
                <div className="chapter-item" key={itemIndex}>
                  {item}
                </div>
              ))
            }
          </div>
        ))
      }
    </nav>
  );
};

export default Menu;
