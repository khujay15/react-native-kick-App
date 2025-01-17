import React from 'react';
import color from 'theme/color';
import { width, height, MARGIN } from 'theme/size';
import { Platform, View, TextInput } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { SHADOW } from 'theme/shadow';
import * as s from './InputBox.styled';

const InputBox = props => {
  if (Platform.OS === 'ios') {
    let shadowIOS = SHADOW.iosSmall;
    if (props.toggle) {
      shadowIOS = {
        ...shadowIOS,
        borderColor: color.oboon,
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
      };
    }

    return <s.StyledInputBox {...props} style={shadowIOS} />;
  }

  const boxWidth = width - 2 * MARGIN;
  let shadowANDROID = SHADOW.androidShallow;
  shadowANDROID = { ...shadowANDROID, width: boxWidth, height: 60 };

  if (props.toggle) {
    const toggle = {
      borderColor: color.oboon,
      borderWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    };

    return (
      // <BoxShadow setting={shadowANDROID}>
      //   <s.StyledInputBox {...props} style={toggle} />
      // </BoxShadow>
      <View
        style={{
          marginLeft: 2,
          marginRight: 2,
          marginTop: 2,
          marginBottom: 2,
          backgroundColor: 'white',
        }}
      >
        <s.StyledInputBox {...props} style={toggle} />
      </View>
    );
  }
  return (
    // <BoxShadow setting={shadowANDROID}>
    //   <s.StyledInputBox {...props} />
    // </BoxShadow>
    <View
      style={{
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: 'white',
      }}
    >
      <s.StyledInputBox {...props} />
    </View>
  );
};

export default InputBox;
