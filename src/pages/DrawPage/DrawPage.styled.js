import styled from 'styled-components';
import color from '/theme/color';
import React from 'react';

export const NameView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 50;
`;
export const NameText = styled.Text`
  color: ${color.oboon};
  font-size: 20;
  font-weight: bold;
`;

export const Nim = styled.Text`
  color: grey;
  font-size: 20;
  margin-left: 20;
`;

export const DrawView = styled.SafeAreaView`
  left: 24;
`;

export const DrawArrowShape = styled.Image`
  width: 15;
  height: 15;
`;

export const DrawArrowTouch = styled.TouchableOpacity`
  top: 40;
  margin-bottom: 100;
  width: 40;
  height: 40;
`;

export const NavItemView = styled.View`
  flex-direction: row;
  margin-right: 24;
`;

export const NavImage = styled.Image`
  margin-right: 24;
  margin-left: auto;
`;
export const NavItemText = styled.Text`
  color: #6a6a6a;
  font-size: 14;
`;
