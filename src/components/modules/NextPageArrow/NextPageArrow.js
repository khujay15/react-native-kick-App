import React from 'react';
import * as n from './NextPageArrow.styled';

const NextPageArrow = props => {
  return (
    <n.arrowTouch onPress={props.onPress} color={props.color}>
      <n.arrowShape source={require('assets/icons/NextPageArrow.png')} />
    </n.arrowTouch>
  );
};

export default NextPageArrow;
