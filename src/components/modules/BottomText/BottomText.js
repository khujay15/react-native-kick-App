import React from 'react';
import * as b from './BottomText.styled';

const BottomText = props => {
  return (
    <b.BottomText onPress={props.onPress}>
      <b.InText>{props.Text}</b.InText>
    </b.BottomText>
  );
};

export default BottomText;
