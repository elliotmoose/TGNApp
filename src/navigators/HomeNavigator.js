import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../screens/home/Feed';
import { Text } from 'react-native';
import PostDetailScreen from '../screens/home/PostDetailScreen';
import Colors from '../constants/Colors';
const Stack = createStackNavigator();

export default class HomeNavigator extends Component {
    render() {
        return <Stack.Navigator>
            <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }}/>
            <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} options={{
                headerTitle: null,
                headerTintColor: Colors.primary
            }} />
        </Stack.Navigator>
    }
}