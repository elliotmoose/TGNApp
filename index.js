import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppNavigator from './src/navigators/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
    return <Provider store={store}>
        <AppNavigator/>
    </Provider>
};
AppRegistry.registerComponent(appName, () => App);
