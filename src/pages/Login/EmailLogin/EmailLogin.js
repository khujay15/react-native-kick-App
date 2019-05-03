import React from 'react';
import { TextInput, SafeAreaView } from 'react-native';
import Arrow from '/components/modules/Arrow';
import InputBox from 'components/modules/InputBox';
import { EmailMainView, InnerText, Line, ErrorText } from './EmailLogin.styled';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import BottomText from '/components/modules/BottomText';
import NextPageArrow from '/components/modules/NextPageArrow';

export default class EmailLogin extends React.Component {
  state = {
    keyboardUp: false,
    IsEmailInput: 'grey',
    Email: '',
    IsPasswordInput: 'grey',
    Password: '',
    IsError: false,
  };

  handleEmail = TypedText => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (TypedText.match(regExp) != null) {
      this.setState({
        Email: TypedText,
        IsEmailInput: '#6352FF',
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Arrow onPress={() => this.props.navigation.goBack()} />
        <ThemeText>이메일로 로그인</ThemeText>

        <EmailMainView>
          <InnerText>이메일 주소</InnerText>
          {this.state.IsError ? (
            <ErrorText> 잘못된 이메일 형식입니다</ErrorText>
          ) : null}

          <InputBox onChangeText={this.handleEmail} autoFocus />
          {/* <TextInput onChangeText={this.handleEmail} autoFocus />
          <Line borderBottomColor={this.state.IsEmailInput} /> */}
          <InnerText>비밀번호</InnerText>
          <InputBox onChangeText={this.handlePassword} />
          {/* 
          <TextInput onChangeText={this.handlePassword} />
          <Line borderBottomColor={this.state.IsPasswordInput} /> */}
        </EmailMainView>

        <BottomText
          onPress={() => console.log('BottomText clicked')}
          Text="비밀번호를 잊으셨나요?"
        />

        <NextPageArrow
          onPress={() =>
            !this.state.IsError &&
            this.state.IsPasswordInput === color.oboon &&
            this.state.IsEmailInput === color.oboon
              ? this.props.navigation.navigate('authphone')
              : null
          }
          color={
            !this.state.IsError &&
            this.state.IsPasswordInput === color.oboon &&
            this.state.IsEmailInput === color.oboon
              ? color.oboon
              : 'grey'
          }
        />
      </SafeAreaView>
    );
  }
}
