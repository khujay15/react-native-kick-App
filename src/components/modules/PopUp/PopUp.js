import React from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Arrow from 'components/modules/Arrow';
import ExitMark from 'components/modules/ExitMark';
import { SHADOW } from 'theme/shadow';
import color from 'theme/color';
import { width, height } from 'theme/size';
import * as s from './PopUp.styled';

export default class PopUp extends React.Component {
  toggleOff = () => {
    this.props.onExit();
  };

  render() {
    let styleProp = { alignSelf: 'center' };
    if (this.props.LicenseSize)
      styleProp = { ...styleProp, ...this.props.LicenseSize };
    const MarginTOP = height * 0.15 < 120 ? height * 0.15 : height * 0.3;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <View
          style={{ flex: 1, opacity: 0.3, backgroundColor: 'rgb(78,78,78)' }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <s.PopupView style={SHADOW.iosSmall}>
            <ExitMark onPress={() => this.toggleOff()} />
            <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
              <Image source={this.props.img} style={styleProp} />
              <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '200' }}>
                  {this.props.FirstLineText}
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '200', marginTop: 8 }}>
                  {this.props.SecondLineText}
                </Text>
              </View>
            </View>

            {this.props.FooterText && (
              <s.FooterClick
                color={color.oboon}
                text={this.props.FooterText}
                onPress={this.props.FooterOnPress}
              />
            )}
          </s.PopupView>
        </View>
      </Modal>
    );
  }
}
