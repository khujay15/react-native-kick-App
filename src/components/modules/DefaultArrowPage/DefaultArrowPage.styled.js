import styled from 'styled-components';

import { width, height } from 'theme/size';

export const ThemeText = styled.Text`
  margin-left: 30;
  margin-top: ${props => 30 + props.marginTop};
  font-size: 22;
  margin-bottom: ${props => (props.greyText ? 10 : 60)};
`;

export const arrowImage = styled.Image`
  width: 10;
  height: 20;
`;

export const arrowTouch = styled.TouchableOpacity`
  margin-top: 40;
  margin-left: 30;
  /* left: 30;
  top: 40; */
`;
