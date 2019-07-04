import styled from 'styled-components';
import color from '/theme/color';
import React from 'react';

export const PhoneMainView = styled.View`
  margin-top: 50;
  margin-left: 24;
  margin-right: 24;
  margin-bottom: 11;
`;

export const Line = styled.View`
  border-bottom-width: 1;
`;

export const ErrorText = styled.Text`

margin-left: auto
color: red;
font-size: 13;
`;

export const InText = styled.Text`
  color: #b1b1b1;
  font-size: 14;
`;
export const PhoneNumberView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 100;
`;

export const PhoneNumber = styled.Text`
  font-size: 14;
  color: ${color.oboon};
  margin-right: 10;
`;

export const PhoneText = props => {
  return (
    <PhoneNumberView>
      <PhoneNumber>{props.Phone}</PhoneNumber>
      <InText> (으)로 전송된 인증번호를 입력해주세요</InText>
    </PhoneNumberView>
  );
};
