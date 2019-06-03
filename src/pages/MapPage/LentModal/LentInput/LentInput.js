import React from 'react';
import { networks } from 'components/networks';
import { connect } from 'react-redux';
import { width, height } from 'theme/size';
import color from 'theme/color';
import {
  Text,
  View,
  Modal,
  Image,
  Animated, Easing
} from 'react-native';
import Arrow from 'components/modules/Arrow';
import FooterClick from 'components/modules/FooterClick';
import InputBox from 'components/modules/InputBox';

import * as s from './LentInput.styled';

class LentInput extends React.Component {
  state = {
    Code: '',
    BottomColor: 'grey',

    modalVisible: false,

    spin: new Animated.Value(0),
    stopAni: false,
    IsSuccess: true,
    ErrorMsg: '',

  };


  hideLoading = () => {
    Animated.timing(
      this.state.spin
    ).stop();
    this.setState({stopAni: true});
  };

  spinning = () => {
    
    Animated.loop(
      Animated.timing(this.state.spin, {
        toValue: 1,
        duration: 1600,
        easing: Easing.bezier(0.58, 0.07, 0.46, 0.96),
        useNativeDriver: true,
      })
    ).start();
  };
//animation func
  toggleOff = () => {
    this.setState({ modalVisible: false });
  };
  handleCode = num => {
    this.setState({ Code: num, BottomColor: color.oboon });
  };
  handleExit = () => {
    this.toggleOff();
    this.props.navigation.navigate('mappage');
  }
  LentRequest = () => {
    this.setState({ modalVisible: true });
    this.spinning();
    networks
      .put(`https://api.oboonmobility.com/kickboard/${this.state.Code}/rent`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        const startTime = new Date(res.data.data['rent_time']);
        if (res.data.success === true || res.data.success === 'true') {
          this.props.lentstart(startTime, this.state.Code);
          this.setState({IsSuccess: true})
          this.hideLoading();
        }
      })
      .catch(err => { 
        this.hideLoading();
        this.setState({IsSuccess: false, ErrorMsg: err.response.data.msg}) });
  };

  render() {
    const MarginTOP = height * 0.15 < 120 ? height * 0.15 : height * 0.3;
    const spin = this.state.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const {IsSuccess} = this.state;
    const {modalVisible} = this.state;
    return (
      <>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <View
            style={{ flex: 1, opacity: 0.3, backgroundColor: 'rgb(78,78,78)' }}
          />
          <View
            style={{
              position: 'absolute',
              shadowRadius: 4,
              shadowColor: 'rgb(0, 0, 0.7)',
              shadowOpacity: 0.08,
              shadowOffset: { width: 0, height: 3 },
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 5,
              borderColor: '#C0C0C0',
              borderWidth: 1,
              marginLeft: 30,
              marginRight: 24,
              marginTop: MarginTOP,
              height: 400,
              width: width * 0.85,
            }}
          >
            <s.ExitMark onPress={() => this.toggleOff()} />
            <View style={{ flex: 1, marginHorizontal: 30 }}>
              {IsSuccess ? 
              (<>
                <Image
                source={require('assets/popup/KickPopup.png')}
                style={{
                  alignSelf: 'center',
                  marginTop: 70,
                  position: 'absolute',
                }}
              />
              <Animated.Image
                source={require('assets/popup/LoadingPopup.png')}
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'contain',
                  transform: [{ rotate: spin }],
                }}
              />
              <View style={{ marginTop: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '200' }}>
                  {this.state.stopAni? "대여가 완료되었습니다.":"킥보드를 대여중입니다."}
                </Text>
              </View>
                </>) : (<>
              <Image
                source={require('assets/popup/LoadingFailed.png')}
                style={{
                  alignSelf: 'center',
                  
                 
                }}
              />
              
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '200' }}>
                  {this.state.ErrorMsg}
                </Text>
            </View>
    </>)}
            </View>
              { this.state.stopAni ? (<s.FooterClick
                color={color.oboon}
                text={'확인'}
                onPress={() => this.handleExit()}
              />) : null}
          </View>
        </Modal>

        <View style={{ flex: 1 }}>
          <Arrow onPress={() => this.props.navigation.goBack()} />

          <View style={{ marginLeft: 30, marginRight: 30, marginTop: 100 }}>
            <Text style={{ fontSize: 24 }}>킥보드에 적힌</Text>
            <Text style={{ fontSize: 24 }}>숫자를 입력해주세요</Text>
          </View>

          <s.LentView>
            <InputBox
              keyboardType="numeric"
              onChangeText={this.handleCode}
              placeholder="   킥보드 번호를 입력해주세요"
              placeholderTextColor="rgb(106, 106, 106)"
              maxLength={4}
              autoFocus
            />
          </s.LentView>

          <FooterClick
            color={this.state.BottomColor}
            text="대여하기"
            onPress={() =>
              this.state.BottomColor === color.oboon ? this.LentRequest() : null
            }
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  preSecond: state.LentReducer.preSecond,

  kickboard_serial: state.LentReducer.kickboard_serial,
});

const mapDispatchToProps = dispatch => ({
  lentstart: (preSecond, kickboard_serial) =>
    dispatch({ type: 'LENT_START', preSecond, kickboard_serial }),
});

const TimeLent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LentInput);

export default TimeLent;
