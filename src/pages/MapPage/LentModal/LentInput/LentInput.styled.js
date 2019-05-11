import styled from 'styled-components';
import { width, height } from '/theme/size';

export const LentView = styled.View`
  flex: 1;
  margin-left: 24;
  margin-right: 24;
`;
export const exit = styled.TouchableOpacity`
  width: 50;
  height: 40;
  margin-top: 40;
  margin-left: ${width - 48};
  background-color: black;
`;

export const Digit = styled.TextInput`
  top: ${height * 0.15};
  margin-left: 14;
  margin-right: 14;
  width: 60;
  height: 80;
  border-bottom-width: 1;

  font-size: 60;
  text-align: center;
`;
