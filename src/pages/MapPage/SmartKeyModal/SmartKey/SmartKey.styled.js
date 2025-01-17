import styled from 'styled-components';
import { height } from 'theme/size';

export const SmartKeyView = styled.View`
  margin-left: 30;
  margin-right: 30;
  margin-top: ${height * 0.3};
  flex: 1;
  align-items: center;
`;

export const InnerCirCle = styled.View`
  width: 100;
  height: 100;
  border-radius: 50;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export const Circle = styled.View`
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 20;
  margin-top: 20;
  border-width: 0.3;
  border-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
  elevation: 4;

  width: 100;
  height: 100;
  border-radius: 50;
`;
