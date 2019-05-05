import styled from 'styled-components';
import { width } from 'theme/size';

export const FooterTouch = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: ${width};
  height: 68;
  background-color: ${props => props.color};

  align-items: center;
  justify-content: center;
  font-size: 20;
`;
