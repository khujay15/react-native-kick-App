import React from 'react';
import { Modal, Image, Text, TouchableOpacity } from 'react-native';
import * as s from './KickboardSelect.styled';

const KickboardSelect = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {}}
    >
      <s.ModalClick>
        <TouchableOpacity onPress={props.onPress}>
          <Text>[닫기]</Text>
        </TouchableOpacity>
      </s.ModalClick>
    </Modal>
  );
};
export default KickboardSelect;
