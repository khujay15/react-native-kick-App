import styled from 'styled-components';
import color from 'theme/color';

export const SignUpMainView = styled.ScrollView`
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 11;
`;
export const InnerText = styled.Text`
  margin-left: 24;

  color: grey;
  margin-top: 20;
`;

export const Line = styled.View`
  border-bottom-width: 1;
`;

export const ErrorText = styled.Text`
  margin-right: auto;
  color: ${color.oboon};
  font-size: 13;
`;
