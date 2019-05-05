import React from 'react';
import { Text } from 'react-native';
import * as s from './FooterClick.styled';

const FooterClick = props => {
  return (
    <s.FooterTouch {...props} color={props.color}>
      <Text style={{ color: 'white', fontSize: 20 }}>{props.text}</Text>
    </s.FooterTouch>
  );
};

export default FooterClick;
