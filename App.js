
import * as React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux'
import Navigation from './navigation/Navigation';
import { store } from './redux/Store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


function App() {
  return (
      <Provider store={store}>
        <Toast />
        <Navigation />
      </Provider>
  );
}

export default App;