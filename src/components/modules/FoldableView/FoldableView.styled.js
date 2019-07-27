import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const StyledBox = styled.TouchableOpacity`
  border-radius: 5;
  border-color: #ddd;
  border-width: 0.3;
  border-top-width: 0;
  border-bottom-width: 0;
  flex-direction: row;
  background-color: white;
`;

export const InnerView = styled.View`
  background-color: white;

  margin-bottom: 1;
  margin-left: 1;
  margin-right: 1;
  width: 99%;
  padding-left: 12;
  padding-right: 12;
  border-radius: 5;
`;

export const ClickView = styled.View`
  border-radius: 5;
  border-color: #ddd;
  border-top-width: 0;
  border-bottom-width: 0;
  flex-direction: row;
  background-color: white;
  width: 99%;
`;

export const TitleView = styled.View`
  flex-direction: row;
  height: 60;
  align-items: center;
  background-color: white;
`;
