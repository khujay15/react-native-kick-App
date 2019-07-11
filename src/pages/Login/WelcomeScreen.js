import React from 'react';
import {
  Platform,
  SafeAreaView,
  TouchableHighlight,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { networks, setHeader } from 'components/networks';
import { connect } from 'react-redux';
import RNKakaoLogins from 'react-native-kakao-logins';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import SInfo from 'react-native-sensitive-info';
import { SHADOW } from 'theme/shadow';
import {
  setReducerState,
  mapStateToPropsFromStore,
  mapDispatchToPropsFromStore,
} from 'store/action';
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

/*
response Example: 
{
    "success": true,
    "status": 200,
    "msg": "로그인이 완료됐습니다.",
    "member": {
        "kickboard": null,
        "member_id": 3,
        "email": "success@gmail.com",
        "name": "example",
        "status": 5,
        "point": 0,
        "provider": "kakao"
    },
    "accesstoken": "Some Token From Server"
}
*/

export class WelcomeScreen extends React.Component {
  state = {
    err: '',
    TEST_MODE: true,
  };

  ClickLogin = platform => {
    if (
      this.state.TEST_MODE === true &&
      (platform === 'google' || platform === 'kakao')
    ) {
      this.props.TEST_MODE();
      this.props.navigation.navigate('map');
      return;
    }
    if (platform === 'google') this.googleLogin();
    else if (platform === 'kakao') this.kakaoLogin();
    else if (platform === 'local') this.props.navigation.navigate('emaillogin');
  };

  googleLogin = async () => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      offlineAccess: true,
      webClientId:
        '879857882214-ph07o8ak1f69sjfasjo11aolr1mu7m5v.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;
      console.log(userInfo);

      const { idToken } = userInfo;

      this.setState({ token: idToken });

      const data = JSON.stringify({
        idToken: this.state.token,
      });

      networks
        .post('https://api.oboonmobility.com/v0/members/login.google', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          console.log(res);
          if (res.data.accesstoken) {
            SInfo.setItem('AutoToken', `${res.data.accesstoken}`, {});
            setHeader(res.data.accesstoken);
            setReducerState(res, this.props, this.state);
          }
        })
        .catch(err => console.log(err.response));
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

  kakaoLogin = async () => {
    console.log('   kakaoLogin   ');
    RNKakaoLogins.login((err, result) => {
      if (err) {
        console.log(err.toString());
        return;
      }
      if (result.token) {
        // KaKao Login Success
        const data = JSON.stringify({
          accessToken: result.token,
        });

        networks
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
              setReducerState(res, this.props, this.state);
              SInfo.setItem('AutoToken', `${res.data.accesstoken}`, {});
            }
          })
          .catch(error => {
            console.log('No User DB: ', error.response);
            RNKakaoLogins.getProfile((err, user) => {
              if (err) {
                console.log(err.toString());
                return;
              }
              this.props.afterKAKAOLogin(user.nickname);
              this.props.navigation.navigate('authemail');
            });

            this.setState({ err: JSON.stringify(error.response.data.msg) });
          });
      }
    });
  };

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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <MainLogo />

          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: marginvalue }}
            onPress={() => this.ClickLogin('google')}
          >
            <LoginTouch style={SHADOW.iosSmall}>
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
            onPress={() => this.ClickLogin('kakao')}
          >
            <LoginTouch style={SHADOW.iosSmall}>
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
            onPress={() => this.ClickLogin('local')}
          >
            <LoginTouch style={SHADOW.iosSmall}>
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
            <LoginTouch style={SHADOW.iosSmall}>
              <LoginView>
                <InnerImage src={require('/assets/icons/user.png')} />
              </LoginView>
            </LoginTouch>
            <InnerText style={{ marginLeft: 20, marginTop: marginvalue }}>
              이메일 회원가입
            </InnerText>
          </TouchableOpacity>
          {/* 
          <BottomView>
            <TouchableHighlight
              onPress={() => {
                SInfo.setItem('AutoToken', 'no', {});
                this.props.navigation.navigate('map');
              }}
            >
              <BottomText> 맵 테스트</BottomText>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('authtest')}
            >
              <BottomText> 결제 테스트</BottomText>
            </TouchableHighlight>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'maps://app?saddr=37.251462,127.071071&daddr=37.243212,127.079481&dirflg=w',
                )
              }
            >
              <BottomText> 애플 네비게이션 테스트</BottomText>
            </TouchableOpacity>
          </BottomView> */}
        </SafeAreaView>
      </>
    );
  }
}
// http://maps.apple.com/?daddr=37.331778,-122.031375
// maps://app?saddr=Cupertino&S100.123+101.222
// 37.243212, 127.079481 경희대
// 37.251462, 127.071071 영통역

const WelcomeScreenContainer = connect(
  mapStateToPropsFromStore,
  mapDispatchToPropsFromStore,
)(WelcomeScreen);

export default WelcomeScreenContainer;
