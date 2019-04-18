import React from 'react';
import * as s from './DrawHead.styled';

const DrawHead = props => {
  return (
    <s.DrawTouch onPress={props.onPress}>
      <s.DrawShape source={require('/assets/markers/Drawer.png')} />
    </s.DrawTouch>
  );
};

export default DrawHead;
