import React from 'react';
import Routes from './src/navigations/Routes';
import { LogBox } from 'react-native';

// Ignore all logs
LogBox.ignoreAllLogs(true);
function App(): React.JSX.Element {
  return (
      <Routes/>
  );
}
export default App;
