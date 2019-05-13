import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';

import PopUp from 'components/modules/PopUp';
import * as s from './LentModal.styled';
import LentInput from './LentInput';

export default class LentModal extends React.Component {
  state = {
    LentModalVisible: false,

    hasPayment: false, // this two gonna get from reducer
    hasLicense: true,

    showPayPopup: false,
    showLicensePopup: false,
  };

  handleClick = () => {
    if (!this.state.hasPayment) {
      this.setState({ showPayPopup: true });
      return;
    }
    if (!this.state.hasLicense) {
      this.setState({ showLicensePopup: true });
      return;
    }

    if (this.state.hasLicense && this.state.hasLicense)
      this.setState({ LentModalVisible: true });

    // onPress={() => this.setState({ LentModalVisible: true })}
  };

  closePayPopup = () => {
    this.setState({ showPayPopup: false });
  };

  closeLicensePopup = () => {
    this.setState({ showLicensePopup: false });
  };

  render() {
    return (
      <>
        <LentInput
          visible={this.state.LentModalVisible && this.props.visible}
          onPress={() => this.setState({ LentModalVisible: false })}
        />

        <PopUp
          visible={this.state.showPayPopup}
          onExit={this.closePayPopup}
          FooterOnPress={this.closePayPopup}
          FooterText="등록하기"
          img={require('assets/popup/PayPopup.png')}
          FirstLineText="오분을 이용하기 위해서는"
          SecondLineText="먼저 지불정보를 등록해주세요!"
        />

        <PopUp
          visible={this.state.showLicensePopup}
          onExit={this.closeLicensePopup}
          FooterOnPress={this.closeLicensePopup}
          FooterText="등록하기"
          img={require('assets/popup/LicensePopup.png')}
          FirstLineText="오분을 이용하기 위해서는"
          SecondLineText="먼저 면허증을 등록해주세요!"
        />

        <s.LentButton onPress={this.handleClick}>
          <Text style={{ color: 'white', fontSize: 20 }}> 대여하기 </Text>
        </s.LentButton>
      </>
    );
  }
}
