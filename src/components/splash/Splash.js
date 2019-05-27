import React from 'react';
import { Image, View, Animated, Easing, Text } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import { networks, setHeader, removeHeader } from 'components/networks';
import { connect } from 'react-redux';
import CookieManager from 'react-native-cookies';

class Splash extends React.Component {
  state = {
    token: '',
    spin: new Animated.Value(0),
  };

  setReducer = res => {
    console.log(res);
    const { status } = res.data.member;

    const { kickboard } = res.data.member;
    const { name } = res.data.member;
    const { email } = res.data.member;
    const { point } = res.data.member;

    if (kickboard) {
      const LentTime = new Date(kickboard.rent_date);
      this.props.member(name, email, status);
      this.props.updatePoint(point);
      this.props.aleadyLent(LentTime, kickboard.kick_serial_number);
    } else if (
      status === 0 ||
      status === '0' ||
      status === 4 ||
      status === '4' ||
      status === 6 ||
      status === '6'
    ) {
      this.props.member(name, email, status);
      this.props.updatePoint(point);
    } else if (status === 3 || status === '3') {
      this.props.afterGOOGLELogin(name, email, this.state.token);
      this.props.hasPhone();
    } else if (status === 5 || status === '5') {
      this.props.afterGOOGLELogin(name, email, this.state.token);
      this.setState({ firstLogin: true });
    } else if (status === 1 || status === '1') {
      this.props.navigation.navigate('login');
      // /탈퇴
    }
  };

  componentWillMount() {}

  componentDidMount() {
    SInfo.getItem('AutoToken', {}).then(value => {
      console.log(value);
      this.verifyingToken(value);
    });
  }

  verifyingToken = async value => {
    await networks
      .get(`https://api.oboonmobility.com/auth/tokeninfo`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: value,
        },
        withCredentials: false,
      })
      .then(res => {
        console.log(res);
        if (res.data.success === true || res.data.success === 'true') {
          this.setState({ token: value });
          this.AUTOLOGIN_WITHOUTLOADING(value);
        }
      })
      .catch(err => {
        console.log('verify failed');
        this.props.navigation.navigate('login');
      });
  };

  AUTOLOGIN_WITHOUTLOADING = async value => {
    await CookieManager.clearAll();
    const head = {
      headers: {
        'Content-Type': 'application/json',
        cookie: `oboon_session=${value}`,
      },
    };

    networks
      .get(`https://api.oboonmobility.com/member`, head)
      .then(res => {
        if (res.data.success === true || res.data.success === 'true') {
          this.setReducer(res);
        }
      })
      .then(() => this.props.navigation.navigate('mappage'))
      .catch(err => {
        console.log('auto', err.response);
        this.props.navigation.navigate('login');
      });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('/assets/icons/ic_logo.png')} />
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
  kickboard_serial: state.LentReducer.kickboard_serial,
  preSecond: state.LentReducer.preSecond,
});

const mapDispatchToProps = dispatch => ({
  aftertutorial: () => dispatch({ type: 'TUTORIALS' }),

  aleadyLent: (preSecond, kickboard_serial) =>
    dispatch({ type: 'ALEADY_LENT', preSecond, kickboard_serial }),

  member: (name, email, status) =>
    dispatch({ type: 'MEMBERINFO', Name: name, Email: email, Status: status }),
  updatePoint: LeftPoint =>
    dispatch({ type: 'UPDATE_POINT', point: LeftPoint }),

  hasPhone: () => dispatch({ type: 'PHONE' }),
});

const SplashContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);

export default SplashContainer;
