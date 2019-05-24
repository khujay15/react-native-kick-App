import styled from 'styled-components';
import { width, height } from 'theme/size';
import color from 'theme/color';

export const LicenseView = styled.View`
  flex: 1;
  margin-right: 24;
  margin-left: 24;
`;

export const InnerText = styled.Text`
  color: grey;
  margin-top: 20;
`;

export const ImageView = styled.View`
  align-items: center;
  justify-content: center;

  margin-left: 24;
  margin-right: 24;

  margin-top: ${height * 0.08};
`;

export const License = styled.Image`
  width: ${width - 48};
  height: ${height * 0.35};
  align-self: center;

  resize-mode: contain;
`;

export const DescView = styled.View`
  margin-bottom: 40;
  margin-top: auto;
`;

export const Dot = styled.View`
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;

  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${color.oboon};
  margin-left: 10;
  margin-right: 10;
`;

export const DotView = styled.View`
  margin-bottom: 10;
  flex-direction: row;
  align-items: center;
`;

export const SkipText = styled.TouchableOpacity`
  position: absolute;
  right: 24;
  top: ${height * 0.06};
  width: 60;
  height: 40;
`;
