import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const LentButton = styled.TouchableOpacity`
  background-color: #ffffff;
  position: absolute;
  bottom: 30;

  height: 50;
  justify-content: center;
  align-items: center;

  width: ${width * 0.85};
`;
