import styled from 'styled-components';
import { height } from 'theme/size';

const ThemeText = styled.Text`
  margin-left: 24;
  margin-top: ${height * 0.12};
  font-size: 22;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
`;

export default ThemeText;
