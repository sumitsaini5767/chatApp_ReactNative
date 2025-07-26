import React, { use, useEffect } from 'react';
import Routes from './src/navigations/Routes';
import { Alert, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { resetAllDataToRedux } from './src/utils/helperFunction';
// Ignore all logs
LogBox.ignoreAllLogs(true);
function App(): React.JSX.Element {
  useEffect(() => {
    resetAllDataToRedux();
  }, []);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
export default App;
