import React, { useState, DragEvent } from 'react';
import './DragContainer.scss';

interface Props {
  children?: object,
  rootStyle?: object,
  dragBarStyle?: object,
  draggable?: boolean,
  dragData: string
}

const DragContainer = (props: Props) => {
  const [isDrag, setIsDrag] = useState(false);
  function handleDragStart(event: DragEvent) {
    !props.draggable && event.preventDefault();
    event.dataTransfer.setData('dragData', props.dragData);
  }

  return (
    <div
      className="drag-container-page"
      style={props.rootStyle}
      draggable={isDrag}
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDrag(false)}
    >
      {
        props.draggable &&
        <div
          className="drag-bar"
          style={props.dragBarStyle}
          onMouseDown={() => setIsDrag(true)}
        >
          <div className="drag-bar-line"></div>
          <div className="drag-bar-line"></div>
        </div>
      }
      {props.children}
    </div>
  );
};

DragContainer.defaultProps = {
  draggable: true,
}

export default DragContainer;
