import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const LentButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: ${width};
  height: 60;
  background-color: ${color.oboon};

  align-items: center;
  justify-content: center;
  font-size: 20;
`;
