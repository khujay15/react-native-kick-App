import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const ModalView = styled.View`
  position: absolute;
  /* top: ${props => (props.isLent ? 190 : 120)}; */
  top: ${props => (props.isLent ? 90 : 20)};
  margin-left: 30;
  margin-right: 30;
  height: 60;
  width: ${width - 60};
  border-radius: 5;
  background-color: white;
  justify-content: center;
  elevation: 4;
`;

export const InnerView = styled.View`
  margin-left: 12;
  margin-right: 14;
  height: 60;
  flex-direction: row;
  align-items: center;
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
