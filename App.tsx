/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import i18n from './src/config/i18n'
import AppNavigation from './src/config/AppNavigation'
import { I18nextProvider } from 'react-i18next';


function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
          <AppNavigation />
      </I18nextProvider>
    </Provider>
  );
}


export default App;
