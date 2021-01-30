import React from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/navigation';
import store from './src/redux/stores';
declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
