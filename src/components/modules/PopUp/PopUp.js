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
          <View style={{ flex: 1, marginTop: 30, marginHorizontal: 20 }}>
            <Image source={this.props.img} style={styleProp} />
            <View style={{ marginTop: 50, alignItems: 'center' }}>
              <Text
                style={{ fontSize: 20, fontWeight: '200' }}
              >
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
        </View>
      </Modal>
    );
  }
}
