import React from 'react';
import * as s from './DrawHead.styled';

const DrawHead = props => {
  return (
    <s.DrawTouch onPress={props.onPress} left={props.left} top={props.top}>
      <s.DrawShape source={require('/assets/icons/Drawer.png')} />
    </s.DrawTouch>
  );
};

export default DrawHead;
