import styled from 'styled-components';
import { width, height } from 'theme/size';
import color from 'theme/color';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const InputView = styled.View`
  flex: 1;
  margin-left: 24;
  margin-right: 24;
  margin-top: 60;
`;

export const PopupView = styled.View`
  
  align-items: center;
  background-color: white;
  border-radius: 5;
  border-color: #c0c0c0;
  border-width: 1;
  margin-left: 24;
  margin-right: 24;
  height: 400;
  width: ${width * 0.85};
  elevation: 3;
  margin-top: 120;
`;

export const exit = styled.TouchableOpacity`
  width: 50;
  height: 40;
  margin-top: 40;
  margin-left: ${width - 48};
  background-color: black;
`;

export const Digit = styled.TextInput`
  top: ${height * 0.15};
  margin-left: 14;
  margin-right: 14;
  width: 60;
  height: 80;
  border-bottom-width: 1;

  font-size: 60;
  text-align: center;
`;

export const FooterTouch = styled.TouchableOpacity`
  bottom: 0;
  width: ${width * 0.85};
  height: 60;
  background-color: ${color.oboon};
  align-items: center;
  justify-content: center;
  font-size: 20;
`;

export const FooterClick = props => {
  return (
    <FooterTouch {...props}>
      <Text style={{ color: 'white', fontSize: 20 }}>{props.text}</Text>
    </FooterTouch>
  );
};

