import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Post extends Component {
    //   constructor(props) {
    //     super(props);
    //     this.state = {
    //     };
    //   }
    render() {
        return (
            <View style={{backgroundColor: 'white', marginBottom: 20}} {...this.props.style}>
                <Text style={{height: 200}}> Post </Text>
            </View>
        );
    }
}

export default Post;
