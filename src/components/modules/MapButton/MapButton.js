import React from 'react';
import * as s from './MapButton.styled';

const MapButton = props => {
  const { top } = props;
  if (top) {
    return (
      <s.DrawTouchTop
        onPress={props.onPress}
        right={props.right}
        top={props.top}
      >
        <s.DrawShape source={props.img} />
      </s.DrawTouchTop>
    );
  }
  return (
    <s.DrawTouch
      onPress={props.onPress}
      right={props.right}
      bottom={props.bottom}
    >
      <s.DrawShape source={props.img} />
    </s.DrawTouch>
  );
};

export default MapButton;
