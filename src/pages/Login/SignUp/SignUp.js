import React from 'react';
import { KeyboardAvoidingView, View, Platform } from 'react-native';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';
import color from '/theme/color';
import InputBox from 'components/modules/InputBox';

import { networks, setHeader } from 'components/networks';
import CookieManager from 'react-native-cookies';
import SInfo from 'react-native-sensitive-info';
import { connect } from 'react-redux';
import { SignUpMainView, InnerText, Line, ErrorText } from './SignUp.styled';

class SignUp extends React.Component {
  state = {
    IsEmailInput: 'grey',
    Email: '',
    IsPasswordInput: 'grey',
    Password: '',

    IsName: 'grey',
    Name: '',

    PhoneNumber: 'no',
    IsPhoneNumberError: false,

    IsPasswordError: false,
    IsError: false,
    provider: 'local',

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

  handlePhone = TypedText => {
    const regExp = /^[0-9]{9,14}$/;
    if (TypedText.match(regExp) != null) {
      this.setState({
        IsPhoneNumberError: false,
        PhoneNumber: TypedText,
      });
    } else {
      this.setState({
        IsPhoneNumberError: true,
        IsPhoneInput: color.oboon,
      });
    }
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
  };

  handlePasswordCheck = TypedText => {
    if (this.state.Password === TypedText)
      this.setState({ IsPasswordError: false });
    else this.setState({ IsPasswordError: true });
  };

  handleName = TypedText => {
    this.setState({ Name: TypedText, IsName: color.oboon });
  };

  InputCheck = () => {
    return (
      !this.state.IsError &&
      this.state.IsPasswordInput === color.oboon &&
      this.state.IsName == color.oboon &&
      this.state.IsEmailInput == color.oboon &&
      !this.state.IsPasswordError &&
      !this.state.IsPhoneNumberError &&
      this.state.PhoneNumber !== 'no'
    );
  };

  handleFooter = () => {
    const data = JSON.stringify({
      email: this.state.Email,
      phone_num: this.state.PhoneNumber,
      password: this.state.Password,
      name: this.state.Name,
      provider: this.state.provider,
    });
    networks
      .post('/members/join', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        if (res.data.accesstoken) {
          this.setReducerSignUP(res);
          setHeader(res.data.accesstoken);
          SInfo.setItem('AutoToken', `${res.data.accesstoken}`, {});
          this.props.navigation.navigate('tutorial');
        }
      })
      .catch(err =>
        this.setState({ NetworkError: '네트워크 에러가 발생했습니다.' }),
      );
  };

  render() {
    return (
      <DefaultArrowPage
        arrowOnPress={() => this.props.navigation.goBack()}
        themeText="회원가입"
        greyText="회원가입을 위해 아래 정보를 입력해주세요"
        footerOnPress={() => (this.InputCheck() ? this.handleFooter() : null)}
        footerColor={this.InputCheck() ? color.oboon : 'grey'}
        footerText="가입하기"
      >
        <SignUpMainView>
          <View style={{ marginBottom: 10 }}>
            <InputBox
              onChangeText={this.handleName}
              placeholder="   이름을 입력해주세요"
              placeholderTextColor="rgb(106, 106, 106)"
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <InputBox
              onChangeText={this.handleEmail}
              placeholder="   이메일 주소를 입력해주세요"
              placeholderTextColor="rgb(106, 106, 106)"
              toggle={this.state.IsError}
            />
            {this.state.IsError ? (
              <ErrorText> 잘못된 이메일 형식입니다</ErrorText>
            ) : null}
          </View>
          <View style={{ marginBottom: 10 }}>
            <InputBox
              onChangeText={this.handlePassword}
              placeholder="   비밀번호를 입력해주세요"
              placeholderTextColor="rgb(106, 106, 106)"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
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
          </View>
          <InputBox
            keyboardType="numeric"
            onChangeText={this.handlePhone}
            placeholder="   전화번호를 입력해주세요"
            placeholderTextColor="rgb(106, 106, 106)"
            toggle={this.state.IsPhoneNumberError}
          />
          {this.state.IsPhoneNumberError && (
            <ErrorText>잘못된 번호 형식입니다.('-'은 제외해주세요)</ErrorText>
          )}
          {this.state.NetworkError && (
            <ErrorText>{this.state.NetworkError}</ErrorText>
          )}
        </SignUpMainView>
      </DefaultArrowPage>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Email: state.LoginReducer.Email,
  Status: state.LoginReducer.Status,

  point: state.LentReducer.point,
});

const mapDispatchToProps = dispatch => ({
  member: (name, email, status) =>
    dispatch({ type: 'MEMBERINFO', Name: name, Email: email, Status: status }),
  updatePoint: LeftPoint =>
    dispatch({ type: 'UPDATE_POINT', point: LeftPoint }),
});

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

export default SignUpContainer;
