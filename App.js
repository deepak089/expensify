
import * as React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux'
import Navigation from './navigation/Navigation';
import { store } from './redux/Store';


function App() {
  return (
      <Provider store={store}>
        <Navigation />
      </Provider>
  );
}

export default App;