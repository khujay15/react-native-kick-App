import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const SelectBox = styled.TouchableOpacity`
  margin-left: 1;
  margin-right: 1;
  margin-top: 20;
  border-width: 0.5;
  border-bottom-width: 0.5;
  border-radius: 5;
  border-color: #ddd;
  elevation: 1;
  height: 60;
  justify-content: center;
  margin-bottom: 1;
`;

export const SelectBoxInside = styled.View`
  background-color: white;
  height: 58;

  justify-content: center;
  flex-direction: row;
  align-items: center;

  padding-right: 12;
  padding-left: 12;
`;

export const ErrorText = styled.Text`
  margin-left: auto;
  color: ${color.oboon};
  font-size: 13;
`;
