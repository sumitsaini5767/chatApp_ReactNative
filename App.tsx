import React, { use, useEffect } from 'react';
import Routes from './src/navigations/Routes';
import { Alert, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { resetAllDataToRedux } from './src/utils/helperFunction';
import { connectSocket, disconnectSocket } from './src/utils/sockets';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { ApiUrl } from './src/Config/Urls';
import { initDB } from './src/Database/localDatabase';
import { useInternet } from './src/hooks/useInternet';
// Ignore all logs
LogBox.ignoreAllLogs(true);
function App(): React.JSX.Element {
  const isOnline = useInternet(4000);
  useEffect(() => {
    (async () => {
      await initDB();
      resetAllDataToRedux();
    })();
  }, []);

  useEffect(() => {
    if (isOnline) {
      connectSocket(ApiUrl).then(socket => {
        console.log("✅ Socket connected:", socket?.id);
      });
    } else {
      disconnectSocket();
      console.log("📴 Disconnected due to no internet");
    }
    return () => {
      disconnectSocket();
    };
  }, [isOnline]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </SafeAreaProvider>
  );
}
export default App;
