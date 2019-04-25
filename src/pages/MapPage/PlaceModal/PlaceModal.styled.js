import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const ModalView = styled.View`
  border-width: 0.5;
  border-radius: 0.5;
  border-color: #ddd;
  border-top-width: 0.5;
  border-bottom-width: 2;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 1;
  elevation: 1;
  position: absolute;
  bottom: 50;

  margin-right: 24;
  width: ${width * 0.85};
  height: 100;

  background-color: white;
`;

export const InnerView = styled.View`
  margin-top: 19;
  margin-left: 14;
  margin-right: 14;
`;
export const LocationText = styled.Text`
  color: ${color.oboon};
  font-size: 16;
`;
export const Line = styled.View`
  margin-top: 10;
  border-bottom-width: 1;
  border-bottom-color: #d6d6d6;
`;

export const ModalClick = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #dcdcdc;
`;
