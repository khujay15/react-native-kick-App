import styled from 'styled-components';
import { width } from 'theme/size';

export const ClickBoxInside = styled.View`
  height: 58;

  width: ${width - 60};
  justify-content: center;
  flex-direction: row;
  align-items: center;

  padding-right: 1;
  padding-left: 20;
  padding-top: 1;
  padding-bottom: 1;
`;
