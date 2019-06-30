import React from 'react';
import IconTool from './IconTool';
import IconShow from './IconShow';
import './IconContent.scss';

const IconContent: React.FC = () => {
  return (
    <div className="icon-page">
      <IconTool />
      <IconShow />
    </div>
  );
};

export default IconContent;
