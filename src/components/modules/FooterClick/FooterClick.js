import React from 'react';
import { Text, KeyboardAvoidingView, Platform } from 'react-native';
import * as s from './FooterClick.styled';

const FooterClick = props => {
  return (
    <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'}>
      <s.FooterTouch {...props} color={props.color}>
        <Text style={{ color: 'white', fontSize: 20 }}>{props.text}</Text>
      </s.FooterTouch>
    </KeyboardAvoidingView>
  );
};

export default FooterClick;
