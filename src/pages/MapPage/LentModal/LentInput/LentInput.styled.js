import styled from 'styled-components';
import { width, height } from '/theme/size';

export const LentView = styled.SafeAreaView`
  flex: 1;

  margin-left: 12;
  flex-direction: row;
`;
export const exit = styled.TouchableOpacity`
  width: 50;
  height: 40;
  margin-top: 40;
  margin-left: ${width - 48};
  background-color: black;
`;

export const Digit = styled.TextInput`
  top: ${height * 0.45};
  margin-left: 12;
  margin-right: 16;
  width: 60;
  height: 80;
  border-bottom-width: 1;
  border-top-width: 1;
  font-size: 60;
  text-align: center;
`;
