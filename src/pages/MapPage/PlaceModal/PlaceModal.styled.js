import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const ModalView = styled.View`
  elevation: 1;
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.2);

  elevation: 1;
  position: absolute;
  top: 120;

  margin-right: 24;
  width: ${width * 0.85};
  height: 62;

  background-color: white;
`;

export const InnerView = styled.View`
  margin-top: 12;
  margin-left: 12;
  margin-right: 14;
`;
export const LocationText = styled.Text`
  font-size: 16;
  font-weight: 200;
`;
export const LocationTextDetail = styled.Text`
  font-size: 14;
  font-weight: 200;
  color: grey;
`;

export const NumberView = styled.View`
  margin-left: auto;
  justify-content: center;
`;

export const NumberText = styled.Text`
  font-size: 16;
  color: ${color.oboon};
  font-weight: 200;
`;
