import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import Arrow from 'components/modules/Arrow';
import ThemeText from 'components/modules/ThemeText';
import InputBox from 'components/modules/InputBox';
import FooterClick from 'components/modules/FooterClick';
import * as s from './FindPassword.styled';

export default class FindPassword extends React.Component {
  render() {
    return (
      <>
        <View style={{ flex: 1 , backgroundColor: 'white',}}>
          <Arrow onPress={() => this.props.navigation.navigate('login')} />
          <ThemeText>
            <Text
              style={{ color: 'rgb(214,214,214)' }}
              onPress={() => this.props.navigation.navigate('ID')}
            >
              아이디 찾기 /
              {' '}
            </Text>
            비밀번호 찾기
          </ThemeText>
          <s.FindView>
            <s.InnerText>
              비밀번호를 찾기 위해 아래 정보를 입력해주세요
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
