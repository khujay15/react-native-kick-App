import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const InnerText = styled.Text`
  color: rgb(106, 106, 106);
  margin-top: 30;
  margin-bottom: 10;
  font-weight: 200;
  font-size: 16;
`;
export const PointText = styled.Text`
  color: ${color.oboon};
  margin-top: 20;
  margin-bottom: 20;
  font-size: 24;
`;
export const CouponView = styled.ScrollView`
  margin-left: 24;
  margin-right: 24;
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
  elevation: 1;
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
  elevation: 1;
`;

export const SelectBox = styled.TouchableOpacity`
  margin-left: 1;
  margin-right: 1;
  margin-top: 20;
  border-width: 0.5;
  border-bottom-width: 0.5;
  border-radius: 1;
  border-color: #ddd;
  elevation: 1;
  height: 60;
  justify-content: center;
  margin-bottom: 1;
`;

export const SelectBoxInside = styled.View`
  background-color: white;
  height: 58;

  justify-content: center;
  flex-direction: row;
  align-items: center;

  padding-right: 1;
  padding-left: 1;
  padding-top: 1;
  padding-bottom: 1;
`;
