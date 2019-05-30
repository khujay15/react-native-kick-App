import styled from 'styled-components';
import color from '/theme/color';
import React from 'react';

export const NameView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10;
`;
export const NameText = styled.Text`
  color: ${color.oboon};
  font-size: 20;
  font-weight: bold;
`;
export const EmailText = styled.Text`
  color: ${color.grey};
  font-size: 15;
  margin-bottom: 20;
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
  margin-bottom: 60;
  width: 40;
  height: 40;
`;

export const NavItemView = styled.View`
  flex-direction: row;
  margin-right: 24;
  margin-bottom: 14;
`;

export const NavImage = styled.Image`
  margin-right: 24;
  margin-left: auto;
`;
export const NavItemText = styled.Text`
  font-size: 16;
`;

export const Line = styled.View`
  border-bottom-width: 1;
  border-bottom-color: grey;
  margin-right: 48;
  margin-bottom: 40;
  margin-top: 40;
`;
export const Circle = styled.TouchableOpacity`
  elevation: 1;
  border-width: 0.3;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;

  width: 60;
  height: 60;
  border-radius: 30;
`;

export const InnerCirCle = styled.View`
  width: 60;
  height: 60;
  border-radius: 30;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
