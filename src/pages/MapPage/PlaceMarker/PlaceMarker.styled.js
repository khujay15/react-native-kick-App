import styled from 'styled-components';
import color from 'theme/color';

export const MarkerImage = styled.ImageBackground`
  height: 50;
  width: 56;
  align-items: center;
  justify-content: center;
`;

export const MarkerText = styled.Text`
  font-size: 20;
  font-weight: bold;
  color: ${props => (props.select ? 'white' : color.oboon)};
`;