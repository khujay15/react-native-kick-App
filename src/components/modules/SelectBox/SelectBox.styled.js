import styled from 'styled-components';
import { width, height, MARGIN } from 'theme/size';

export const StyledClickBox = styled.TouchableOpacity`
  border-bottom-width: 0.5;
  border-radius: 5;
  border-color: #ddd;
  height: 60;
  margin-bottom: 1;
  margin-left: 1;
  margin-right: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  elevation: 2;
`;

export const ClickBoxInside = styled.View`
  height: 58;

  width: ${width - 60};
  justify-content: center;
  flex-direction: row;
  align-items: center;

  padding-right: 1;
  padding-left: 20;
  padding-top: 1;
  padding-bottom: 1;
`;
