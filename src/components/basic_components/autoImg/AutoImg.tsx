import React, { useRef, LegacyRef } from 'react';
import { useIconSize } from '../../../custom_hooks/index';
import './AutoImg.scss';

interface Props {
  src: string,
  alt: string,
  full?: boolean,
  rootStyle?: object,
  iconStyle?: object
}

const AutoImg = (props: Props) => {
  const containerSelf: LegacyRef<HTMLDivElement> = useRef(null);
  const imgSelf: LegacyRef<HTMLImageElement> = useRef(null);

  const [iconNewWidth, iconNewHeight] = useIconSize({
    iconWidth: imgSelf.current === null ? 1 : imgSelf.current.naturalWidth,
    iconHeight: imgSelf.current === null ? 1 : imgSelf.current.naturalHeight,
    containerWidth: containerSelf.current === null ? 1 : containerSelf.current.clientWidth,
    containerHeight: containerSelf.current === null ? 1 : containerSelf.current.clientHeight,
    full: props.full
  });

  return (
    <div
      ref={containerSelf}
      className="icon-container-page"
      style={props.rootStyle}
    >
      <img
        ref={imgSelf}
        className="icon-self"
        style={{
          ...props.iconStyle,
          width: iconNewWidth ? iconNewWidth : 0,
          height: iconNewHeight ? iconNewHeight : 0
        }}
        src={props.src}
        alt={props.alt}
      />
    </div>
  );
};

AutoImg.defaultProps = {
  full: true
};

export default AutoImg;
