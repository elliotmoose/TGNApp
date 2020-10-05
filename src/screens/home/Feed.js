import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import Colors from '../../constants/Colors';
import FeedPost from '../../components/home/FeedPost';
import Images from '../../helpers/Images';
import { Hitslop } from '../../constants/Sizing';
import { PostController } from '../../api/PostController';
import store from '../../store';
import { connect } from 'react-redux';
import { UserController } from '../../api/UserController';

// let post = {
//     user: {
//         username: "mooselliot",
//         profilePicture: 'https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/64653383_10212685679891511_3318642605947879424_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=AcCAq9A6FpMAX_pBWuI&_nc_ht=scontent.fsin8-2.fna&oh=e1159ea8dd38e270a22a9db979617b06&oe=5F62C59B'
//     },
//     type: "Testimony",
//     target: {
//         handle: 'bethelaog',
//         name: 'Bethel Aog'
//     },
//     content: 'Hi everyone!! Nice to meet all of you I\'m excited for our event this friday. Looking forward to see everyone else there!',
//     reactionCount: 130,
//     commentCount: 52,
//     myReactions: ["love", "pray"],
//     peekComments: [{
//         user: {
//             username: 'llpofwy',
//             profilePicture: 'https'
//         }
//     }],
//     dateCreated: new Date(Date.now() - 60 * 60 * 1000 * 36),
// }
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

class Feed extends Component {
    state = {
        isRefreshing: false,
        isLoadingMore: false,
        finishedFeed: false
    }

    async componentDidMount() {        
        await UserController.login('lywjoel', '12345');
        await this.loadFeed()
    }

    async loadMore() {
        if (this.state.finishedFeed || this.state.isLoadingMore || this.state.isRefreshing) {
            return;
        }

        this.setState({ isLoadingMore: true }, async () => {
            let recentlyLoaded = await PostController.LoadFeedNext();
            this.setState({ finishedFeed: recentlyLoaded.length == 0, isLoadingMore: false })
        });
    }

    async loadFeed() {
        this.setState({ isLoadingMore: true }, async () => {
            await PostController.LoadFeed();
            this.setState({ isLoadingMore: false })
        });        
    }

    async refresh() {
        this.setState({ isRefreshing: true});
        await PostController.LoadFeed();
        this.setState({ isRefreshing: false, finishedFeed: false });
    }


    renderLoadingFooter() {
        return (this.state.isLoadingMore && <View style={{ height: 40, width: '100%' }}>
            <ActivityIndicator />
        </View>)
    }

    render() {
        // let posts = store.getState().posts.feed || [];        
        let posts = this.props.feed || [];

        return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <View style={{ width: '100%', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                <Text style={{ fontWeight: '700', fontSize: 32, marginLeft: 18, flex: 1 }}>Feed</Text>
                <TouchableOpacity style={{ width: 32, aspectRatio: 1, marginRight: 10 }} hitSlop={Hitslop(20)} onPress={() => console.log('TODO: present filter')}>
                    <Image source={Images.filter} resizeMode='contain' style={{ width: '100%', height: '100%', tintColor: Colors.primary }} />
                </TouchableOpacity>
            </View>
            <View style={{ height: 0.3, width: '100%', backgroundColor: 'gray', opacity: 0.4 }} />
            <View style={{ width: '100%', flex: 1 }}>
                <FlatList
                    data={posts}
                    renderItem={({ item: post }) => (
                        <FeedPost post={post}
                            // onRequestViewPostDetail={this.onRequestViewPostDetail.bind(this)} 
                            // onReactToPost={this.onReactToPost.bind(this)} 
                            style={{ width: '100%' }}
                        />)
                    }
                    keyExtractor={(post, index) => `${post._id}${index}`}
                    style={{ backgroundColor: Colors.bgGray }}
                    onRefresh={this.refresh.bind(this)}
                    refreshing={this.state.isRefreshing}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={2}
                    ListFooterComponent={this.renderLoadingFooter.bind(this)}
                />
            </View>
        </SafeAreaView>
    }
}


const mapStateToProps = (state) => {
    return {
        feed: state.posts.feed.map(postId=>state.posts.cache[postId])
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         search: (name) => {
//             dispatch(search(name))
//         }
//     }
// }
export default connect(
    mapStateToProps
)(Feed)

// export default Feed;
