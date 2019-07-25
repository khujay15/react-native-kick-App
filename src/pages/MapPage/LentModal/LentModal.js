import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import PopUp from 'components/modules/PopUp';
import * as s from './LentModal.styled';

import TutorialPopup from './TutorialPopup';

class LentModal extends React.Component {
  state = {
    LentModalVisible: false,

    showCardPopup: false,
    showLicensePopup: false,
    showUnPaidPopup: false,
    showTutorialPopup: false,

    watchTutorial: false,
  };

  handleClick = () => {
    const Paid = this.props.point > -1;

    if (!this.props.License) {
      this.setState({ showLicensePopup: true });
      return;
    }
    if (!this.props.Payment) {
      this.setState({ showCardPopup: true });
      return;
    }
    if (this.props.Tutorial !== 'watch' && !this.state.watchTutorial) {
      this.setState({ showTutorialPopup: true, watchTutorial: true });
      return;
    }

    if (!Paid) {
      this.setState({ showUnPaidPopup: true });
      return;
    }

    if (this.props.Payment && this.props.License && Paid)
      this.props.navigation.navigate('lentinput');

    // onPress={() => this.setState({ LentModalVisible: true })}
  };

  closeCardPopup = () => {
    this.setState({ showCardPopup: false });
  };

  closeLicensePopup = () => {
    this.setState({ showLicensePopup: false });
  };

  closeUnPaidPopup = () => {
    this.setState({ showUnPaidPopup: false });
  };

  closeTutorialPopup = () => {
    this.setState({ showTutorialPopup: false });
  };

  render() {
    return (
      <>
        {/* <LentInput
          visible={this.state.LentModalVisible}
          onPress={() => this.setState({ LentModalVisible: false })}
        /> */}

        <PopUp
          visible={this.state.showCardPopup}
          onExit={this.closeCardPopup}
          FooterOnPress={() => {
            this.closeCardPopup();
            this.props.navigation.navigate('newcard');
          }}
          FooterText="등록하기"
          img={require('assets/popup/PayPopup.png')}
          FirstLineText="오분을 이용하기 위해서는"
          SecondLineText="먼저 지불정보를 등록해주세요!"
        />

        <PopUp
          visible={this.state.showLicensePopup}
          onExit={this.closeLicensePopup}
          FooterOnPress={() => {
            this.closeLicensePopup();
            this.props.navigation.navigate('license', {
              hideArrow: true,
            });
          }}
          FooterText="등록하기"
          img={require('assets/popup/LicensePopup.png')}
          FirstLineText="오분을 이용하기 위해서는"
          SecondLineText="먼저 면허증을 등록해주세요!"
          LicenseSize={{
            width: 180,
            height: 121,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />

        <PopUp
          visible={this.state.showUnPaidPopup}
          onExit={this.closeUnPaidPopup}
          FooterOnPress={() => {
            this.closeUnPaidPopup();
            this.props.navigation.navigate('point');
          }}
          FooterText="포인트 충전하기"
          img={require('assets/popup/UnpaidPopup.png')}
          FirstLineText="미완료된 결제가 있습니다!"
          SecondLineText="포인트를 충전해 주세요."
        />

        <TutorialPopup
          visible={this.state.showTutorialPopup}
          onExit={this.closeTutorialPopup}
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
  Tutorial: state.LoginReducer.Tutorial,

  Status: state.LoginReducer.Status,

  point: state.LentReducer.point,
});

const LentModalContainer = connect(mapStateToProps)(LentModal);

export default LentModalContainer;
