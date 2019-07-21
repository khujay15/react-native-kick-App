import React from 'react';
import { Image, View, Animated, Easing, Text } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import { networks, setHeader, removeHeader } from 'components/networks';
import { connect } from 'react-redux';
import {
  setReducerState,
  mapStateToPropsFromStore,
  mapDispatchToPropsFromStore,
} from 'store/action';

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

class Splash extends React.Component {
  state = {
    token: '',
    spin: new Animated.Value(0),
    firstLogin: false,
  };

  componentDidMount() {
    SInfo.getItem('AutoToken', {}).then(value => {
      console.log(value);
      this.verifyingToken(value);
    });

    SInfo.getItem('tutorials', {}).then(value => {
      console.log(value);
      value === 'watch' ? this.props.aftertutorial() : null;
    });
  }

  verifyingToken = async value => {
    console.log('token : ', value);
    await networks
      .get(`https://api.oboonmobility.com/v0/auth/tokeninfo`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value}`,
        },
        withCredentials: false,
      })
      .then(res => {
        console.log('verify success:', res);
        if (res.data.success === true || res.data.success === 'true') {
          this.AUTOLOGIN_WITHOUTLOADING(value);
        }
      })
      .catch(err => {
        console.log('verify failed', err.response);
        this.props.navigation.navigate('login');
      });
  };

  AUTOLOGIN_WITHOUTLOADING = async token => {
    // await CookieManager.clearAll();
    setHeader(token);

    networks
      .get(`https://api.oboonmobility.com/v0/members/myInfo`)
      .then(res => {
        if (res.data.success === true || res.data.success === 'true') {
          setReducerState(res, this.props, this.state);
        }
      })
      .catch(err => {
        console.log('autoLogin failed: ', err.response);
        this.props.navigation.navigate('login');
      });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Image source={require('/assets/icons/ic_logo.png')} />
      </View>
    );
  }
}

const SplashContainer = connect(
  mapStateToPropsFromStore,
  mapDispatchToPropsFromStore,
)(Splash);

export default SplashContainer;
