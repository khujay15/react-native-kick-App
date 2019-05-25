import styled from 'styled-components';
import color from 'theme/color';
import { width, height } from 'theme/size';

export const StyledBox = styled.View`
  border-width: 0.3;
  border-radius: 1;
  border-color: #ddd;
  border-top-width: 0;
  border-bottom-width: 0;

  elevation: 1;
  height: 60;
  background-color: white;
  margin-bottom: ${height * 0.015};
  margin-top: ${height * 0.03};
  justify-content: center;
  font-size: 16;
`;

export const Line = styled.View`
  border-bottom-width: 1;
  border-bottom-color: ${color.grey};

  margin-bottom: 20;
  margin-top: 40;
`;

export const Dotindicator = styled.View`
  border-width: 1;
  border-color: rgba(0, 0, 0, 0.2);
  width: 8;
  height: 8;
  border-radius: 4;
  background-color: white;
  margin-right: 6;
`;
