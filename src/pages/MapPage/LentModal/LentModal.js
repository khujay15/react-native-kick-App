import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import PopUp from 'components/modules/PopUp';
import axios from 'axios';
import * as s from './LentModal.styled';
import LentInput from './LentInput';

class LentModal extends React.Component {
  state = {
    LentModalVisible: false,

    showPayPopup: false,
    showLicensePopup: false,
  };

  handleClick = () => {
    if (!this.props.Payment) {
      this.setState({ showPayPopup: true });
      return;
    }
    if (!this.props.License) {
      this.setState({ showLicensePopup: true });
      return;
    }

    if (this.props.Payment && this.props.License)
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
          visible={this.state.LentModalVisible}
          onPress={() => this.setState({ LentModalVisible: false })}
        />

        <PopUp
          visible={this.state.showPayPopup}
          onExit={this.closePayPopup}
          FooterOnPress={() => this.props.navigation.navigate('payment')}
          FooterText="등록하기"
          img={require('assets/popup/PayPopup.png')}
          FirstLineText="오분을 이용하기 위해서는"
          SecondLineText="먼저 지불정보를 등록해주세요!"
        />

        <PopUp
          visible={this.state.showLicensePopup}
          onExit={this.closeLicensePopup}
          FooterOnPress={() => this.props.navigation.navigate('license')}
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
const mapStateToProps = state => ({
  License: state.LoginReducer.License,
  Payment: state.LoginReducer.Payment,
});

const LentModalContainer = connect(mapStateToProps)(LentModal);

export default LentModalContainer;
