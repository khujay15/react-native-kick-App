import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const DummyView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const InnerView = styled.View`
  elevation: 3;
  flex: 1;
  margin-top: 20;
  margin-horizontal: 20;
`;

export const SkipText = styled.Text`
  color: ${color.grey};
  font-size: 14;
  font-weight: 200;
  margin-left: auto;
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
  height: 54;
  background-color: ${color.oboon};
  align-items: center;
  justify-content: center;
  font-size: 20;
  border-bottom-left-radius: 5;
  border-bottom-right-radius: 5;
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
  border-bottom-color: rgb(214, 214, 214);
  margin-top: 20;
  margin-bottom: 20;
`;

export const LineView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 10;
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
