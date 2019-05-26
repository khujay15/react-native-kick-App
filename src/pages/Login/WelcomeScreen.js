import React from 'react';
import {
  Platform,
  SafeAreaView,
  TouchableHighlight,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { networks,setHeader } from 'components/networks';
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
      token: '',
      AutoToken: false,
      tutorials: false,
      firstLogin: false,
      
    };
  }
  componentDidMount() {
   
    SInfo.getItem('tutorials', {}).then(value => {
      console.log(value);

      value === 'watch'
        ? this.setState({ tutorials: value })
        : this.props.aftertutorial();
    });


    SInfo.getItem('AutoToken', {}).then(value => {
      console.log(value);
      const data = JSON.stringify({
        accesstoken: value,
      });
      networks
      .get(`https://api.oboonmobility.com/auth/tokeninfo`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : value,
        },
      })
      .then(res => {
        console.log(res);
        if (res.data.success === true || res.data.success === 'true') {
          setHeader(`oboon_session=${value}`);
          this.AUTOLOGIN_WITHOUTLOADING();
        }
      })
      .catch(err => console.log(err.response));
    });
    
  }

  AUTOLOGIN_WITHOUTLOADING = () => {
    networks
      .get(`https://api.oboonmobility.com/member`)
      .then(res => {
        if (res.data.success === true || res.data.success === 'true') {
          this.setReducer(res);
          this.props.navigation.navigate('mappage');
        }
      })
  }


  AutoLogin = (platform) => {
    // if(this.state.AutoToken) {
    //   console.log('AUTO_LOGIN');
    // networks
    //   .get(`https://api.oboonmobility.com/member`)
    //   .then(res => {
    //     if (res.data.success === true || res.data.success === 'true') {
    //       this.setReducer(res);
    //       this.props.navigation.navigate('mappage');
    //     }
    //   })
    // }
    // else{
      if(platform ==='google') this.googlesignIn();
      else if(platform==='kakao') this.kakaoLogin();
      else if(platform ==='local') this.props.navigation.navigate('emaillogin');
    
}


  setReducer = res => {
    console.log(res);
    const { status } = res.data.member;
    
    const {kickboard} = res.data.member;
    const {name} = res.data.member;
    const {email} = res.data.member;
    const {point} = res.data.member;

    if(kickboard) {
      const LentTime = new Date(kickboard["rent_date"]);
      this.props.member(name,email,status);
      this.props.updatePoint(point);
      this.props.aleadyLent(LentTime,kickboard["kick_serial_number"]);
      this.props.navigation.navigate('mappage');
    }
    else{
      if (status === 0 || status === '0' || status === 4 || status === '4' || status === 6|| status ==='6') {
       
        this.props.member(name,email,status);
        this.props.updatePoint(point);
      } 
      else if (status === 3 || status === '3') {
        this.props.afterGOOGLELogin(name, email, this.state.token);
        this.props.hasPhone();
      }
      else if (status === 5 || status === '5') {
        this.props.afterGOOGLELogin(name, email, this.state.token);
        this.setState({firstLogin: true});
      }
      else if( status === 1 || status ==='1') {
      ///탈퇴
    }
  }
  };

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

      this.setState({ token: idToken });

      const data = JSON.stringify({
        idToken: this.state.token,
      });

      networks
        .post('https://api.oboonmobility.com/member/login.google', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          console.log(res);
          if (res.data.oboon_session) {
            
            setHeader(`oboon_session=${res.data.oboon_session}`);
            this.setReducer(res);
            SInfo.setItem('AutoToken',`${res.data.oboon_session}`, {});
          }

          if (this.state.firstLogin)
            this.props.navigation.navigate('authphone');
          else this.props.navigation.navigate('mappage');
        })
        .catch(err => console.log(err));

      
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
    if (this.state.autoLoginName) {
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
            accessToken: result.token,
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
              this.props.navigation.navigate('mappage');
            }
            else {
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
          })
          .catch(err => console.log(err));
         
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

  

  

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <MainLogo />
          <TalkCloud />

          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: marginvalue }}
            onPress={() => this.AutoLogin('google')}
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
            onPress={() => this.AutoLogin('kakao')}
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
            onPress={() => this.AutoLogin('local')}
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
