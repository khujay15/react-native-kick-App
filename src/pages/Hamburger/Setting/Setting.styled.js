import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const ClickBoxInside = styled.View`
  height: 58;

  width: ${width - 60};
  justify-content: center;
  flex-direction: row;
  align-items: center;

  padding-right: 1;
  padding-left: 20;
  padding-top: 1;
  padding-bottom: 1;
`;

export const ErrorText = styled.Text`
  margin-left: 30;
  color: ${color.oboon};
`;
