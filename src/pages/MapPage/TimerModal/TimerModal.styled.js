import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const TimeModalView = styled.View`
  position: absolute;

  top: 120;
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 20;
  width: ${width - 60};
  height: 62;
  border-radius: 5;
  elevation: 4;
  background-color: white;
`;

export const TimeInnerView = styled.View`
  margin-top: 12;
  margin-left: 12;
  margin-right: 14;
  flex-direction: row;
`;

export const TimeView = styled.View`
  margin-left: auto;
  justify-content: center;
`;
