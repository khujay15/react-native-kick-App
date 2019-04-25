import React from 'react';
import { TextInput, SafeAreaView, Text, View } from 'react-native';
import Arrow from '/components/modules/Arrow';
import {
  PhoneMainView,
  InnerText,
  Line,
  ErrorText,
  SubText,
} from './AuthEmail.styled';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import NextPageArrow from '/components/modules/NextPageArrow';

export default class AuthEmail extends React.Component {
  state = {
    IsEmailInput: 'grey',
    Email: '',
    IsError: false,
  };

  handleEmail = TypedText => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (TypedText.match(regExp) != null) {
      this.setState({
        Email: TypedText,
        IsEmailInput: color.oboon,
        IsError: false,
      });
    } else {
      this.setState({ IsError: true });
    }
  };

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <Arrow onPress={() => this.props.navigation.goBack()} />
          <ThemeText>이메일 인증하기</ThemeText>

          <PhoneMainView>
            <SubText> 고객님의 이메일 주소를 입력해주세요</SubText>

            <InnerText>이메일 주소</InnerText>
            {this.state.IsError ? (
              <ErrorText> 잘못된 이메일 형식입니다.</ErrorText>
            ) : null}

            <TextInput onChangeText={this.handleEmail} autoFocus={true} />

            <Line borderBottomColor={this.state.IsEmailInput} />
          </PhoneMainView>
        </SafeAreaView>
        <NextPageArrow
          onPress={() =>
            !this.state.IsError && this.state.IsEmailInput == color.oboon
              ? this.props.navigation.navigate('authphone')
              : null
          }
          color={
            !this.state.IsError && this.state.IsEmailInput == color.oboon
              ? color.oboon
              : 'grey'
          }
        />
      </>
    );
  }
}
