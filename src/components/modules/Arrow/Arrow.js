import React from 'react';
import * as a from './Arrow.styled';

const Arrow = props => {
  return (
    <a.arrowTouch onPress={props.onPress}>
      <a.arrowShape source={require('/assets/icons/ArrowLogo.png')} />
    </a.arrowTouch>
  );
};

export default Arrow;
