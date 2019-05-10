import styled from 'styled-components';
import { height } from 'theme/size';
import color from 'theme/color';

export const EmailMainView = styled.ScrollView`
  margin-top: 50;
  margin-left: 24;
  margin-right: 24;
`;
export const InnerText = styled.Text`
  margin-bottom: 10;
  color: grey;
`;

// export const Line = styled.View`
//   border-bottom-width: 1;
//   margin-bottom: 20;
// `;
export const UnderLineText = styled.Text`
  text-decoration-line: underline;
  color: 'rgb(112, 112, 112)';
  margin-left: auto;
`;
export const UnderLineBottomText = styled.Text`
  text-decoration-line: underline;
  color: 'rgb(112, 112, 112)';
  position: absolute;
  margin-left: 24;
  margin-bottom: 30;
  bottom: 100;
`;
export const ErrorText = styled.Text`
  margin-right: auto;
  color: ${color.oboon};
  font-size: 13;
`;
