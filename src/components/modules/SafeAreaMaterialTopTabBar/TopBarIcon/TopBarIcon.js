import React from 'react';
import { Image, View, Text } from 'react-native';
import { color } from 'theme';

export const HamburgerIcon = ({ tintColor, focused }) => (
  <View>
    <View
      style={{
        borderBottomWidth: 2,
        width: 12,
        marginBottom: 5,
        borderBottomColor: focused ? color.oboon : color.grey,
      }}
    />
    <View
      style={{
        borderBottomWidth: 2,
        width: 16,
        marginBottom: 5,
        borderBottomColor: focused ? color.oboon : color.grey,
      }}
    />
    <View
      style={{
        borderBottomWidth: 2,
        width: 16,
        borderBottomColor: focused ? color.oboon : color.grey,
      }}
    />
  </View>
);

export const MainIcon = ({ tintColor, focused }) => (
  <Image
    style={{
      marginHorizontal: 20,
      width: 63,
      height: 23,
      resizeMode: 'contain',
    }}
    source={require('/assets/icons/ic_logo.png')}
  />
);

export const InfoIcon = ({ tintColor, focused }) => (
  <View
    style={{
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: focused ? color.oboon : color.grey,
    }}
  >
    <Text style={{ color: focused ? color.oboon : color.grey }}>i</Text>
  </View>
);
