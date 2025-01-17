import styled from 'styled-components';
import { width, height } from 'theme/size';

export const TutorialView = styled.SafeAreaView`
  width: ${width - 48};
  height: ${height - 20};
`;
// 양쪽으로 마진을 24넣어서 48을 빼줘야함
export const TutorialImage = styled.Image`
  width: 300;
  height: 340;
  margin-left: 30;
  align-self: center;
  position: absolute;
  top: ${height * 0.2};
  resize-mode: contain;
`;

export const ThemeText = styled.Text`
  margin-top: 20;
  font-size: 22;
  font-weight: bold;
`;
export const Description = styled.Text`
  color: grey;
  font-size: 16;

  margin-top: 20;
`;

export const Dotindicator = styled.View`
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.2);

  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${props => props.color};
  margin-right: 10;
`;

export const DotView = styled.View`
  position: absolute;
  flex-direction: row;
  left: 24;
  top: ${height * 0.07};
`;

export const TopTouch = styled.TouchableOpacity`
  position: absolute;
  top: ${height * 0.07};
  margin-left: ${width * 0.8};
  color: grey;
`;

export const FooterTouch = styled.TouchableOpacity`
  width: ${width};
  height: 60;
  bottom: 60;
  background-color: ${props => props.color};

  align-items: center;
  justify-content: center;
  font-size: 20;
`;
