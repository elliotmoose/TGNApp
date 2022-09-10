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

class Feed extends Component {
    state = {
        isRefreshing: false,
        isLoadingMore: false,
        finishedFeed: false
    }

    async componentDidMount() {        
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
