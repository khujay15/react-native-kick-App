import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';

import { width, height } from 'theme/size';
import color from 'theme/color';
import SmartKey from 'pages/SmartKey';
import * as s from './SmartKeyModal.styeld';

export default class SmartKeyModal extends React.Component {
  state = {
    keyModalVisible: false,
  };

  render() {
    return (
      <>
        <SmartKey
          visible={this.state.keyModalVisible}
          onPress={() => this.setState({ keyModalVisible: false })}
        />

        <s.BotButton onPress={() => this.setState({ keyModalVisible: true })}>
          <Text style={{ color: 'white', fontSize: 20 }}> 스마트키 </Text>
        </s.BotButton>
      </>
    );
  }
}
