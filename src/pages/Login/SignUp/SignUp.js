import React from 'react';
import { TextInput, SafeAreaView } from 'react-native';
import Arrow from '/components/modules/Arrow';
import { SignUpMainView, InnerText, Line, ErrorText } from './SignUp.styled';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import BottomText from '/components/modules/BottomText';
import NextPageArrow from '/components/modules/NextPageArrow';

export default class SignUp extends React.Component {
  state = {
    IsEmailInput: 'grey',
    Email: '',
    IsPasswordInput: 'grey',
    Password: '',

    IsName: 'grey',
    Name: '',

    IsPasswordError: true,
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

  handlePassword = TypedText => {
    this.setState({ Password: TypedText, IsPasswordInput: color.oboon });
    console.log(this.state);
  };

  handlePasswordCheck = TypedText => {
    if (this.state.Password === TypedText)
      this.setState({ IsPasswordError: false });
    else this.setState({ IsPasswordError: true });
  };

  handleName = TypedText => {
    this.setState({ Name: TypedText, IsName: color.oboon });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Arrow onPress={() => this.props.navigation.goBack()} />
        <ThemeText>이메일로 로그인</ThemeText>

        <SignUpMainView>
          <InnerText>이메일 주소</InnerText>
          {this.state.IsError ? (
            <ErrorText> 잘못된 이메일 형식입니다</ErrorText>
          ) : null}
          <TextInput onChangeText={this.handleEmail} autoFocus={true} />
          <Line borderBottomColor={this.state.IsEmailInput} />

          <InnerText>이름</InnerText>
          <TextInput onChangeText={this.handleName} />
          <Line borderBottomColor={this.state.IsName} />

          <InnerText>비밀번호</InnerText>
          <TextInput onChangeText={this.handlePassword} />
          <Line borderBottomColor={this.state.IsPasswordInput} />

          <InnerText>비밀번호 확인</InnerText>
          {this.state.IsPasswordError &&
          this.state.IsPasswordInput === color.oboon ? (
            <ErrorText> 비밀번호가 다릅니다</ErrorText>
          ) : null}
          <TextInput onChangeText={this.handlePasswordCheck} />
          <Line borderBottomColor={this.state.IsPasswordInput} />
        </SignUpMainView>

        <NextPageArrow
          onPress={() =>
            !this.state.IsError &&
            this.state.IsPasswordInput === color.oboon &&
            this.state.IsName == color.oboon &&
            !this.state.IsPasswordError
              ? this.props.navigation.navigate('authphone')
              : null
          }
          color={
            !this.state.IsError &&
            this.state.IsPasswordInput === color.oboon &&
            this.state.IsName == color.oboon &&
            !this.state.IsPasswordError
              ? color.oboon
              : 'grey'
          }
        />
      </SafeAreaView>
    );
  }
}
