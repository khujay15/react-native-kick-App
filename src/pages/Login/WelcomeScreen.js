import React from 'react';
import { Platform, SafeAreaView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import RNKakaoLogins from 'react-native-kakao-logins';
import { EmailLogin } from './EmailLogin';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
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
      this.props.afterSNSLogin(user['name'], user['id']);

      this.setState({ googleUser: userInfo });
      console.log(userInfo);
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
          this.props.afterSNSLogin(result['nickname'], result['id']);
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
          </BottomView>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Id: state.LoginReducer.Id,
});

const mapDispatchToProps = dispatch => ({
  afterSNSLogin: (nickname, id) =>
    dispatch({ type: 'SNS_LOGIN', Name: nickname, Id: id }),
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
