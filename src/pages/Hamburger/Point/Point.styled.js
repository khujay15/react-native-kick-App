import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const InnerText = styled.Text`
  color: rgb(106, 106, 106);
  margin-bottom: 10;
  font-weight: 200;
  font-size: 16;
`;
export const PointText = styled.Text`
  color: ${color.oboon};
  font-size: 24;
`;
export const CouponView = styled.ScrollView`
  margin-left: 30;
  margin-right: 30;
`;
export const MyPointView = styled.View`
  margin-left: 30;
  margin-right: 30;
`;

export const ChangeMenu = styled.TouchableOpacity`
  height: 60;
  width: 50%;
  border-bottom-left-radius: 5;
  border-top-left-radius: 5;
  border-width: 1;
  border-color: ${color.oboon};
  justify-content: center;
  align-items: center;
`;

export const ChangeMenu2 = styled.TouchableOpacity`
  height: 60;
  width: 50%;
  border-bottom-right-radius: 5;
  border-top-right-radius: 5;
  border-width: 1;
  border-color: ${color.oboon};
  justify-content: center;
  align-items: center;
`;

export const ClickBoxInside = styled.View`
  height: 58;

  width: ${width - 60};
  justify-content: center;
  flex-direction: row;
  align-items: center;

  padding-right: 2;
  padding-left: 20;
  padding-top: 1;
  padding-bottom: 1;
`;

export const Line = styled.View`
  border-bottom-width: 1;
  border-bottom-color: rgb(106, 106, 106);
  margin-top: 40;
  margin-bottom: 20;
`;

export const InPointText = styled.Text`
  font-size: 16;
  color: ${color.oboon};
  margin-left: auto;
`;

export const PointTouch = styled.TouchableOpacity`
  flex-direction: row;
  align-content: center;
  height: 36;
`;

export const InView = styled.View`
  margin-left: auto;
  flex-direction: row;
  justify-content: center;
  margin-top: 8;
`;
