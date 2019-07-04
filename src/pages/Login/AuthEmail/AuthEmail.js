import React from 'react';
import { TextInput, SafeAreaView, Text, View } from 'react-native';
import Arrow from '/components/modules/Arrow';
import InputBox from 'components/modules/InputBox';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';
import {connect} from 'react-redux';
import { networks ,setHeader} from 'components/networks';
import { PhoneMainView, ErrorText, SubText } from './AuthEmail.styled';
import ThemeText from '/components/modules/ThemeText';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import color from 'theme/color';

class AuthEmail extends React.Component {
  state = {
    Email: '',
    Name: '',
    
    IsEmailError: false,
    ErrorText: false,
  };


  setReducer = res => {
    console.log(res);
    const { status } = res.data.member;
    
    const {kickboard} = res.data.member;
    const {name} = res.data.member;
    const {email} = res.data.member;
    const {point} = res.data.member;
    this.props.updatePoint(point);

    if(kickboard) {
      const LentTime = new Date(kickboard["rent_date"]);
      this.props.member(name,email,status);
      this.props.aleadyLent(LentTime,kickboard["kick_serial_number"]);
      this.props.navigation.navigate('mappage');
    }
    else{
      if (status === 0 || status === '0' || status === 4 || status === '4' || status === 6|| status ==='6') {
       
        this.props.member(name,email,status);
      } 
      else if (status === 3 || status === '3'|| status === 7 || status === '7') {
        this.props.afterGOOGLELogin(name, email, this.state.token);
        this.props.hasPhone();
      }
      else if (status === 5 || status === '5') {
        this.props.afterGOOGLELogin(name, email, this.state.token);
      }
      else if( status === 1 || status ==='1') {
      ///탈퇴
    }
  }
  };

  InputCheck =() => {
    return (this.state.Email !==''  && !this.state.IsEmailError );
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


  handleName = TypedText => {
    this.setState({ Name: TypedText, IsName: color.oboon });
  };

  

  KakaoLogin = () => {
  
    if (this.props.Token !== 'NO-TOKEN') {
      console.log(this.props.Token);
      const data = JSON.stringify({
        email : this.state.Email,
        accessToken: this.props.Token,
      });
    

      axios
      .post('https://api.oboonmobility.com/v0/members/login.kakao', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        if (res.data.accesstoken) {

          console.log(res.data.accesstoken);
          setHeader(res.data.accesstoken);
          this.setReducer(res);
          SInfo.setItem('AutoToken',`${res.data.accesstoken}`, {});
          this.props.navigation.navigate('mappage');
        }
      })
      .catch(err => {
        console.log(err.response);
        this.setState({ErrorText: '네트워크에 문제가 있습니다. 앱을 다시 실행해주세요'})
      });
    }
  };

  render() {
    return (
      <>
        <DefaultArrowPage
          arrowOnPress={() => this.props.navigation.goBack()}
          themeText="등록하기"
          greyText="고객님의 이메일 주소와 이름를 입력해주세요"
          footerOnPress={() => this.InputCheck() ? this.KakaoLogin(): null}
          footerColor={this.InputCheck() ? color.oboon : 'grey'}
          footerText="등록하기"
        >
         

          <PhoneMainView>
            <InputBox
              placeholder="이메일 주소를 입력해주세요"
              onChangeText={this.handleEmail}
              toggle={this.state.IsEmailError}
            />
            {this.state.IsEmailError ? (
              <ErrorText> 잘못된 이메일 형식입니다.</ErrorText>
            ) : null}
             {this.state.ErrorText ? (
              <ErrorText> {this.state.ErrorText}</ErrorText>
            ) : null}
          

          </PhoneMainView>
          </DefaultArrowPage>

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

  aleadyLent: (preSecond,kickboard_serial ) =>
    dispatch({ type: 'ALEADY_LENT', preSecond, kickboard_serial }),

  member: (name, email, status) => 
  dispatch({ type: 'MEMBERINFO',
  Name: name,
  Email: email, 
  Status: status,
  }),
  updatePoint: (LeftPoint) => dispatch({type: 'UPDATE_POINT', point: LeftPoint}),

  afterGOOGLELogin: (nickname, email, token) =>
    dispatch({
      type: 'GOOGLE_LOGIN',
      Name: nickname,
      Email: email,
      Token: token,  
    }),
  afterKAKAOLogin: (nickname, token) =>
    dispatch({ type: 'KAKAO_LOGIN', Name: nickname, Token: token }),

  hasLicense: () => dispatch({ type: 'LICENSE' }),
  hasPhone: () => dispatch({ type: 'PHONE' }),
});

const AuthEmailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthEmail);

export default AuthEmailContainer;
