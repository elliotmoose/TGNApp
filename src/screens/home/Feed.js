import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import Colors from '../../constants/Colors';
import Post from '../../components/home/Post';
import Images from '../../helpers/Images';
import { Hitslop } from '../../constants/Sizing';
import { PostController } from '../../api/Post';

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
    constructor(props) {
        super(props);        
        
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.loadFeed();
    }

    async loadFeed() {
        let postIds = await PostController.GetFeed();
        this.setState({postIds});
    }

    post({ item: postId }) {
        return <Post postId={postId} style={{ width: '100%' }} />
    }

    render() {

        return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <View style={{width: '100%', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                <Text style={{fontWeight: '700', fontSize: 32, marginLeft: 18,flex: 1}}>Feed</Text>
                <TouchableOpacity style={{width: 32, aspectRatio: 1, marginRight: 10}} hitSlop={Hitslop(20)} onPress={()=>console.log('TODO: present filter')}>
                    <Image source={Images.filter} resizeMode='contain' style={{width: '100%', height: '100%', tintColor: Colors.primary}}/>
                </TouchableOpacity>
            </View>
            <View style={{height: 0.3, width: '100%', backgroundColor: 'gray', opacity: 0.4}}/>
            <View style={{ width: '100%', flex: 1 }}>
                <FlatList
                    data={this.state.postIds}
                    renderItem={this.post}
                    keyExtractor={(postIds, index) => `${postIds}`}
                    style={{ backgroundColor: Colors.bgGray }}
                />
            </View>
        </SafeAreaView>
    }
}

export default Feed;
