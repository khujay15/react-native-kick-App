import styled from 'styled-components';
import { width, height } from 'theme/size';
import color from 'theme/color';

export const arrowShape = styled.Image`
  width: 15;
  height: 15;
`;

export const StyledInputBox = styled.TextInput`
  border-width: 0.3;
  border-top-width: 0;
  border-bottom-width: 0;
  border-radius: 5;
  border-color: #ddd;

  background-color: white;
  height: 60;
  align-items: center;
  font-size: 16;
  padding-left: 20;
  elevation: 2;
  color: ${color.oboon};
`;

export const StyledViewBox = styled.View`
  border-width: 0.3;
  border-radius: 5;
  border-color: #ddd;
  border-top-width: 0;
  border-bottom-width: 0;
  background-color: white;
  height: 60;
  align-items: center;
  font-size: 16;
  padding-left: 20;
`;
