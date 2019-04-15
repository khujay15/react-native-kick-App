import styled from 'styled-components';

export const arrowShape = styled.Image`
  width: 15;
  height: 15;
`;

export const arrowTouch = styled.TouchableOpacity`
  position: absolute;
  right: 24;
  bottom: 20;

  border-width: 1;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;

  width: 60;
  height: 60;
  border-radius: 30;
  background-color: ${props => props.color};
`;
