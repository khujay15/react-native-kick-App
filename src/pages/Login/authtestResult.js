import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const result = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  failure: {
    color: '#F94733',
  },
  success: {
    color: '#26D090',
  },
  table: {
    borderColor: '#888',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#888',
  },
  name: {
    flex: 2,
    padding: 10,
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#888',
    backgroundColor: '#f5f5f5',
  },
  value: {
    flex: 3,
    padding: 10,
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 3,
    fontSize: 14,
  },
});

export default class authtestResult extends React.Component {
  static nativationOptions = {
    title: 'authtestResult',
  };

  renderMessage(paymentResult) {
    const { title, failure, success } = result;

    if (paymentResult === 'true' || paymentResult === true) {
      return <Text style={title}>결제에 성공하였습니다.</Text>;
    }

    return <Text style={title}>결제에 실패하였습니다.</Text>;
  }

  render() {
    const { navigation } = this.props;
    const success = navigation.getParam('success');

    const imp_uid = navigation.getParam('imp_uid');
    const merchant_uid = navigation.getParam('merchant_uid');
    const error_msg = navigation.getParam('error_msg');

    const { container, table, row, name, value, button } = result;

    const paymentResult =
      typeof success === 'undefined'
        ? navigation.getParam('imp_success')
        : success;
    return (
      <View style={container}>
        {this.renderMessage(paymentResult)}
        <View style={table}>
          <View style={row}>
            <Text style={name}>아임포트 번호</Text>
            <Text style={value}>{imp_uid || '없음'}</Text>
          </View>
          <View style={row}>
            <Text style={name}>주문 번호</Text>
            <Text style={value}>{merchant_uid || '없음'}</Text>
          </View>
          {paymentResult === 'false' && (
            <View style={row}>
              <Text style={name}>에러 메시지</Text>
              <Text style={value}>{error_msg || '없음'}</Text>
            </View>
          )}
        </View>
        <View style={button}>
          <Button
            title="돌아가기"
            color="#333"
            onPress={() => navigation.push('login')}
          />
        </View>
      </View>
    );
  }
}
