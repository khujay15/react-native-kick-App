import styled from 'styled-components';
import { width, height } from 'theme/size';
import color from 'theme/color';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

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
