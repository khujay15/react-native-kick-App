import styled from 'styled-components';
import { width, height } from 'theme/size';

export const DrawShape = styled.Image`
  width: 70;
  height: 70;
`;

export const DrawTouch = styled.TouchableOpacity`
  position: absolute;
  right: ${props => (props.left ? props.left : 30)};
  bottom: ${props => (props.bottom ? props.bottom : 90)};
`;

export const DrawTouchTop = styled.TouchableOpacity`
  position: absolute;
  right: ${props => (props.right ? props.right : 15)};
  top: ${props => (props.top ? height * 0.05 : height * 0.05)};
`;
