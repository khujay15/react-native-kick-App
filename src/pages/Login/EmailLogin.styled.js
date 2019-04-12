import styled from 'styled-components';
import { Image, StyleSheet, Dimensions } from 'react-native';

import React from 'react';

export const EmailMainView = styled.View`
  margin-top: 50;
  margin-left: 24;
  margin-right: 24;
  margin-bottom: 11;
`;
export const InnerText = styled.Text`
  margin-bottom: 20;
  color: grey;
  margin-top: 30;
`;

export const Line = styled.View`
  border-bottom-width: 1;
`;

export const ArrowTouch = styled.TouchableOpacity`
  position: absolute;
  left: 24;
  top: 40;
`;
