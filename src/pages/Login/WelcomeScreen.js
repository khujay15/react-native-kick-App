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
    console.log('welcome:', this.props);
    return (
      <>
        <Image source={require('assets/icons/ic_logo.png')} />

        <TouchableOpacity
          onPress={() => {
            this.kakaoLogin();
            // this.props.navigation.navigate("MapPage");
          }}
        >
          <Image source={require('assets/icons/ic_logo.png')} />
          <Text> 구글 계정으로 로그인하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.kakaoLogin();
            // this.props.navigation.navigate("MapPage");
          }}
        >
          {/* <Image source={require('../../Images/KakaoLogo.png')} /> */}
          <Text>카카오톡 계정으로 로그인하기</Text>
        </TouchableOpacity>

        <View>
          <TouchableHighlight onPress={() => console.log('touch')}>
            <Text style={{ color: 'grey' }}> 이메일로 로그인 |</Text>
          </TouchableHighlight>
          {/* 
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('EmailLogin')}
          >
            <Text style={{ color: 'grey' }}> 회원가입</Text>
          </TouchableHighlight> */}
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.Loginreducer.Name,
});

const mapDispatchToProps = dispatch => ({
  afterLogin: Name => dispatch({ type: 'KAKAO_LOGIN', Name: Name }),
});

export const WelcomeScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeScreen);

const WelcomeStackNavigator = createStackNavigator(
  {
    login: WelcomeScreenContainer,
  },
  {
    headerMode: 'none',
  },
);

export default WelcomeStackNavigator;
