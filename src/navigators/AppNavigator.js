import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { View, Image } from 'react-native';
import Images from '../helpers/Images';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

console.log('test');
// Tab.navigationOptions = ({navigation}) => {
//     tabBarOnPress: console.log('pressed tab');
// }
export default class AppNavigator extends React.Component {
    render() {
        return <NavigationContainer>
            <Tab.Navigator initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let source = Images.home;
                        switch (route.name) {
                            case 'Home':
                                source = Images.home;                                
                                break;
                            case 'Explore':
                                source = Images.explore;                                
                                break;
                            case 'Create':
                                source = Images.create;                                
                                break;
                            case 'Notifications':
                                source = Images.notifications;                                
                                break;
                            case 'My Wall':
                                source = Images.wall;                                
                                break;
                        }
                        return <Image source={source} style={{ width: size, height: size, tintColor: color }} />
                    }
                })}
                tabBarOptions={{
                    activeTintColor: Colors.primary,
                }}                
                >
                <Tab.Screen name="Home" component={Home}/>
                <Tab.Screen name="Explore" component={Home}/>
                <Tab.Screen name="Create" component={Home} listeners={{
                    tabPress: e => {
                        console.log('TODO: push create modal');                
                        e.preventDefault();
                    },
                }}/>
                <Tab.Screen name="Notifications" component={Home} options={{tabBarBadge: 3}}/>
                <Tab.Screen name="My Wall" component={Home}/>
            </Tab.Navigator>
            {/* <Stack.Navigator>
            </Stack.Navigator> */}
        </NavigationContainer>
    }
}


// export default AppNavigator;
