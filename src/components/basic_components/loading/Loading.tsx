import React from 'react';

import './Loading.scss';

interface Props {
  containerWidth: string,
  circleColor: [string, string, string, string]
}

function Loading (props: Props) {
  return (
    <div className="loading-container" style={{width: props.containerWidth}}>
      <div style={{backgroundColor: props.circleColor[0]}}></div>
      <div style={{backgroundColor: props.circleColor[1]}}></div>
      <div style={{backgroundColor: props.circleColor[2]}}></div>
      <div style={{backgroundColor: props.circleColor[3]}}></div>
    </div>
  );
}

Loading.defaultProps = {
  containerWidth: '50px', // 小球容器总宽度
  circleColor: ['#bbb', '#bbb', '#bbb', '#bbb'] // 每个小球颜色
}

export default Loading;