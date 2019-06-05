import styled from 'styled-components';
import { width } from 'theme/size';

export const SelectBox = styled.TouchableOpacity`
  margin-left: 24;
  margin-right: 24;
  margin-top: 10;

  border-radius: 5;
  border-color: #ddd;

  height: 60;
  justify-content: center;
  margin-bottom: 1;
`;

export const SelectBoxInside = styled.View`
  height: 58;

  width: ${width - 48};
  justify-content: center;
  flex-direction: row;
  align-items: center;

  padding-right: 1;
  padding-left: 20;
  padding-top: 1;
  padding-bottom: 1;
`;

export const SelectBoxOutside = styled.TouchableOpacity`
  margin-right: 24;
  margin-left: 24;
  margin-bottom: 20;
`;
