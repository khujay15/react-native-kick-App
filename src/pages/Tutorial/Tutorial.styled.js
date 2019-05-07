import styled from 'styled-components';
import { width, height } from 'theme/size';

export const TutorialView = styled.SafeAreaView`
  width: ${width - 48};
  height: ${height};
`;
// 양쪽으로 마진을 24넣어서 48을 빼줘야함
export const TutorialImage = styled.Image`
  width: 300;
  height: 360;
  left: 14;
  position: absolute;
  top: ${height * 0.3};
`;

export const ThemeText = styled.Text`
  margin-top: 90;
  font-size: 22;
  font-weight: bold;
`;
export const Description = styled.Text`
  color: grey;
  font-size: 16;

  margin-top: 20;
`;

export const Dotindicator = styled.TouchableOpacity`
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;

  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${props => props.color};
  margin-left: 10;
`;

export const DotView = styled.View`
  position: absolute;
  flex-direction: row;
  left: 30;
  top: ${height * 0.08};
`;

export const TopText = styled.Text`
  margin-right: 24;
  margin-left: auto;
`;
