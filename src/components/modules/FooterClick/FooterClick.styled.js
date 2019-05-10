import styled from 'styled-components';
import { width, height } from 'theme/size';

export const FooterTouch = styled.TouchableOpacity`
  bottom: 0;
  width: ${width};
  height: 68;
  background-color: ${props => props.color};

  align-items: center;
  justify-content: center;
  font-size: 20;
`;
