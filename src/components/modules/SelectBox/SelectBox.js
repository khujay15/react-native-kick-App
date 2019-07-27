import React from 'react';
import color from 'theme/color';

import { Platform, View } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { SHADOW } from 'theme/shadow';
import { Text, Image } from 'react-native';
import * as s from './SelectBox.styled';

const SelectBox = props => {
  return (
    <s.StyledClickBox onPress={props.onPress} style={SHADOW.iosSmall}>
      <s.ClickBoxInside>
        <Text style={{ fontSize: 16 }}>{props.Text}</Text>
        <Image
          source={require('assets/icons/NavImage_oboon.png')}
          style={{ marginLeft: 'auto', marginRight: 15 }}
        />
      </s.ClickBoxInside>
    </s.StyledClickBox>
  );
};
export default SelectBox;
