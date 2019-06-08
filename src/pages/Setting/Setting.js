import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Arrow from '/components/modules/Arrow';
import ThemeText from '/components/modules/ThemeText';
import color from '/theme/color';
import { connect } from 'react-redux';
import { removeHeader, networks } from 'components/networks';
import SInfo from 'react-native-sensitive-info';
import SelectBox from 'components/modules/SelectBox';
import * as s from './Setting.styled';

class Setting extends React.Component {
  state = {};

  LogOut = () => {
    networks
      .delete('https://api.oboonmobility.com/v0/members/logout')
      .then(res => {
        if (res.data.success === true || res.data.success === 'true') {
          this.props.memberReset();
          removeHeader();
          SInfo.setItem('AutoToken', 'no', {});
          this.setState({ logoutSuccess: true });
        }
      });
  };

  render() {
    const shadowStyle = {
      shadowRadius: 4,
      shadowColor: 'rgb(0, 0, 0.7)',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 5 },
    };

    return (
      <View style={{ flex: 1 }}>
        <Arrow onPress={() => this.props.navigation.goBack()} />

        <ThemeText>설정</ThemeText>
        <ScrollView style={{ marginHorizontal: 24, marginTop: 100 }}>
          <TouchableOpacity onPress={() => this.LogOut()}>
            <SelectBox>
              <s.SelectBoxInside>
                <Text style={{ marginRight: 'auto' }}>로그아웃</Text>
                <Image source={require('/assets/icons/NavImage.png')} />
              </s.SelectBoxInside>
            </SelectBox>
          </TouchableOpacity>

          {this.state.logoutSuccess ? (
            <s.ErrorText>로그아웃 되셨습니다.</s.ErrorText>
          ) : null}

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('license')}
            style={{ marginTop: 20 }}
          >
            <SelectBox>
              <s.SelectBoxInside>
                <Text style={{ marginRight: 'auto' }}>운전면허 재등록</Text>
                <Image source={require('/assets/icons/NavImage.png')} />
              </s.SelectBoxInside>
            </SelectBox>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
