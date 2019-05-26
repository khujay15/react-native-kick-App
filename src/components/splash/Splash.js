import React from 'react';
import { Image, View, Animated, Easing } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import { networks, setHeader } from 'components/networks';
import { connect } from 'react-redux';

class Splash extends React.Component {
  state = {
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
      this.props.navigation.navigate('mappage');
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

  componentDidMount() {
    SInfo.getItem('AutoToken', {}).then(value => {
      console.log(value);
      const data = JSON.stringify({
        accesstoken: value,
      });
      networks
        .get(`https://api.oboonmobility.com/auth/tokeninfo`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: value,
          },
        })
        .then(res => {
          console.log(res);
          if (res.data.success === true || res.data.success === 'true') {
            setHeader(`oboon_session=${value}`);
            this.AUTOLOGIN_WITHOUTLOADING();
          }
        })
        .catch(err => this.props.navigation.navigate('login'));
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
      .catch(err => this.props.navigation.navigate('login'));
  };

  hideLoading = () => {
    Animated.timing(this.state.spin).stop();
    this.setState({ stopAni: true });
  };

  spinning = () => {
    Animated.loop(
      Animated.timing(this.state.spin, {
        toValue: 1,
        duration: 1600,
        easing: Easing.bezier(0.58, 0.07, 0.46, 0.96),
        useNativeDriver: true,
      }),
    ).start();
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
