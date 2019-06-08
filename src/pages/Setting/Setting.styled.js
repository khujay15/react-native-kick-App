import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const SelectBoxInside = styled.View`
  background-color: white;
  height: 58;
  width: ${width - 48};
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
