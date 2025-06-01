import React from 'react';
import Routes from './src/navigations/Routes';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
// Ignore all logs
LogBox.ignoreAllLogs(true);
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}
export default App;
