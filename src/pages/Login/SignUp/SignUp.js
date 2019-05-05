import React from 'react';
import { TextInput, SafeAreaView } from 'react-native';
import Arrow from '/components/modules/Arrow';
import { SignUpMainView, InnerText, Line, ErrorText } from './SignUp.styled';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import InputBox from 'components/modules/InputBox';
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
        <ThemeText style={{ marginTop: 60 }}>회원가입</ThemeText>
        <InnerText>회원가입을 위해 아래 정보를 입력해주세요</InnerText>
        <SignUpMainView>
          <InputBox
            onChangeText={this.handleName}
            placeholder="   이름을 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            autoFocus
          />

          {this.state.IsError ? (
            <ErrorText> 잘못된 이메일 형식입니다</ErrorText>
          ) : null}

          <InputBox
            onChangeText={this.handleEmail}
            placeholder="   이메일 주소를 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            toggle={this.state.IsError}
            autoFocus
          />

          <InputBox
            onChangeText={this.handlePassword}
            placeholder="   비밀번호를 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
          />

          <InputBox
            onChangeText={this.handlePasswordCheck}
            placeholder="   비밀번호를 확인해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            toggle={
              this.state.IsPasswordError &&
              this.state.IsPasswordInput === color.oboon
            }
          />

          {this.state.IsPasswordError &&
          this.state.IsPasswordInput === color.oboon ? (
            <ErrorText> 비밀번호가 다릅니다</ErrorText>
          ) : null}
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
