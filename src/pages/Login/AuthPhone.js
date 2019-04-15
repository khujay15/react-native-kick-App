import React from 'react';
import { TextInput } from 'react-native';
import Arrow from '/components/modules/Arrow';
import { PhoneMainView, InnerText, Line, ErrorText } from './AuthPhone.styled';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import BottomText from '/components/modules/BottomText';
import NextPageArrow from '/components/modules/NextPageArrow';

export class AuthPhone extends React.Component {
  state = {
    IsError: false,
    IsPhoneInput: 'grey',
  };

  handlePhone = TypedText => {
    const regExp = /^[0-9]{9,20}$/;
    if (TypedText.match(regExp) != null) {
      this.setState({
        IsError: false,
      });
    } else {
      this.setState({ IsError: true, IsPhoneInput: color.oboon });
    }
  };

  render() {
    return (
      <>
        <Arrow onPress={() => this.props.navigation.goBack()} />
        <ThemeText>전화번호 인증하기</ThemeText>

        <PhoneMainView>
          <InnerText>휴대폰 번호</InnerText>
          {this.state.IsError ? (
            <ErrorText> 잘못된 번호 형식입니다.('-'은 제외해주세요)</ErrorText>
          ) : null}

          <TextInput keyboardType="numeric" onChangeText={this.handlePhone} />

          <Line borderBottomColor={this.state.IsPhoneInput} />
        </PhoneMainView>

        <BottomText
          onPress={() => console.log('BottomText clicked')}
          Text={'인증번호 재전송'}
        />
        <NextPageArrow
          onPress={() => console.log('NextPageArrow Clicked')}
          color={!this.state.IsError ? color.oboon : 'grey'}
        />
      </>
    );
  }
}
