import React, { useState, DragEvent } from 'react';
import './Drag.scss';

interface Props {
  children?: any,
  rootStyle?: object,
  name: string,
  callback: Function
}

const Drag = (props: Props) => {
  const [dragOverBgc, setDragOverBgc] = useState('rgba(0, 0, 0, 0.3)');
  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    setDragOverBgc('rgba(0, 0, 0, 0.5)');
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    setDragOverBgc('rgba(0, 0, 0, 0.3)');
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    setDragOverBgc('rgba(0, 0, 0, 0.3)');
    const data = event.dataTransfer.getData('dragData');
    props.callback(props.name, data);
  }

  return (
    <div
      className="drag-page"
      style={{
        ...props.rootStyle,
        background: dragOverBgc
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {props.children}
    </div>
  );
};

export default Drag;
