import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Arrow from '/components/modules/Arrow';
import InputBox from 'components/modules/InputBox';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';
import FooterClick from 'components/modules/FooterClick';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import { networks, setHeader } from 'components/networks';
import SInfo from 'react-native-sensitive-info';
import CookieManager from 'react-native-cookies';
import { connect } from 'react-redux';
import {
  EmailMainView,
  UnderLineText,
  ErrorText,
  UnderLineBottomText,
} from './EmailLogin.styled';

class EmailLogin extends React.Component {
  state = {
    keyboardUp: false,
    IsEmailInput: 'grey',
    Email: '',
    IsPasswordInput: 'grey',
    Password: '',
    IsError: false,

    NetworkError: false,
  };

  setReducerSignUP = res => {
    const { status } = res.data.member;
    const { name } = res.data.member;
    const { email } = res.data.member;
    const { point } = res.data.member;
    this.props.updatePoint(point);
    this.props.member(name, email, status);
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
  };

  handleFooter = () => {
    const data = JSON.stringify({
      email: this.state.Email,
      password: this.state.Password,
    });
    networks
      .post('/members/login.local', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        if (res.data.oboon_session) {
          CookieManager.clearAll();
          setHeader(`oboon_session=${res.data.oboon_session}`);
          this.setReducerSignUP(res);
          SInfo.setItem('AutoToken', `${res.data.oboon_session}`, {});
          this.props.navigation.navigate('map');
        }
      })
      .catch(err => {
        console.log(err.response);
        this.setState({ NetworkError: err.response.data.msg });
      });
  };

  InputCheck = () => {
    return (
      !this.state.IsError &&
      this.state.Password &&
      this.state.IsEmailInput === color.oboon
    );
  };

  render() {
    return (
      <>
        <DefaultArrowPage
          arrowOnPress={() => this.props.navigation.goBack()}
          themeText="이메일로 로그인"
          footerOnPress={() => (this.InputCheck() ? this.handleFooter() : null)}
          footerColor={this.InputCheck() ? color.oboon : 'grey'}
          footerText="로그인하기"
        >
          <EmailMainView>
            <View style={{ marginBottom: 20 }}>
              <InputBox
                onChangeText={this.handleEmail}
                placeholder="이메일 주소를 입력해주세요"
                toggle={this.state.IsError}
              />
              {this.state.IsError ? (
                <ErrorText> 잘못된 이메일 형식입니다</ErrorText>
              ) : null}
            </View>

            <View style={{ marginBottom: 20 }}>
              <InputBox
                onChangeText={this.handlePassword}
                placeholder="비밀번호를 입력해주세요"
              />
            </View>

            {this.state.NetworkError && (
              <ErrorText>{this.state.NetworkError}</ErrorText>
            )}
          </EmailMainView>
        </DefaultArrowPage>
      </>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Email: state.LoginReducer.Email,
  Token: state.LoginReducer.Token,
  Tutorial: state.LoginReducer.Tutorial,
  License: state.LoginReducer.License,
  Phone: state.LoginReducer.Phone,
  Status: state.LoginReducer.Status,

  point: state.LentReducer.point,
  kickboard_serial: state.LentReducer.kickboard_serial,
  preSecond: state.LentReducer.preSecond,
});

const mapDispatchToProps = dispatch => ({
  afterKAKAOLogin: (nickname, token) =>
    dispatch({ type: 'KAKAO_LOGIN', Name: nickname, Token: token }),

  afterGOOGLELogin: (nickname, email, token) =>
    dispatch({
      type: 'GOOGLE_LOGIN',
      Name: nickname,
      Email: email,
      Token: token,
    }),
  aftertutorial: () => dispatch({ type: 'TUTORIALS' }),

  aleadyLent: (preSecond, kickboard_serial) =>
    dispatch({ type: 'ALEADY_LENT', preSecond, kickboard_serial }),

  member: (name, email, status) =>
    dispatch({ type: 'MEMBERINFO', Name: name, Email: email, Status: status }),
  updatePoint: LeftPoint =>
    dispatch({ type: 'UPDATE_POINT', point: LeftPoint }),

  hasPhone: () => dispatch({ type: 'PHONE' }),
});

const EmailLoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailLogin);

export default EmailLoginContainer;
