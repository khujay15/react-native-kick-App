import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import * as s from './FindPassword.styled';

export default class FindID extends React.Component {
  render() {
    return (
      <>
        <View style={{ flex: 1 }}>
          <Arrow onPress={() => this.props.navigation.navigate('login')} />
          <ThemeText>
            아이디 찾기
            <Text
              style={{ color: 'rgb(214,214,214)' }}
              onPress={() => this.props.navigation.navigate('Password')}
            >
              {' '}
              / 비밀번호 찾기
              {' '}
            </Text>
          </ThemeText>
          <s.FindView>
            <s.InnerText>
              가입하신 아이디를 찾기 위해 아래 정보를 입력해주세요
            </s.InnerText>
            <InputBox
              keyboardType="numeric"
              onChangeText={this.handleName}
              placeholder="   전화번호를 입력해주세요"
              placeholderTextColor="rgb(106, 106, 106)"
            />
          </s.FindView>
        </View>
        <FooterClick color="grey" text="다음" />
      </>
    );
  }
}
