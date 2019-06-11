import styled from 'styled-components';
import { width, height } from 'theme/size';
import color from 'theme/color';
import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

export const PopupView = styled.View`
  position: absolute;
  align-items: center;
  background-color: white;
  border-radius: 5;
  border-color: #c0c0c0;
  border-width: 1;
  margin-left: 30;
  margin-right: 24;
  height: 400;
`;

export const FooterTouch = styled.TouchableOpacity`
  bottom: 0;
  width: ${width * 0.85};
  height: 54;
  background-color: ${color.oboon};
  align-items: center;
  justify-content: center;
  font-size: 20;
  border-bottom-left-radius: 5;
  border-bottom-right-radius: 5;
`;

export const FooterClick = props => {
  return (
    <FooterTouch {...props}>
      <Text style={{ color: 'white', fontSize: 20 }}>{props.text}</Text>
    </FooterTouch>
  );
};
