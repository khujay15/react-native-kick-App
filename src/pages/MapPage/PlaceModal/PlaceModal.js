import React from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import * as s from './PlaceModal.styled';

export default class PlaceModal extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    if (this.props.placeId !== this.props.selectedMarkerId) return null;
    else {
      return (
        <s.ModalView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <s.ModalClick>
              <Text> (미구현) </Text>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>[닫기]</Text>
              </TouchableOpacity>
            </s.ModalClick>
          </Modal>
          <s.InnerView>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <s.LocationText> {this.props.description} </s.LocationText>
            </TouchableOpacity>
            <s.Line />
          </s.InnerView>
        </s.ModalView>
      );
    }
  }
}
