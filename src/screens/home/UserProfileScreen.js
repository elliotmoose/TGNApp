import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import FeedPost from '../../components/home/FeedPost';
import Colors from '../../constants/Colors';
import { PostController } from '../../api/PostController';
import PostBody from '../../components/home/PostBody';
import { UserController } from '../../api/UserController';
import ImageLoader from '../../api/ImageLoader';
import Images from '../../helpers/Images';

class UserProfileScreen extends Component {
    state = {
        posts: [],
        user: {},
        noAccess: false
    }

    async loadPostsByUser() {
        let userId = this.props.route.params.userId;
        let res = await PostController.LoadUserPosts(userId);

        if(res.error && res.error.code == 'ERROR_NOT_AUTHORISED') {
            this.setState({noAccess: true});
        }
        else {
            let posts = res || [];            
            this.setState({posts, noAccess: false});
        }
    }
    
    async loadUser() {
        let userId = this.props.route.params.userId;
        let user = await UserController.loadUser(userId) || {};
        this.setState({user})
        
    }

    componentDidMount() {
        this.loadUser();
        this.loadPostsByUser();
    }

    renderUserDetails(user) {
        let fullName = user && user.fullName || 'no_name';
        let username = user && user.username || 'no_username';
        
        // console.log(user.followers)
        let me = UserController.getLoggedInUser();
        let isMyself = user._id == me._id;
        let isFollowing = user && user.followers && user.followers.findIndex((follower)=>follower._id == me._id) != -1 || false;
        // let isFollowing = false;
        let profilePicture = ImageLoader.LoadProfilePicture(username);
        let bio = user && user.bio || `no_bio`;

        let followerCount = user.followerCount || 0;
        let followingCount = user.followingCount || 0;
        
        return <View style={{width: '100%', padding: 16, backgroundColor: 'white', shadowOpacity: 0.2, shadowColor: 'black', shadowOffset: {width: 0, height: 0},  zIndex: 1}}>
            <View style={{height: 55, flexDirection: 'row'}}>
                <Image style={{backgroundColor: Colors.darkGray, borderRadius: 300, height: '100%', aspectRatio: 1}} source={{uri: profilePicture}}/>
                <View style={{flex: 1, justifyContent: 'space-between', marginLeft: 12, marginVertical: 2}}>
                    <Text style={{fontWeight: '700', fontSize: 24}}>{fullName}</Text>
                    <Text style={{fontWeight: '500', fontSize: 16}}>@{username}</Text>
                </View>
                {isMyself || <TouchableOpacity style={{alignSelf: 'flex-start', height: 30, width: 140, borderRadius: 4, backgroundColor: isFollowing ? Colors.gray : Colors.blue, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '500'}}>{isFollowing ? 'Following' : 'Follow'}</Text>
                </TouchableOpacity>}
            </View>
            <Text style={{fontWeight: '500', marginVertical: 16}}>{bio}</Text>
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                <Text>{followerCount} Followers • {followingCount} Following</Text>
            </TouchableOpacity>
        </View>
    }

    renderPosts() {
        let posts = this.state.posts || [];
        return (
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    return <View style={{ padding: 16, backgroundColor: 'white', marginVertical: 10 }}>
                        <PostBody
                            post={item}
                            style={{ width: '100%' }}
                        />
                    </View>
                }}
                contentContainerStyle={{ paddingTop: 10 }}
                keyExtractor={(item, index) => `${item && item._id}`}
                style={{ backgroundColor: Colors.bgGray }}
            // onRefresh={this.refresh.bind(this)}
            // refreshing={this.state.isRefreshing}
            // onEndReached={this.loadMore.bind(this)}
            // onEndReachedThreshold={2}
            // ListFooterComponent={this.renderLoadingFooter.bind(this)}
            />
        )
    }
    renderPrivate() {
        return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: '20%', aspectRatio: 1, margin: 16}} resizeMode='contain' source={Images.lock}/>
            <Text style={{fontWeight: '700', fontSize: 25}}>This account is private</Text>
            <Text style={{fontWeight: '500', color: Colors.fontGray, textAlign: 'center'}}>Follow this account to see{'\n'}their posts</Text>
        </View>)
    }

    render() {        
        let user = this.state.user || {};

        return <View style={{ width: '100%', flex: 1 }}>
            {this.renderUserDetails(user)}            
            {this.state.noAccess ? this.renderPrivate() : this.renderPosts()}
    </View>
    }
}

export default UserProfileScreen;