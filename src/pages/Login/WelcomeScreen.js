import React from 'react';
import {
  Platform,
  SafeAreaView,
  TouchableHighlight,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import RNKakaoLogins from 'react-native-kakao-logins';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import SInfo from 'react-native-sensitive-info';
import TalkCloud from 'components/modules/TalkCloud';
// need min 9.1 ios vesion

import {
  MainLogo,
  LoginTouch,
  LoginView,
  marginvalue,
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
      tutorials: false,
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
        '879857882214-ph07o8ak1f69sjfasjo11aolr1mu7m5v.apps.googleusercontent.com',
      // Platform.OS === 'ios'
      //   ? '879857882214-i05pa300nuq2eari5bl7b4refr5tmeao.apps.googleusercontent.com'
      //   : '879857882214-ph07o8ak1f69sjfasjo11aolr1mu7m5v.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;
      console.log(userInfo);

      const { idToken } = userInfo;
      console.log('id;');
      console.log(idToken);
      this.setState({ token: idToken });

      console.log(this.state.token);

      const data = JSON.stringify({
        idToken: this.state.token,
      });
      console.log(data);

      axios
        .post('https://api.oboonmobility.com/member/login.google', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          console.log(res.data);
          const { user } = res.data;
          if (user.kick_serial_number) {
            // 대여중 상태;
            console.log('brroinw');
          }

          if (user.status === 5) {
            // 핸드폰 미인증 상태
          }

          if (this.state.tutorials === 'watch')
            this.props.navigation.navigate('mappage');
          else this.props.navigation.navigate('tutorial');
        })
        .catch(err => console.log('ERROR! : ', err));

      this.props.afterGOOGLELogin(user.name, user.email, idToken);
    } catch (error) {
      console.log(error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log('other log occured');
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
          const data = JSON.stringify({
            idToken: result.token,
          });

          axios
            .post('https://api.oboonmobility.com/member/login.kakao', data, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(res => {
              console.log(res.data);
              const { user } = res.data;
              if (user.kick_serial_number) {
                // 대여중 상태;
                console.log('brroinw');
              }

              if (user.status === 5) {
                // 핸드폰 미인증 상태
              }
            });

          RNKakaoLogins.getProfile((err, user) => {
            if (err) {
              console.log(err.toString());
              return;
            }
            console.log(user);

            this.props.afterKAKAOLogin(user.nickname, result.token);
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
      console.log(value); // value2
      this.setState({ autoLoginName: value });
    });
    SInfo.getItem('tutorials', {}).then(value => {
      console.log(value);

      value === 'watch'
        ? this.setState({ tutorials: value })
        : this.props.aftertutorial();
    });
    // this.props.updatepreSeconds({ preSecond: new Date('2019/05/19/03:30:10') });
  }

  _apitest() {
    console.log(this.state.token);
    const data = JSON.stringify({
      email: 'aaaaaaaaa@naver.com',
      phone_num: '01011111111',
      token: this.props.Token,
      name: '장재혁이',
      platform_type: 'google',
    });

    const data2 = JSON.stringify({
      email: 'snssnsnsns@naver.com',
      phone_num: '01077777777',
      token: 'snsnsnsnsnsnsnsnsn',
      name: '장재혁',
      platform_type: 'google',
    });

    axios
      .post('https://api.oboonmobility.com/member/login.google', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
      });

    // axios
    //   .get('https://api.oboonmobility.com/member/login.google')
    //   .then(res => console.log(res));
  }

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <MainLogo />
          <TalkCloud />

          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: marginvalue }}
            onPress={() => this.googlesignIn()}
          >
            <LoginTouch
              style={{
                shadowRadius: 3,
                shadowColor: 'rgb(0, 0, 0.7)',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 5 },
              }}
            >
              <LoginView>
                <InnerImage src={require('/assets/icons/GoogleLogo.png')} />
              </LoginView>
            </LoginTouch>
            <InnerText style={{ marginLeft: 20, marginTop: marginvalue }}>
              구글 계정으로 로그인
            </InnerText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: marginvalue }}
            onPress={() => this.kakaoLogin()}
          >
            <LoginTouch
              style={{
                shadowRadius: 3,
                shadowColor: 'rgb(0, 0, 0.7)',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 5 },
              }}
            >
              <LoginView>
                <InnerImage src={require('/assets/icons/KakaoLogo.png')} />
              </LoginView>
            </LoginTouch>
            <InnerText style={{ marginLeft: 20, marginTop: marginvalue }}>
              카카오톡 계정으로 로그인
            </InnerText>
          </TouchableOpacity>
          {/* 이메일로그인 */}
          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: marginvalue }}
            onPress={() => this.props.navigation.navigate('emaillogin')}
          >
            <LoginTouch
              style={{
                shadowRadius: 3,
                shadowColor: 'rgb(0, 0, 0.7)',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 5 },
              }}
            >
              <LoginView>
                <InnerImage src={require('/assets/icons/envelope.png')} />
              </LoginView>
            </LoginTouch>
            <InnerText style={{ marginLeft: 20, marginTop: marginvalue }}>
              이메일로 로그인
            </InnerText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: marginvalue }}
            onPress={() => this.props.navigation.navigate('signup')}
          >
            <LoginTouch
              style={{
                shadowRadius: 3,
                shadowColor: 'rgb(0, 0, 0.7)',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 5 },
              }}
            >
              <LoginView>
                <InnerImage src={require('/assets/icons/user.png')} />
              </LoginView>
            </LoginTouch>
            <InnerText style={{ marginLeft: 20, marginTop: marginvalue }}>
              이메일 회원가입
            </InnerText>
          </TouchableOpacity>

          <BottomView>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('mappage')}
            >
              <BottomText style={{ marginLeft: 300 }}> test</BottomText>
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
  Tutorial: state.LoginReducer.Tutorial,

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

  updatepreSeconds: preSecond =>
    dispatch({ type: 'UPDATE_PRESECOND', preSecond }),
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
// in windows, cd android and gradlew.bat clean
// add android:windowSoftInputMode="adjustPan" for keyboard pop up
