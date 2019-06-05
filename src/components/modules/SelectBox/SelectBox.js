import React from 'react';
import color from 'theme/color';
import { width, height, MARGIN } from 'theme/size';
import { Platform } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { SHADOW } from 'theme/shadow';
import * as s from './SelectBox.styled';

const SelectBox = props => {
  if (Platform.OS === 'ios') {

    let shadowIOS = SHADOW.ios;
    if (props.toggle) {
      shadowIOS = {
        ...shadowIOS,
        borderColor: color.oboon,
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
      };
    }

    return <s.StyledViewBox {...props} style={shadowIOS} />;
  }
  const boxWidth = width - 2 * MARGIN;
  let shadowANDROID = SHADOW.android;
  shadowANDROID = { ...shadowANDROID, width: boxWidth, height: 60 };
  if (props.toggle) {
    const toggle = {
      borderColor: color.oboon,
      borderWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    };
    return (
      <BoxShadow setting={shadowANDROID}>
        <s.StyledViewBox {...props} style={toggle} />
      </BoxShadow>
    );
  }
  return (
    <BoxShadow setting={shadowANDROID}>
      <s.StyledViewBox {...props} />
    </BoxShadow>
  );
};
export default SelectBox;
