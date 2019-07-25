import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import Arrow from 'components/modules/Arrow';
import FooterClick from 'components/modules/FooterClick';
import { networks } from 'components/networks';
import { connect } from 'react-redux';
import { SHADOW } from 'theme/shadow';
import color from 'theme/color';
import * as s from './SmartKey.styled';

class SmartKey extends React.Component {
  state = {
    Error: false,
  };

  modalOff = () => {
    this.props.onPress();
  };

  returnKickboard = () => {
    networks
      .put(`/kickboards/${this.props.kickboard_serial}/return`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.data.success === true || res.data.success === 'true') {
          this.modalOff();
          this.props.endLent(res.data.data.pointBalance, res.data.data);
        }
      })
      .catch(err => console.log(err.response));
  };

  RETURN_KICKBOARD_FOR_TEST = () => {
    this.modalOff();
    this.props.endLent(99500, {
      pointBalance: 99500,
      pointToPayFor: 500,
      rent_datetime: '2019-03-30T11:47:16.000Z',
      return_datetime: '2019-03-30T11:47:19.929Z',
      rent_station_name: 'EXAMPLE 1',
      return_station_name: 'EXAMPLE 2',
    });
  };

  betaPress = () => {
    this.setState({
      Error:
        '아직 반납를 제외한 모든 기능은 사용할 수 없습니다. 양해부탁드립니다',
    });
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <Arrow onPress={this.modalOff} />
        <s.SmartKeyView>
          {this.state.Error && (
            <Text style={{ color: color.oboon }}>{this.state.Error}</Text>
          )}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.betaPress}>
              <View style={{ alignItems: 'center' }}>
                <s.Circle style={SHADOW.iosSmall}>
                  <s.InnerCirCle>
                    <Image
                      source={require('/assets/icons/smartkey/Lock.png')}
                    />
                  </s.InnerCirCle>
                </s.Circle>
                <Text style={{ fontSize: 16 }}>잠금</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.betaPress}>
              <View style={{ alignItems: 'center' }}>
                <s.Circle style={SHADOW.iosSmall}>
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
              <View style={{ alignItems: 'center' }}>
                <s.Circle style={SHADOW.iosSmall}>
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
              <View style={{ alignItems: 'center' }}>
                <s.Circle style={SHADOW.iosSmall}>
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
        </s.SmartKeyView>
        <FooterClick
          color={color.oboon}
          text="반납하기"
          onPress={() => this.RETURN_KICKBOARD_FOR_TEST()}
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
