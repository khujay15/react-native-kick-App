import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const DummyView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 110;
  justify-content: center;
  align-items: center;
`;

export const OuterView = styled.View`
  margin-bottom: 20;
  margin-left: 24;
  margin-right: 24;
  border-radius: 5;
  elevation: 3;
  background-color: white;
`;

export const InnerView = styled.View`
  border-radius: 5;
  border-width: 0;
  background-color: white;

  border-color: #ddd;
  border-top-width: 0;
`;

export const BotButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: ${width};
  height: 68;
  background-color: ${color.oboon};

  align-items: center;
  justify-content: center;
  font-size: 20;
`;

export const FooterTouch = styled.TouchableOpacity`
  bottom: 0;
  width: ${width * 0.85};
  height: 68;
  background-color: ${color.oboon};
  align-items: center;
  justify-content: center;
  font-size: 20;
`;

export const Dot = styled.View`
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.2);

  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${color.oboon};

  margin-right: 10;
`;

export const GrayLine = styled.View`
  border-bottom-width: 1;
  border-bottom-color: ${color.grey};
  margin-left: auto;
  width: 200;
`;

export const LineView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 3;
`;

export const InfoView = styled.View`
  flex-direction: row;
  margin-bottom: 10;
`;

export const RightText = styled.Text`
  font-size: 16;
  margin-left: auto;
  font-weight: 200;
`;

export const TotalCost = styled.Text`
  font-size: 20;
  margin-left: auto;
  margin-top: 20;
  color: ${color.oboon};
`;

export const RemainPoint = styled.Text`
  margin-left: auto;
  color: ${props => (props.paid ? color.grey : 'red')};
`;

export const UnpaidText = styled.Text`
  text-decoration-line: underline;
  font-size: 14;
  color: ${color.grey};
`;

export const Circle = styled.View`
  width: 20;
  height: 20;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  border-width: 1;
  border-color: red;
`;
