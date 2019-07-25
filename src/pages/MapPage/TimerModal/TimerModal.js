import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import color from 'theme/color';
import { connect } from 'react-redux';
import { SHADOW } from 'theme/shadow';
import * as s from './TimerModal.styled';

const timeFormat = (time: number) => `${time < 10 ? '0' : ''}${time}`;

function convertSecToTime(time: number) {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  // return `${timeFormat(minute)}:${timeFormat(second)}`;
  return `${timeFormat(minute)}`;
}

class TimerModal extends React.Component {
  interval = '';

  state = {
    status: 'WALKING',
    seconds: 0,
  };

  componentWillMount() {
    if (this.state.status === 'WALKING') this.countSeconds();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countSeconds = () => {
    const value = 0;
    let date;
    if (this.props.isLent) {
      date = this.props.preSecond;
    } else {
      date = new Date();
      this.props.updatepreSeconds({ preSecond: date });
    }

    const calcSeconds = () => moment().diff(date, 'seconds');
    // update state
    this.setState({ seconds: calcSeconds() });
    this.interval = setInterval(() => {
      this.setState({ seconds: calcSeconds() });
    }, 1000);
  };

  stopCount = () => {
    const { updateSeconds } = this.props;
    clearInterval(this.interval);
    updateSeconds({ second: this.seconds });
  };

  render() {
    // if (!this.props.isLent) return null;
    return (
      <s.TimeModalView style={SHADOW.iosSmall}>
        <s.TimeInnerView>
          
          <Image
            source={require('assets/icons/PlaceModal.png')}
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 16 }}>{this.props.KickboradName}</Text>
            <Text style={{ fontSize: 14, marginTop: 2, color: color.grey }}>
              {this.props.KickboardBattery}
            </Text>
          </View>
          <s.TimeView>
            <Text style={{ color: color.oboon }}>
              {convertSecToTime(this.state.seconds)}분
            </Text>
          </s.TimeView>

        </s.TimeInnerView>
      </s.TimeModalView>
    );
  }
}

const mapStateToProps = state => ({
  preSecond: state.LentReducer.preSecond,
  second: state.LentReducer.second,
  isLent: state.LentReducer.isLent,
});

const mapDispatchToProps = dispatch => ({
  updateSeconds: second => dispatch({ type: 'UPDATE_SECOND', second }),

  updatepreSeconds: preSecond =>
    dispatch({ type: 'UPDATE_PRESECOND', preSecond }),
});

const TimerModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerModal);

export default TimerModalContainer;
