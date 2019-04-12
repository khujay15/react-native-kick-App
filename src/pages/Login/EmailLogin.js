import React from 'react';
import { TextInput } from 'react-native';
import Arrow from '/components/modules/Arrow';
import {
  EmailMainView,
  InnerText,
  Line,
  ArrowTouch,
} from './EmailLogin.styled';
import ThemeText from '/components/modules/ThemeText';

export class EmailLogin extends React.Component {
  state = {
    isInput: 'grey',
  };
  render() {
    return (
      <>
        <ArrowTouch onPress={() => console.log('Arrow clicked')}>
          <Arrow />
        </ArrowTouch>

        <ThemeText>이메일로 로그인</ThemeText>
        <EmailMainView>
          <InnerText>이메일 주소</InnerText>
          <TextInput
            onChangeText={() => this.setState({ isInput: 'purple' })}
          />
          <Line borderBottomColor={this.state.isInput} />
          <InnerText>비밀번호</InnerText>
          <TextInput />
          <Line />
        </EmailMainView>
      </>
    );
  }
}
