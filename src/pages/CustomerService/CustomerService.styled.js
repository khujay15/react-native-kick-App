import styled from 'styled-components';

export const SelectBox = styled.TouchableOpacity`
  margin-left: 24;
  margin-right: 24;
  margin-top: 10;

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
  padding-left: 12;
  padding-top: 1;
  padding-bottom: 1;
`;
