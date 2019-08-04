import React from 'react';
import AutoImg from './basic_components/autoImg/AutoImg';
import './IconZoom.scss';

interface Props {
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
      <div className="icon-zoom-page">
        {
          props.display && (
            <AutoImg
              src={props.src}
              alt={props.alt}
              full={false}
            />
          )
        }
      </div>
    </div>
  );
};

export default IconZoom;
