import React, { Component } from 'react';
import { View, Text } from 'react-native';

class UserProfileScreen extends Component {

    render() {
        let userId = this.props.route.params.userId;

        return (
            <View>
                <Text> {userId} </Text>
            </View>
        )
    }
}

export default UserProfileScreen;