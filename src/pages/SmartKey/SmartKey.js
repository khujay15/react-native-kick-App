import React from 'react';
import moment from 'moment';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Arrow from 'components/modules/Arrow';
import FooterClick from 'components/modules/FooterClick';
import { networks } from 'components/networks';
import { connect } from 'react-redux';

import color from 'theme/color';
import * as s from './SmartKey.styled';

class SmartKey extends React.Component {
  state = {
    Error : false,
  }
  toggleOff = () => {
    this.props.onPress();
  };

  returnKickboard = () => {
    networks
      .put(
        `https://api.oboonmobility.com/v0/kickboards/${
          this.props.kickboard_serial
        }/return`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        if (res.data.success === true || res.data.success === 'true') {
          this.toggleOff();
          console.log(res);
          this.props.endLent(res.data.data.pointBalance, res.data.data);
        }
      })
      .catch(err => console.log(err.response));
  };
  betaPress = () => {
    console.log("beta Press");
    this.setState({Error: "아직 반납를 제외한 모든 기능은 사용할 수 없습니다. 양해부탁드립니다"});
  }

  render() {
    const shadowStyle = {
      shadowRadius: 5,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 5 },
    };

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <Arrow onPress={this.toggleOff} />
        <s.SmartKeyView>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity  onPress={this.betaPress}>
              <View style={{ alignItems: 'center' }}>
              <s.Circle style={shadowStyle}>
                <s.InnerCirCle>
                  <Image source={require('/assets/icons/smartkey/Lock.png')} />
                </s.InnerCirCle>
              </s.Circle>
              <Text style={{ fontSize: 16 }}>잠금</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.betaPress}>
              <View style={{ alignItems: 'center' }} >
              <s.Circle style={shadowStyle}>
                <s.InnerCirCle>
                  <Image
                    source={require('/assets/icons/smartkey/UnLock.png')}
                  />
                </s.InnerCirCle>
              </s.Circle>
              <Text style={{ fontSize: 16 }}>잠금해제</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* second line */}

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.betaPress}>
              <View style={{ alignItems: 'center' }} >
              <s.Circle style={shadowStyle}>
                <s.InnerCirCle>
                  <Image
                    source={require('/assets/icons/smartkey/HeadLight.png')}
                  />
                </s.InnerCirCle>
              </s.Circle>

              <Text style={{ fontSize: 16 }}>헤드라이트</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.betaPress}>
              <View style={{ alignItems: 'center' }} >
              <s.Circle style={shadowStyle}>
                <s.InnerCirCle>
                  <Image
                    source={require('/assets/icons/smartkey/Report.png')}
                  />
                </s.InnerCirCle>
              </s.Circle>
              <Text style={{ fontSize: 16 }}>도난신고</Text>
              </View>
            </TouchableOpacity>
          </View>
          {
            this.state.Error && (<Text style={{color: color.oboon}}>{this.state.Error}</Text>)
          }
        </s.SmartKeyView>
        <FooterClick
          color={color.oboon}
          text="반납하기"
          onPress={() => this.returnKickboard()}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  kickboard_serial: state.LentReducer.kickboard_serial,
  point: state.LentReducer.point,
  returndata: state.LentReducer.returndata,
});

const mapDispatchToProps = dispatch => ({
  endLent: (Leftpoint, Returndata) =>
    dispatch({ type: 'LENT_END', point: Leftpoint, returndata: Returndata }),
});

const SmartKeyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmartKey);

export default SmartKeyContainer;
