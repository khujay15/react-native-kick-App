import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import DefaultArrowPage from 'components/modules/DefaultArrowPage';
import Arrow from '/components/modules/Arrow';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import { connect } from 'react-redux';
import { removeHeader, networks } from 'components/networks';
import SInfo from 'react-native-sensitive-info';
import SelectBox from 'components/modules/SelectBox';
import * as s from './Setting.styled';

class Setting extends React.Component {
  state = {
    logoutSuccess: false,
  };

  LogOut = () => {
    networks
      .delete('https://api.oboonmobility.com/v0/members/logout')
      .then(res => {
        if (res.data.success === true || res.data.success === 'true') {
          removeHeader();
          this.props.memberReset();
          SInfo.setItem('AutoToken', 'no', {});
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
        <ScrollView>
          <s.SelectBoxOutside onPress={() => this.LogOut()}>
            <SelectBox>
              <s.SelectBoxInside>
                <Text style={{ fontSize: 16 }}>로그아웃</Text>
                <Image
                  source={require('assets/icons/NavImage_oboon.png')}
                  style={{ marginLeft: 'auto', marginRight: 15 }}
                />
              </s.SelectBoxInside>
            </SelectBox>
          </s.SelectBoxOutside>

          {this.state.logoutSuccess && (
            <s.ErrorText>로그아웃 되셨습니다.</s.ErrorText>
          )}

          <s.SelectBoxOutside
            onPress={() =>
              this.props.navigation.navigate('license', {
                hideArrow: true,
              })
            }
          >
            <SelectBox>
              <s.SelectBoxInside>
                <Text style={{ fontSize: 16 }}>운전면허 재등록</Text>
                <Image
                  source={require('assets/icons/NavImage_oboon.png')}
                  style={{ marginLeft: 'auto', marginRight: 15 }}
                />
              </s.SelectBoxInside>
            </SelectBox>
          </s.SelectBoxOutside>
        </ScrollView>
      </DefaultArrowPage>
    );
  }
}

const mapStateToProps = state => ({
  Name: state.LoginReducer.Name,
  Email: state.LoginReducer.Email,
  Token: state.LoginReducer.Token,
  Tutorial: state.LoginReducer.Tutorial,
  License: state.LoginReducer.License,
  Phone: state.LoginReducer.Phone,
  Status: state.LoginReducer.Status,

  point: state.LentReducer.point,
  kickboard_serial: state.LentReducer.kickboard_serial,
  preSecond: state.LentReducer.preSecond,
});

const mapDispatchToProps = dispatch => ({
  memberReset: () =>
    dispatch({
      type: 'MEMBERINFO',
      Name: '로그아웃 상태입니다',
      Email: '로그아웃 상태입니다',
      Status: 1,
    }),
  updatePoint: LeftPoint =>
    dispatch({ type: 'UPDATE_POINT', point: LeftPoint }),
});

const SettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);

export default SettingContainer;
