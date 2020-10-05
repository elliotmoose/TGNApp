import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/onboarding/Login';

const Stack = createStackNavigator();

export default class OnboardNavigator extends Component {
    render() {
        return <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        </Stack.Navigator>
    }
}