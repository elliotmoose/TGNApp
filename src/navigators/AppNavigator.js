import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import { View, Image } from 'react-native';
import Images from '../helpers/Images';
import Colors from '../constants/Colors';
import Explore from '../screens/Explore';
import Notifications from '../screens/Notifications';
import MyWall from '../screens/MyWall';
import CreateModal from '../modals/CreateScreen';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
// Tab.navigationOptions = ({navigation}) => {
//     tabBarOnPress: console.log('pressed tab');
// }

function AppScreen() {
    return <Tab.Navigator initialRouteName="Home"
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
    <Tab.Screen name="Home" component={HomeNavigator}/>
    <Tab.Screen name="Explore" component={Explore}/>
    <Tab.Screen name="Create" component={Explore} listeners={({ navigation, route }) => ({
        tabPress: e => {
            console.log('TODO: push create modal');                
            e.preventDefault();
            navigation.navigate('CreateModal');
        },
    })}/>
    <Tab.Screen name="Notifications" component={Notifications} options={{tabBarBadge: 3,}}/>
    <Tab.Screen name="My Wall" component={MyWall}/>
</Tab.Navigator>
}

export default class AppNavigator extends React.Component {
    render() {
        return <NavigationContainer>
            <RootStack.Navigator mode='modal'>                
                <RootStack.Screen name="AppScreen" component={AppScreen}  options={{ headerShown: false }}/>
                <RootStack.Screen name="CreateModal" component={CreateModal} options={{ headerShown: false }}/>
            </RootStack.Navigator>
            {/* <Stack.Navigator>
            </Stack.Navigator> */}
        </NavigationContainer>
    }
}


// export default AppNavigator;
