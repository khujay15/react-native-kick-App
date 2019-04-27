import styled from 'styled-components';
import color from '/theme/color';
import React from 'react';

export const ModalClick = styled.View`
  flex: 1;
  background-color: white;

  margin-right: 24;
`;

export const MainView = styled.ScrollView`
  margin-left: 24;
`;
export const MainText = styled.Text`
  margin-bottom: 65;
  font-weight: bold;
  font-size: 22;
`;

export const PurpleLine = styled.View`
  border-bottom-width: 1;
  border-bottom-color: ${color.oboon};
  margin-top: 10;
  margin-bottom: 25;
`;

export const ZonePhoto = styled.Image`
  width: 300;
  height: 100;
  margin-bottom: 30;
`;

export const SubText = styled.Text`
  font-size: 16;
  margin-bottom: 13;
  color: grey;
`;
export const GrayLine = styled.View`
  border-bottom-width: 1;
  border-bottom-color: gray;
  margin-top: 10;
  margin-bottom: 20;
`;

export const Shape = styled.Image`
  width: 15;
  height: 15;
`;

export const Touch = styled.TouchableOpacity`
  margin-left: 24;
  margin-top: 40;
  width: 40;
  height: 40;
`;

export const Arrow = props => {
  return (
    <Touch onPress={props.onPress}>
      <Shape source={require('/assets/icons/ArrowLogo.png')} />
    </Touch>
  );
};
