import React from 'react';
import { connect } from 'react-redux';
import { State } from '../interface';
import AutoFitImg from './basic_components/AutoFitImg/AutoFitImg';
import './IconZoom.scss';

interface Props {
  projectId: string,
  src: string,
  alt: string,
  display: boolean,
  callback: Function
}

const IconZoom = (props: Props) => {
  return (
    <div
      className="dialog-mask icon-zoom-dialog-mask"
      style={{display: props.display ? "block" : "none"}}
      onClick={() => props.callback()}
    >
      <div
        className="icon-zoom-page"
        style={{background: localStorage.getItem(`${props.projectId}Color`) || '#fff'}}
      >
        {
          props.display && (
            <AutoFitImg
              src={props.src}
              alt={props.alt}
              objectFit="contain"
            />
          )
        }
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    projectId: state.currentProject.id,
  })
)(IconZoom);
