import styled from 'styled-components';
import { width, height } from 'theme/size';
import color from 'theme/color';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const FooterTouch = styled.TouchableOpacity`
  bottom: 0;
  height: 60;
  background-color: ${props => props.color};

  align-items: center;
  justify-content: center;
  font-size: 20;
`;

export const Dotindicator = styled.View`
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.2);

  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${props => props.color};
  margin-left: 10;
  margin-left: 10;
`;
