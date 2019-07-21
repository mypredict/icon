import React, { useState, useEffect } from 'react';
import { useIconSize } from '../custom_hooks/index';
import './IconZoom.scss';

type IconType = 'svg' | 'img';

interface Props {
  display: boolean,
  iconType: IconType,
  iconName: string,
  callback: Function
}

const IconZoom = (props: Props) => {
  const icon: HTMLElement | null = document.querySelector('.icon-zoom');
  const container: HTMLElement | null = document.querySelector('.icon-zoom-page');
  const [originalSize, setOriginalSize] = useState({
    iconWidth: 0,
    iconHeight: 0,
    containerWidth: 0,
    containerHeight: 0,
  });
  const [iconNewWidth, iconNewHeight] = useIconSize(originalSize);

  useEffect(() => {
    if (container) {
      const img = new Image();
      img.onload = () => {
        setOriginalSize({
          iconWidth: img.width,
          iconHeight: img.width,
          containerWidth: container.clientWidth - 50,
          containerHeight: container.clientHeight - 50
        });
      }
      img.src = 'https://avatars2.githubusercontent.com/u/27626713?s=460&v=4';
    }
  }, [icon, container]);

  return (
    <div
      className="dialog-mask icon-zoom-dialog-mask"
      style={{display: props.display ? "block" : "none"}}
      onClick={() => props.callback()}
    >
      <div className="icon-zoom-page">
        {
          props.iconType === 'svg' ? (
            <svg
              className="icon-zoom"
              style={{
                width: "300px",
                height: "300px"
              }}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-unie122" />
            </svg>
          ) : (
            <img
              className="icon-zoom"
              style={{
                width: `${iconNewWidth}px`,
                height: `${iconNewHeight}px`
              }}
              src="https://avatars2.githubusercontent.com/u/27626713?s=460&v=4"
              alt="图标"
            />
          )
        }
      </div>
    </div>
  );
};

export default IconZoom;
