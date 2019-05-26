import React from 'react';
import { TextInput, SafeAreaView, Text, View } from 'react-native';
import Arrow from '/components/modules/Arrow';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import {connect} from 'react-redux';
import { networks ,setHeader} from 'components/networks';
import { PhoneMainView, ErrorText, SubText } from './AuthEmail.styled';
import ThemeText from '/components/modules/ThemeText';
import SInfo from 'react-native-sensitive-info';
import color from 'theme/color';

class AuthEmail extends React.Component {
  state = {
    Email: '',
    Phone: '',
    IsEmailError: false,
    IsPhoneError: false,
  };

  IsOk =() => {
    return (this.state.Email !=='' && this.state.Phone!=='' && !this.state.IsEmailError && !this.state.IsPhoneError);
  }
  handleEmail = TypedText => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (TypedText.match(regExp) != null) {
      this.setState({
        Email: TypedText,
        IsEmailError: false,
      });
    } else {
      this.setState({ IsEmailError: true });
    }
  };

  handlePhone = TypedText => {
    const regExp = /^[0-9]{9,15}$/;
    if (TypedText.match(regExp) != null) {
      this.setState({
        Phone: TypedText,
        IsPhoneError: false,
      });
    } else {
      this.setState({
        IsPhoneError: true,
      });
    }
  };

  KakaoLogin = () => {
  
    if (this.props.Token !== 'NO-TOKEN') {
      const data = JSON.stringify({
        accessToken: this.props.Token,
        name : this.props.Name,
        email : this.props.Email
      });
    

      networks
      .post('https://api.oboonmobility.com/member/login.kakao', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        if (res.data.oboon_session) {

          console.log(res.data.oboon_session);
          setHeader(`oboon_session=${res.data.oboon_session}`);
          this.setReducer(res);
          SInfo.setItem('AutoToken',`${res.data.oboon_session}`, {});
          this.props.navigation.navigate('tutorial');
        }
      })
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <Arrow onPress={() => this.props.navigation.goBack()} />
          <ThemeText>이메일과 핸드폰 인증하기</ThemeText>

          <PhoneMainView>
            <SubText>고객님의 이메일 주소와 핸드폰 번호를 입력해주세요</SubText>

            <InputBox
              placeholder="이메일 주소를 입력해주세요"
              onChangeText={this.handleEmail}
              toggle={this.state.IsEmailError}
            />
            {this.state.IsEmailError ? (
              <ErrorText> 잘못된 이메일 형식입니다.</ErrorText>
            ) : null}

            <InputBox
              keyboardType="numeric"
              onChangeText={this.handlePhone}
              placeholder="핸드폰 번호를 입력해주세요"
              toggle={this.state.IsPhoneError}
            />
            {this.state.IsPhoneError ? (
              <ErrorText>잘못된 번호 형식입니다.('-'은 제외해주세요)</ErrorText>
            ) : null}
          </PhoneMainView>
        </SafeAreaView>
        <FooterClick
          text="시작하기"
          color={this.IsOk() ? color.oboon : color.grey}
          onPress={() => this.IsOk() ? this.KakaoLogin(): null}
        />
      </>
    );
  }
}



const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Email: state.LoginReducer.Email,
  Token: state.LoginReducer.Token,
  License: state.LoginReducer.License,

  Phone: state.LoginReducer.Phone,
  kickboard_serial : state.LentReducer.kickboard_serial,
  preSecond: state.LentReducer.preSecond,
});

const mapDispatchToProps = dispatch => ({
  afterKAKAOLogin: (nickname, token) =>
    dispatch({ type: 'KAKAO_LOGIN', Name: nickname, Token: token }),

  aleadyLent: (preSecond,kickboard_serial ) =>
    dispatch({ type: 'ALEADY_LENT', preSecond, kickboard_serial }),

  hasLicense: () => dispatch({ type: 'LICENSE' }),
  hasPhone: () => dispatch({ type: 'PHONE' }),
});

const AuthEmailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthEmail);

export default AuthEmailContainer;
