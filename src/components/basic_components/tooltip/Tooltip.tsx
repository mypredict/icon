import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { State } from '../../../interface';
import { tooltipConfigCreator } from '../../../redux/actions';
import './Tooltip.scss';

interface Props {
  tooltip: string,
  rootStyle: Object,
  icon: string,
  iconStyle: Object,
  delay: number,
  tooltipConfigCreator: Function
}

const Tooltip = (props: Props) => {
  const { tooltip, delay, tooltipConfigCreator } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      tooltipConfigCreator({
        tooltip: '',
        icon: ''
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [tooltip, delay, tooltipConfigCreator]);

  return (
    <div
      className="tooltip-page"
      style={{...props.rootStyle, display: props.tooltip ? "block" : "none"}}
    >
      <svg
        className="icon icon-tooltip"
        style={{...props.iconStyle, display: props.icon ? "inline-block" : "none"}}
        aria-hidden="true"
      >
        <use xlinkHref={props.icon} />
      </svg>
      {props.tooltip}
    </div>
  );
};

export default connect(
  (state: State) => ({
    tooltip: state.tooltipConfig.tooltip,
    rootStyle: state.tooltipConfig.rootStyle,
    icon: state.tooltipConfig.icon,
    iconStyle: state.tooltipConfig.iconStyle,
    delay: state.tooltipConfig.delay
  }),
  {
    tooltipConfigCreator
  }
)(Tooltip);
