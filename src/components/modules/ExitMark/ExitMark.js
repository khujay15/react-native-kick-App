import styled from 'styled-components';
import { width, height } from 'theme/size';
import color from 'theme/color';
import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

const ExitMark = props => {
    return (
      <TouchableOpacity
        style={{
          marginLeft: 'auto',
          width: 40,
          height: 40,
          marginTop: 20,
        }}
        {...props}
      >
        <Image source={require('assets/popup/ExitMark.png')} />
      </TouchableOpacity>
    );
  };
  export default ExitMark;