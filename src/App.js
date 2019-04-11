import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as theme from 'theme';
import Router from 'pages';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router />
  </ThemeProvider>
);

export default App;
