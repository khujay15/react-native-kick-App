import styled from 'styled-components';
import { width, height } from 'theme/size';

export const arrowShape = styled.Image`
  width: 15;
  height: 15;
`;

export const StyledInputBox = styled.TextInput`
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
  align-items: center;
  font-size: 16;
`;
