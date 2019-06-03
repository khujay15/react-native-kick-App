import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const TimeModalView = styled.View`
  position: absolute;
  elevation: 1;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.2);

  elevation: 1;

  top: 190;
  margin-left: 30;
  margin-right: 30;
  width: ${width - 60};
  height: 62;

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
