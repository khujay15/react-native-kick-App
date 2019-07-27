import React from 'react';
import { Text, SafeAreaView, Image, View, ScrollView } from 'react-native';
import SelectBox from 'components/modules/SelectBox';
import * as s from './CustomerService.styled';

export default class CustomerService extends React.Component {
  ToKaKao = () => {
    console.log('LINK to KAKAO APP');
  };

  render() {
    return (
      <>
        <View style={{ flex: 1, marginHorizontal: 30 }}>
          <Text style={{ fontSize: 22, marginBottom: 60, marginTop: 40 }}>
            고객지원
          </Text>

          <SelectBox
            onPress={() => this.props.navigation.navigate('outoforder')}
            Text="고장 신고"
          />

          <View style={{ marginBottom: 20 }} />

          <SelectBox
            onPress={() => this.props.navigation.navigate('FAQ')}
            Text="고장 신고"
          />

          <View style={{ marginBottom: 20 }} />

          <SelectBox
            onPress={() => this.ToKaKao()}
            Text="카카오톡으로 문의하기"
          />
        </View>
      </>
    );
  }
}
