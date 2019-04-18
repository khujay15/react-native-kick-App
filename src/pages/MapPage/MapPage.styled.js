import styled from 'styled-components';
import { width } from '/theme/size';

export const MainText = styled.Text`
  color: red;
`;

export const MapButton = styled.TouchableOpacity`
  width: ${width * 0.3};
  height: 30;
  justify-content: center;
  align-items: center;
  background-color: #dcdcdc;
`;

export const MapButtonView = styled.View`
  flex-direction: row;
  bottom: 10;
`;
