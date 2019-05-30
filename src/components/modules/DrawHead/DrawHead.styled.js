import styled from 'styled-components';
import { width, height } from 'theme/size';

export const DrawShape = styled.Image`
  width: 50;
  height: 50;
`;

export const DrawTouch = styled.TouchableOpacity`
  position: absolute;
  left: ${props => (props.left ? props.left : 15)};
  top: ${props => (props.top ? props.top : height * 0.05)};
`;
