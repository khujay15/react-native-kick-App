import React from 'react';
import { networks } from 'components/networks';
import { connect } from 'react-redux';

import {
  Text,
  View,
  Modal,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Arrow from 'components/modules/Arrow';
import FooterClick from 'components/modules/FooterClick';
import InputBox from 'components/modules/InputBox';
import TimerModal from 'pages/MapPage/TimerModal';
import color from 'theme/color';
import * as s from './LentInput.styled';

 class LentInput extends React.Component {
  state = {
    Code: '',
    BottomColor: 'grey',
  };

  toggleOff = () => {
    this.props.onPress();
  };

  handleCode = num => {
    
      this.setState({ Code: num, BottomColor: color.oboon });
    
  };
  LentRequest = () => {

    
    //8 9 10 11 12
    networks
      .put(`https://api.oboonmobility.com/kickboard/${this.state.Code}/rent`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        const startTime= new Date(res.data.data['rent_time']);
        if(res.data.success===true || res.data.success==='true'){
          this.props.lentstart(startTime, this.state.Code);

        }
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <Arrow onPress={this.toggleOff} />

        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 100 }}>
          <Text style={{ fontSize: 24 }}>킥보드 '어디'의</Text>
          <Text style={{ fontSize: 24 }}>숫자 4자리를 입력해주세요</Text>
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
            this.state.BottomColor === color.oboon
              ? this.LentRequest()
              : null
          }
        />
      </Modal>
    );
  }
}


const mapStateToProps = state => ({
  preSecond: state.LentReducer.preSecond,
  
  kickboard_serial: state.LentReducer.kickboard_serial,
});

const mapDispatchToProps = dispatch => ({

  lentstart: (preSecond,kickboard_serial) => dispatch({ type: 'LENT_START', preSecond, kickboard_serial }),

});

const TimeLent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LentInput);

export default TimeLent;

