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
  toggleOff = () => {
    this.props.onPress();
  };

  returnKickboard = () => {
    networks
      .put(
        `https://api.oboonmobility.com/kickboard/${
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
          this.props.onPress();
          this.props.endLent(res.data.data.pointBalance);

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
        <s.SmartKeyView>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <s.Circle
                style={{
                  shadowRadius: 5,
                  shadowColor: 'rgb(0, 0, 0.7)',
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 5 },
                }}
              >
                <s.InnerCirCle>
                  <Image source={require('/assets/icons/smartkey/Lock.png')} />
                </s.InnerCirCle>
              </s.Circle>

              <Text style={{ fontSize: 16 }}>잠금</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }}>
              <s.Circle
                style={{
                  shadowRadius: 3,
                  shadowColor: 'rgb(0, 0, 0.7)',
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 5 },
                }}
              >
                <s.InnerCirCle>
                  <Image
                    source={require('/assets/icons/smartkey/UnLock.png')}
                  />
                </s.InnerCirCle>
              </s.Circle>
              <Text style={{ fontSize: 16 }}>잠금해제</Text>
            </TouchableOpacity>
          </View>
          {/* second line */}

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <s.Circle
                style={{
                  shadowRadius: 5,
                  shadowColor: 'rgb(0, 0, 0.7)',
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 5 },
                }}
              >
                <s.InnerCirCle>
                  <Image
                    source={require('/assets/icons/smartkey/HeadLight.png')}
                  />
                </s.InnerCirCle>
              </s.Circle>

              <Text style={{ fontSize: 16 }}>헤드라이트</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }}>
              <s.Circle
                style={{
                  shadowRadius: 3,
                  shadowColor: 'rgb(0, 0, 0.7)',
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 5 },
                }}
              >
                <s.InnerCirCle>
                  <Image
                    source={require('/assets/icons/smartkey/Report.png')}
                  />
                </s.InnerCirCle>
              </s.Circle>
              <Text style={{ fontSize: 16 }}>도난신고</Text>
            </TouchableOpacity>
          </View>
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
});

const mapDispatchToProps = dispatch => ({
  endLent: Leftpoint => dispatch({ type: 'LENT_END', point: Leftpoint }),
 
});

const SmartKeyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmartKey);

export default SmartKeyContainer;