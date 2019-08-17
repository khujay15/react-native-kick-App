import React from 'react';
import { View, ScrollView } from 'react-native';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';

import { connect } from 'react-redux';
import { removeHeader, networks } from 'components/networks';
import SInfo from 'react-native-sensitive-info';
import SelectBox from 'components/modules/SelectBox';
import { MARGIN } from 'theme/size';
import * as s from './Setting.styled';

class Setting extends React.Component {
  state = {
    logoutSuccess: false,
  };

  LogOut = () => {
    SInfo.setItem('AutoToken', 'no', {});

    networks.delete('/members/logout').then(res => {
      if (res.data.success === true || res.data.success === 'true') {
        removeHeader();
        this.props.memberReset();
        this.setState({ logoutSuccess: true });
      }
    });
  };

  render() {
    return (
      <DefaultArrowPage
        arrowOnPress={() => this.props.navigation.goBack()}
        themeText="설정"
      >
        <View style={{ marginHorizontal: MARGIN }}>
          <SelectBox onPress={() => this.LogOut()} Text="로그아웃" />

          <View style={{ marginBottom: 20 }} />

          {this.state.logoutSuccess && (
            <s.ErrorText>로그아웃 되셨습니다.</s.ErrorText>
          )}

          <SelectBox
            onPress={() =>
              this.props.navigation.navigate('license', {
                hideArrow: true,
              })
            }
            Text="운전면허 재등록"
          />

          <View style={{ marginBottom: 20 }} />
        </View>
      </DefaultArrowPage>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Email: state.LoginReducer.Email,
  Status: state.LoginReducer.Status,
});

const mapDispatchToProps = dispatch => ({
  memberReset: () =>
    dispatch({
      type: 'MEMBERINFO',
      Name: '로그아웃 상태입니다',
      Email: '로그아웃 상태입니다',
      Status: 1,
    }),
});

const SettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);

export default SettingContainer;
