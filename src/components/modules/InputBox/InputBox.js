import React from 'react';
import color from 'theme/color';
import * as s from './InputBox.styled';

const InputBox = props => {
  let sss = {
    shadowRadius: 4,
    shadowColor: 'rgb(0, 0, 0.7)',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 5 },
    paddingLeft: 20,
  };
  if (props.toggle) {
    sss = {
      ...sss,
      borderColor: color.oboon,
      borderWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    };
  }

  return <s.StyledInputBox {...props} style={sss} />;
};

export default InputBox;
