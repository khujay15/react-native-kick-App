import styled from 'styled-components';
import { height } from 'theme/size';

export const arrowShape = styled.Image`
  width: 10;
  height: 20;
`;

export const arrowTouch = styled.TouchableOpacity`
  position: absolute;
  left: 24;
  top: ${height * 0.055};
  width: 50;
  height: 40;
`;
