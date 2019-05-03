import React from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import * as s from './LentInput.styled';

export default class LentInput extends React.Component {
  toggleOff = () => {
    this.props.onPress();
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <s.exit onPress={this.toggleOff}>
          <Text style={{ color: 'grey' }}>닫기</Text>
        </s.exit>
        <s.LentView>
          <s.Digit keyboardType="numeric" maxLength={1} />
          <s.Digit keyboardType="numeric" maxLength={1} />
          <s.Digit keyboardType="numeric" maxLength={1} />
          <s.Digit keyboardType="numeric" maxLength={1} />
        </s.LentView>
      </Modal>
    );
  }
}
