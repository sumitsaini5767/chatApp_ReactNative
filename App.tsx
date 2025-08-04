import React, { use, useEffect } from 'react';
import Routes from './src/navigations/Routes';
import { Alert, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { resetAllDataToRedux } from './src/utils/helperFunction';
import { connectSocket, disconnectSocket } from './src/utils/sockets';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
// Ignore all logs
LogBox.ignoreAllLogs(true);
function App(): React.JSX.Element {
  useEffect(() => {
    resetAllDataToRedux();
    connectSocket("http://10.0.2.2:3000").then(socket => {
      console.log("socketConnected", socket?.id);
    })
    return () => {
      disconnectSocket();
    };
  }, []);
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <Routes />
      </Provider>

    </SafeAreaProvider>
  );
}
export default App;
