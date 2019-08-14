import React, { useState, ChangeEvent } from 'react';
import { useFetch3 } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State, Response } from '../interface';
import Button from './basic_components/button/Button';
import './AddTo.scss';

interface Props {
  icon?: string,
  display: boolean,
  callback: Function,
  path: string,
  teamProjects: Array<string>,
  personalProjects: Array<string>,
  selectIcons: Array<string>
}

const AddTo = (props: Props) => {
  const [personalSelects, setPersonalSelects]: [Array<string>, Function] = useState([]);
  const [teamSelects, setTeamSelects]: [Array<string>, Function] = useState([]);

  function selectAllPersonal(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.checked) {
      setPersonalSelects([...props.personalProjects]);
    } else {
      setPersonalSelects([]);
    }
  }

  function selectSinglePersonal(event: ChangeEvent<HTMLInputElement>, name: string): void {
    if (event.target.checked) {
      const newPersonalSelects = [...personalSelects, name];
      if (newPersonalSelects.length === props.personalProjects.length) {
        setPersonalSelects([...props.personalProjects]);
      }
      setPersonalSelects(newPersonalSelects);
    } else {
      const newPersonalSelects = [...personalSelects];
      newPersonalSelects.splice([...personalSelects].indexOf(name), 1);
      setPersonalSelects(newPersonalSelects);
    }
  }

  function selectAllTeam(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.checked) {
      setTeamSelects([...props.teamProjects]);
    } else {
      setTeamSelects([]);
    }
  }

  function selectSingleTeam(event: ChangeEvent<HTMLInputElement>, name: string): void {
    if (event.target.checked) {
      const newTeamSelects = [...teamSelects, name];
      if (newTeamSelects.length === props.teamProjects.length) {
        setTeamSelects([...props.teamProjects]);
      }
      setTeamSelects(newTeamSelects);
    } else {
      const newTeamSelects = [...teamSelects];
      newTeamSelects.splice([...teamSelects].indexOf(name), 1);
      setTeamSelects(newTeamSelects);
    }
  }

  const request = useFetch3();
  function addToCallback(): void {
    const message = {
      personalSelects,
      teamSelects,
      path: props.path,
      icons: props.icon ? [props.icon] : props.selectIcons
    };
    request.post('/addTo', message, (data: Response) => {
      console.log(data);
    });
  }

  return (
    <div
      className="dialog-mask"
      style={{display: props.display ? "block" : "none"}}
    >
      <div className="add-to-page">
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
          <h3>添加至项目</h3>
          <div className="project-list">
            <ul className="personal">
              <li className="item item-head">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={personalSelects.length === props.personalProjects.length}
                  onChange={selectAllPersonal}
                />
                个人项目
              </li>
              {
                props.personalProjects.map((item, itemIndex) => (
                  <li className="item" key={itemIndex}>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={personalSelects.includes(item)}
                      onChange={(event) => selectSinglePersonal(event, item)}
                    />
                    <span className="item-name" title={item}>{item}</span>
                  </li>
                ))
              }
            </ul>
            <ul className="team">
              <li className="item  item-head">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={teamSelects.length === props.teamProjects.length}
                  onChange={selectAllTeam}
                />
                团队项目
              </li>
              {
                props.teamProjects.map((item, itemIndex) => (
                  <li className="item" key={itemIndex}>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={teamSelects.includes(item)}
                      onChange={(event) => selectSingleTeam(event, item)}
                    />
                    <span className="item-name" title={item}>{item}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <footer className="btn-container">
          <Button
            name="取消"
            callback={() => props.callback()}
            btnStyle={{marginRight: '1rem'}}
          />
          <Button
            disabled={!(personalSelects.length > 0 || teamSelects.length > 0)}
            name="确定"
            callback={addToCallback}
          />
        </footer>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    path: state.currentProject.link,
    teamProjects: state.userMessage.teamProjects,
    personalProjects: state.userMessage.personalProjects,
    selectIcons: state.selectIcons
  })
)(AddTo);
