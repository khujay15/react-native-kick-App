import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Arrow from '/components/modules/Arrow';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import {
  EmailMainView,
  UnderLineText,
  ErrorText,
  UnderLineBottomText,
} from './EmailLogin.styled';
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
      <View style={{ flex: 1 }}>
        <Arrow onPress={() => this.props.navigation.goBack()} />
        <ThemeText>이메일로 로그인(베타테스트 시 미사용)</ThemeText>

        <EmailMainView>
          <InputBox
            onChangeText={this.handleEmail}
            placeholder="   이메일 주소를 입력해주세요"
            toggle={this.state.IsError}
          />
          {this.state.IsError ? (
            <ErrorText> 잘못된 이메일 형식입니다</ErrorText>
          ) : null}

          {/* <TextInput onChangeText={this.handleEmail} autoFocus />
          <Line borderBottomColor={this.state.IsEmailInput} /> */}

          <InputBox
            onChangeText={this.handlePassword}
            placeholder="   비밀번호를 입력해주세요"
          />

          {/* 
          <TextInput onChangeText={this.handlePassword} />
          <Line borderBottomColor={this.state.IsPasswordInput} /> */}
          <UnderLineText onPress={() => console.log('BottomText clicked')}>
            아이디/비밀번호 찾기
          </UnderLineText>
        </EmailMainView>

        {/* 
        <BottomText
          onPress={() => console.log('BottomText clicked')}
          Text="비밀번호를 잊으셨나요?"
        /> */}

        {/* <NextPageArrow
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
        /> */}

        <FooterClick
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
          text="로그인하기"
        />
      </View>
    );
  }
}
