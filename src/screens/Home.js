import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/Colors';
import Post from '../components/home/Post';

export default class Home extends Component {
    post() {
        return <Post style={{ width: '100%' }}/>
    }
    render() {
        return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: '100%', flex: 1}}>
                <FlatList
                    data={['A', 'B', 'C']}
                    renderItem={this.post}
                    keyExtractor={(post) => post}
                    style={{backgroundColor: Colors.bgGray}}
                />
            {/* <Text>
                    HOME
            </Text> */}
            </View>

        </SafeAreaView>
    }
}