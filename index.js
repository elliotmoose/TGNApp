import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppNavigator from './src/navigators/AppNavigator';

const App = () => {  return <AppNavigator/> };
AppRegistry.registerComponent(appName, () => App);
