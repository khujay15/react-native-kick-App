import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const SignUpMainView = styled.ScrollView`
  margin-left: 24;
  margin-right: 24;
  margin-bottom: 11;
`;
export const InnerText = styled.Text`
  margin-left: 24;

  color: grey;
  margin-top: 20;
`;
export const SkipText = styled.TouchableOpacity`
  position: absolute;
  top: ${height * 0.06};
  right: 24;
  height: 40;
`;

export const BottomText = styled.Text`
  font-size: 16;
  color: rgb(106, 106, 106);
`;
