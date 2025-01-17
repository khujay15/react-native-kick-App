import styled from 'styled-components';
import color from 'theme/color';

export const ShadowBox = styled.TouchableOpacity`
  margin-left: 1;
  margin-right: 1;

  border-width: 0.1;
  border-radius: 1;
  border-color: #ddd;

  justify-content: center;
  margin-bottom: 1;
  width: 100;
  height: 100;
  justify-content: center;
  align-items: center;
  background-color: white;
  elevation: 2;
`;

export const SmallSelectBox = styled.TouchableOpacity`
  border-bottom-width: 0.5;
  border-radius: 5;
  border-color: #ddd;
  height: 60;
  width: 100;
  margin-bottom: 1;
  margin-left: 1;
  margin-right: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  elevation: 2;
`;

export const IndicatorText = styled.Text`
  font-size: 16;
  color: ${color.grey};

  margin-bottom: 10;
`;

export const DescriptionInput = styled.TextInput`
  border-width: 0.3;
  border-radius: 5;
  border-color: #ddd;
  border-top-width: 0;
  border-bottom-width: 0;

  height: 160;
  margin-bottom: 80;
  background-color: white;
  margin-bottom: 20;
  align-items: center;
  font-size: 16;
`;

export const ErrorText = styled.Text`
  color: ${color.oboon};
  font-size: 13;
`;
