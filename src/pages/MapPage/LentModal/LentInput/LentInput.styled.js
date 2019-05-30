import styled from 'styled-components';
import { width, height } from 'theme/size';
import color from 'theme/color';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const LentView = styled.View`
  flex: 1;
  margin-left: 24;
  margin-right: 24;
  margin-top: 60;
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

export const ExitMark = props => {
  return (
    <TouchableOpacity
      style={{
        marginLeft: 'auto',
        width: 40,
        height: 40,
      }}
      {...props}
    >
      <Text
        style={{
          marginTop: 10,

          fontSize: 25,
          fontWeight: '200',
        }}
      >
        X
      </Text>
    </TouchableOpacity>
  );
};
