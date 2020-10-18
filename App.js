import 'react-native-gesture-handler';
import React from 'react';
import * as Sentry from 'sentry-expo';
import Main from './src';

Sentry.init({
  dsn:
    'https://ca841b0766b74579bac63d96a9cd4d67@o351938.ingest.sentry.io/5467848',
  enableInExpoDevelopment: true,
  debug: false,
});

const App = () => {
  return <Main />;
};

export default App;
