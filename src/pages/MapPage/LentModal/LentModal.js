import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import * as s from './LentModal.styled';
import LentInput from './LentInput';

export default class LentModal extends React.Component {
  state = {
    LentModalVisible: false,
  };

  render() {
    return (
      <>
        <LentInput
          visible={this.state.LentModalVisible}
          onPress={() => this.setState({ LentModalVisible: false })}
        />
        <s.LentButton onPress={() => this.setState({ LentModalVisible: true })}>
          <Text style={{ color: 'white', fontSize: 20 }}> 대여하기 </Text>
        </s.LentButton>
      </>
    );
  }
}
