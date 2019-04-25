import React from 'react';
import { Platform, SafeAreaView, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import RNKakaoLogins from 'react-native-kakao-logins';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import SInfo from 'react-native-sensitive-info';
//need min 9.1 ios vesion

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
      autoLoginName: '',
      autoLoginEmail: '',
      googleUser: 'default',
    };
  }
  // Somewhere in your code
  googlesignIn = async () => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      offlineAccess: true,
      // iosClientId:
      //   '140466692410-stfisve8l4u6oonmf1po8i9i7lcuiv0m.apps.googleusercontent.com',
      webClientId:
        Platform.OS === 'ios'
          ? '140466692410-stfisve8l4u6oonmf1po8i9i7lcuiv0m.apps.googleusercontent.com'
          : '140466692410-vcl58o3q8en855so2k34mq9vav58cv4b.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;
      console.log(user);

      const idToken = userInfo['idToken'];
      //const accessToken = userInfo['accessToken']; 토큰을 두개 던져 줌.

      this.props.afterGOOGLELogin(user['name'], user['email'], idToken);
      this.props.navigation.navigate('mappage');
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
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
    if (!this.state.autoLoginName) {
      this.props.navigation.navigate('mappage');
    } else {
      console.log('   kakaoLogin   ');
      RNKakaoLogins.login((err, result) => {
        if (err) {
          console.log(err.toString());
          return;
        }
        console.log(result);

        if (result.token) {
          RNKakaoLogins.getProfile((err, user) => {
            if (err) {
              console.log(err.toString());
              return;
            }
            console.log(user);

            this.props.afterKAKAOLogin(user['nickname'], result['token']);
            this.props.navigation.navigate('authemail');
          });
        }
      });
    }
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

  componentDidMount() {
    SInfo.getItem('Name', {}).then(value => {
      console.log(value); //value2
      this.setState({ autoLoginName: value });
    });
  }

  _apitest() {
    const data = JSON.stringify({
      email: 'testesttest@naver.com',
      phone_num: '01012345678',
      token: 'terestesetsetst',
      name: '장재혁',
      platform_type: 'kakao',
    });

    axios
      .post('http://psyhm.ml/member/join', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <MainLogo />
          <GoogleLoginTouch onPress={() => this.googlesignIn()}>
            <InnerImage src={require('/assets/icons/GoogleLogo.png')} />
            <InnerText>구글 계정으로 로그인</InnerText>
          </GoogleLoginTouch>

          <KakaoLoginTouch onPress={() => this.kakaoLogin()}>
            <InnerImage src={require('/assets/icons/KakaoLogo.png')} />
            <InnerText>카카오톡 계정으로 로그인</InnerText>
          </KakaoLoginTouch>

          <BottomView>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('emaillogin')}
            >
              <BottomText> 이메일로 로그인 |</BottomText>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('signup')}
            >
              <BottomText> 회원가입</BottomText>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._apitest()}>
              <BottomText> test</BottomText>
            </TouchableHighlight>
          </BottomView>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Email: state.LoginReducer.Email,
  Token: state.LoginReducer.Token,
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
});

const WelcomeScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeScreen);

export default WelcomeScreenContainer;

// const WelcomeStackNavigator = createStackNavigator(
//   {
//     login: WelcomeScreen,
//     emailLogin: EmailLogin,
//   },
//   {
//     headerMode: 'none',
//   },
// );

// export default WelcomeStackNavigator;
//in windows, cd android and gradlew.bat clean
//add android:windowSoftInputMode="adjustPan" for keyboard pop up
