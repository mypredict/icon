import React from 'react';
import IconTool from './IconTool';
import IconShow from './IconShow';
import './IconContent.scss';

interface Props {
  history: any
}

const IconContent = (props: Props) => {
  return (
    <div className="icon-page">
      <IconTool history={props.history} />
      <IconShow />
    </div>
  );
};

export default IconContent;
