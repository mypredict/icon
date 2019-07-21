import { useState, useEffect } from 'react';

interface AllSize {
  iconAspectRatio: number,
  containerWidth: number,
  containerHeight: number,
  containerAspectRatio: number
}

function getBigNewIconSize(allSize: AllSize): Array<number> {
  let [newIconWidth, newIconHeight] = [0, 0];
  const {
    iconAspectRatio,
    containerWidth,
    containerHeight,
    containerAspectRatio
  } = allSize;
  if (iconAspectRatio >= containerAspectRatio) {
    newIconHeight = containerHeight;
    newIconWidth = Math.ceil(newIconHeight * iconAspectRatio);
  } else {
    newIconWidth = containerWidth;
    newIconHeight = Math.ceil(newIconWidth / iconAspectRatio);
  }
  return [newIconWidth, newIconHeight];
}

function getSmallNewIconSize(allSize: AllSize): Array<number> {
  let [newIconWidth, newIconHeight] = [0, 0];
  const {
    iconAspectRatio,
    containerWidth,
    containerHeight,
    containerAspectRatio
  } = allSize;
  if (iconAspectRatio >= containerAspectRatio) {
    newIconWidth = containerWidth;
    newIconHeight = newIconWidth / iconAspectRatio;
  } else {
    newIconHeight = containerHeight;
    newIconWidth = newIconHeight * iconAspectRatio;
  }
  return [newIconWidth, newIconHeight];
}

interface Props {
  iconWidth: number,
  iconHeight: number,
  containerWidth: number,
  containerHeight: number,
  full?: boolean
}

function useIconSize(props: Props) {
  const { iconWidth, iconHeight, containerWidth, containerHeight, full = false } = props;
  const [iconNewSize, setIconNewSize] = useState([0, 0]);

  useEffect(() => {
    const iconAspectRatio = iconHeight > 0 ? iconWidth / iconHeight : 0;
    const containerAspectRatio = containerHeight > 0 ? containerWidth / containerHeight : 0;
    const allSize = {
      iconAspectRatio,
      containerWidth,
      containerHeight,
      containerAspectRatio
    };
    if (full) {
      setIconNewSize(getBigNewIconSize(allSize));
    } else {
      setIconNewSize(getSmallNewIconSize(allSize));
    }
  }, [iconWidth, iconHeight, containerWidth, containerHeight, full]);

  return iconNewSize;
}

export default useIconSize;