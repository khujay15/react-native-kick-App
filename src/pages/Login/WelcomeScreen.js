import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import RNKakaoLogins from 'react-native-kakao-logins';
import { EmailLogin } from './EmailLogin';

import {
  MainLogo,
  KakaoLoginTouch,
  GoogleLoginTouch,
  InnerImage,
  InnerText,
  BottomView,
  BottomText,
} from './WelcomScreen.styled';

export class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKakaoLogging: false,
      token: 'token has not fetched',
      id: '',
      password: '',
    };
  }

  // 로그인 후 내 프로필 가져오기.
  getProfile() {
    console.log('getKakaoProfile');
    RNKakaoLogins.getProfile((err, result) => {
      if (err) {
        console.log(err.toString());
        return;
      }
      console.log(result);
    });
  }

  kakaoLogin() {
    console.log('   kakaoLogin   ');
    RNKakaoLogins.login((err, result) => {
      if (err) {
        console.log(err.toString());
        return;
      }
      console.log(result);

      if (result.token) {
        RNKakaoLogins.getProfile((err, result) => {
          if (err) {
            console.log(err.toString());
            return;
          }

          console.log(result);
          this.props.afterLogin(result['nickname']);
        });

        //this.setState({ isKakaoLogging: true });
        // can't perform a react state update on an unmounted component
        // componentDidMount() 에서 처리
      }
    });
  }

  kakaoLogout() {
    console.log('   kakaoLogout   ');
    RNKakaoLogins.logout((err, result) => {
      if (err) {
        console.log(err.toString());
        return;
      }
      console.log(result);
    });
  }

  render() {
    return (
      <>
        <MainLogo />
        <GoogleLoginTouch>
          <InnerImage src={require('/assets/icons/GoogleLogo.png')} />
          <InnerText>구글 계정으로 로그인</InnerText>
        </GoogleLoginTouch>

        <KakaoLoginTouch onPress={() => this.kakaoLogin()}>
          <InnerImage src={require('/assets/icons/KakaoLogo.png')} />
          <InnerText>카카오톡 계정으로 로그인</InnerText>
        </KakaoLoginTouch>

        <BottomView>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('emailLogin')}
          >
            <BottomText> 이메일로 로그인 |</BottomText>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => console.log('newAccount')}>
            <BottomText> 회원가입</BottomText>
          </TouchableHighlight>
        </BottomView>
      </>
    );
  }
}

// const mapStateToProps = state => ({
//   Name: state.Loginreducer.Name,
// });

// const mapDispatchToProps = dispatch => ({
//   afterLogin: Name => dispatch({ type: 'KAKAO_LOGIN', Name: Name }),
// });

// export const WelcomeScreenContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(WelcomeScreen);
const WelcomeStackNavigator = createStackNavigator(
  {
    login: WelcomeScreen,
    emailLogin: EmailLogin,
  },
  {
    headerMode: 'none',
  },
);

export default WelcomeStackNavigator;
