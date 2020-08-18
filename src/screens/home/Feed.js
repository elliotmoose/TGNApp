import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import Colors from '../../constants/Colors';
import Post from '../../components/home/Post';

let post = {
    user: {
        username: "mooselliot",
        profilePicture: 'https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/64653383_10212685679891511_3318642605947879424_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=AcCAq9A6FpMAX_pBWuI&_nc_ht=scontent.fsin8-2.fna&oh=e1159ea8dd38e270a22a9db979617b06&oe=5F62C59B'
    },
    type: "Testimony",
    target: {
        handle: 'bethelaog',
        name: 'Bethel Aog'
    },
    content: 'Hi everyone!! Nice to meet all of you I\'m excited for our event this friday. Looking forward to see everyone else there!',
    reactionCount: 130,
    commentCount: 52,
    myReactions: ["love", "pray"],
    peekComments: [{
        user: {
            username: 'llpofwy',
            profilePicture: 'https'
        }
    }],
    dateCreated: new Date(Date.now() - 60 * 60 * 1000 * 36),
}


class Feed extends Component {
    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        const {} = state;
        return {
            headerStyle:{
                backgroundColor: "Transparent",
                marginRight: 20,
                marginLeft: 20,
            }, 
            headerLeft: (
                <TouchableOpacity>
                        <Text>Hello</Text>
                </TouchableOpacity>
            ),
            
            // headerRight: (
            //     <TouchableOpacity>
            //             <Icon2 name="sc-telegram" color={Colors.red} size={30} />
            //     </TouchableOpacity>
            // ),
            // headerRightStyle: styles.planeIcon,
            headerTransparent:  true,
        };
    }

    post({ item: post }) {
        return <Post post={post} style={{ width: '100%' }} />
    }

    render() {

        return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '100%', flex: 1 }}>
                <FlatList
                    data={[post, post, post]}
                    renderItem={this.post}
                    keyExtractor={(post, index) => `${index}`}
                    style={{ backgroundColor: Colors.bgGray }}
                />
                {/* <Text>
                HOME
        </Text> */}
            </View>

        </SafeAreaView>
    }
}

export default Feed;
