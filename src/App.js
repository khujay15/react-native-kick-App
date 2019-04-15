import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import * as theme from 'theme';
import Router from 'pages';
import { Provider } from 'react-redux';
import Rstore from '/store';

const rstore = Rstore();
const App = () => (
  <Provider store={rstore}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
);

export default App;
