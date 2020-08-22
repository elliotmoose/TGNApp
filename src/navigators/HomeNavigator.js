import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../screens/home/Feed';
import { Text } from 'react-native';
const Stack = createStackNavigator();

export default class HomeNavigator extends Component {
    render() {
        return <Stack.Navigator>
            <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }}/>
        </Stack.Navigator>
    }
}