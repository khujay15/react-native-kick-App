import React from 'react';
import { KeyboardAvoidingView, View, Platform } from 'react-native';
import Arrow from '/components/modules/Arrow';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import { SignUpMainView, InnerText, Line, ErrorText } from './SignUp.styled';
import { networks,setHeader } from 'components/networks';
import CookieManager from 'react-native-cookies';
import SInfo from 'react-native-sensitive-info';
import { connect } from 'react-redux';

class SignUp extends React.Component {
  state = {
    IsEmailInput: 'grey',
    Email: '',
    IsPasswordInput: 'grey',
    Password: '',

    IsName: 'grey',
    Name: '',

    PhoneNumber : 'no',
    IsPhoneNumberError: false,

    IsPasswordError: false,
    IsError: false,
    provider: 'local',

    NetworkError : false,
  };

  setReducerSignUP = res => {
    console.log(res);
    const { status } = res.data.member;
    const {name} = res.data.member;
    const {email} = res.data.member;
    const {point} = res.data.member;
    this.props.updatePoint(point);
    this.props.member(name,email,status);  
  };
  
  handleFooter = () => {
    const data = JSON.stringify({
      email: this.state.Email,
      phone_num: this.state.PhoneNumber,
      password: this.state.Password,
      name: this.state.Name,
      provider : this.state.provider,
    });
    networks
        .post('https://api.oboonmobility.com/v0/members/join', data, {
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
            SInfo.setItem('AutoToken',`${res.data.oboon_session}`, {});
            this.props.navigation.navigate('tutorial');
         
          }

         
        })
        .catch(err => this.setState({NetworkError : "네트워크 에러가 발생했습니다."}));

  }
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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Arrow onPress={() => this.props.navigation.goBack()} />
        <ThemeText>회원가입</ThemeText>
        <InnerText>회원가입을 위해 아래 정보를 입력해주세요</InnerText>
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
              toggle={
                this.state.IsPhoneNumberError 
              }
              
            />
            {
              this.state.IsPhoneNumberError && (
                <ErrorText>잘못된 번호 형식입니다.('-'은 제외해주세요)</ErrorText>
              )
            }
            {
              this.state.NetworkError && (
                <ErrorText>{this.state.NetworkError}</ErrorText>
              )
            }

            
        </SignUpMainView>

        <FooterClick
          onPress={() =>
            !this.state.IsError &&
            this.state.IsPasswordInput === color.oboon &&
            this.state.IsName == color.oboon &&
            !this.state.IsPasswordError && !this.state.IsPhoneNumberError && this.state.PhoneNumber !=='no'
              ? this.handleFooter()
              : null
          }
          color={
            !this.state.IsError &&
            this.state.IsPasswordInput === color.oboon &&
            this.state.IsName == color.oboon &&
            !this.state.IsPasswordError&& !this.state.IsPhoneNumberError && this.state.PhoneNumber !=='no'
              ? color.oboon
              : 'grey'
          }
          text="가입하기"
        />
      </View>
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
  kickboard_serial : state.LentReducer.kickboard_serial,
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

  aleadyLent: (preSecond,kickboard_serial ) =>
    dispatch({ type: 'ALEADY_LENT', preSecond, kickboard_serial }),

  member: (name, email, status) => 
  dispatch({ type: 'MEMBERINFO',
  Name: name,
  Email: email, 
  Status: status,
  }),
  updatePoint: (LeftPoint) => dispatch({type: 'UPDATE_POINT', point: LeftPoint}),

  hasPhone: () => dispatch({ type: 'PHONE' }),
});

const SignUpContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

export default SignUpContainer;