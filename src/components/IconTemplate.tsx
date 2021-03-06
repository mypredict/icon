import React, { useState, useEffect } from 'react';
import { useKeyDown } from '../custom_hooks/index';
import { connect } from 'react-redux';
import { State } from '../interface';
import { tooltipConfigCreator } from '../redux/actions';
import Button from './basic_components/button/Button';
import './IconTemplate.scss';

interface Props {
  display: boolean,
  callback: Function,
  projectId: string,
  tooltipConfigCreator: Function
}

const defaultIconTemplate = '{{iconName}}';

const IconTemplate = (props: Props) => {
  const [templateLabel, setTemplateLabel] = useState('image');
  const [templateImageCode, setTemplateImageCode] = useState(defaultIconTemplate);
  const [templateSvgCode, setTemplateSvgCode] = useState(defaultIconTemplate);

  function handleCreateNewTemplate() {
    localStorage.setItem(`${props.projectId}ImageCode`, templateImageCode);
    localStorage.setItem(`${props.projectId}SvgCode`, templateSvgCode);
    props.tooltipConfigCreator({
      tooltip: '更改模板代码成功',
      icon: '#icon-wancheng1'
    });
    props.callback();
  }

  const { projectId } = props;
  useEffect(() => {
    setTemplateImageCode(localStorage.getItem(`${projectId}ImageCode`) || defaultIconTemplate);
    setTemplateSvgCode(localStorage.getItem(`${projectId}SvgCode`) || defaultIconTemplate);
  }, [projectId]);

  useKeyDown(() => {
    props.callback();
  }, 27);

  return (
    <div
      className="dialog-mask"
      style={{display: props.display ? "block" : "none"}}
    >
      <div className="icon-template-dialog">
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
          <div className="template-label-container">
            <Button
              name="图片链接模板"
              btnBackground={templateLabel === "image" ? "#eee" : "#fff"}
              callback={() => setTemplateLabel('image')}
            />
            <Button
              name="SVG链接模板"
              btnBackground={templateLabel === "svg" ? "#eee" : "#fff"}
              callback={() => setTemplateLabel('svg')}
            />
          </div>
          {
            templateLabel === 'svg' ? (
              <textarea
                className="icon-template"
                wrap="off"
                spellCheck={false}
                value={templateSvgCode}
                onChange={(e) => setTemplateSvgCode(e.target.value)}
              />
            ) : (
              <textarea
                className="icon-template"
                wrap="off"
                spellCheck={false}
                value={templateImageCode}
                onChange={(e) => setTemplateImageCode(e.target.value)}
              />
            )
          }
        </div>
        <footer className="btn-container">
          <Button
            name={"取消"}
            callback={() => props.callback()}
            btnStyle={{marginRight: '1rem'}}
          />
          <Button
            disabled={
              (templateImageCode.includes('{{iconName}}') || templateImageCode.includes('{{-iconName}}')) &&
              (templateSvgCode.includes('{{iconName}}') || templateSvgCode.includes('{{-iconName}}'))
                ? false
                : true
            }
            name={"确定"}
            callback={handleCreateNewTemplate}
          />
        </footer>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    projectId: state.currentProject.id
  }),
  {
    tooltipConfigCreator
  }
)(IconTemplate);
