import 'react-native-gesture-handler';
import React from 'react';
import * as Sentry from 'sentry-expo';
import Main from './src';

Sentry.init({
  dsn:
    process.env.RN_DNS_SENTRY,
  enableInExpoDevelopment: true,
  debug: false,
});

const App = () => {
  return <Main />;
};

export default App;
