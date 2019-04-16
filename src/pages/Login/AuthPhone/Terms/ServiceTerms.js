import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import Arrow from '/components/modules/Arrow';
import ThemeText from '/components/modules/ThemeText';

export default class ServiceTerm extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Arrow onPress={() => this.props.navigation.goBack()} />
        <ThemeText>서비스 이용 약관</ThemeText>
        <ScrollView>
          <Text>약관 내용</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
