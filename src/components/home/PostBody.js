import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Images from '../../helpers/Images';
import moment from 'moment';
import { PostController } from '../../api/PostController';
import PostHelper from '../../helpers/Post';
import ImageLoader from '../../api/ImageLoader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RelativeDate } from '../../helpers/DateHelper';

export default function PostBody(props) {    

    const navigation = useNavigation();

    let viewPostDetail = function() {
        navigation.navigate('PostDetailScreen', {post: props.post});
    }
    
    let viewUserProfile = function() {
        navigation.navigate('UserProfileScreen', {userId: props.post.user._id});
    }

    let reactToPost = async function(reactionType) {
        let post = props.post;
        let postId = post._id;
        if(!postId) 
        {
            console.error("Cannot React: This post component is not attached to a post");
            return;
        }

        PostController.ReactToPost(postId, reactionType);
        // props.onReactToPost(postId, reactionType);        
    }

    let renderPostType = function (tagName) {
        let postType = tagName[0].toUpperCase() + tagName.substr(1).toLowerCase();
        return <View style={{backgroundColor: Colors.blue, borderRadius: 100, justifyContent: 'center', alignItems: 'center', padding: 2, paddingHorizontal: 10, alignSelf: 'flex-start'}}>
            <Text style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>{postType}</Text>
        </View>
    }
    
    let renderPostHeader = function (post) {        
        let username = (post.user && post.user.username) || 'unknown_user' ;
        let profilePicture = post.user && ImageLoader.LoadProfilePicture(post.user.username);
        // let profilePicture = (post.user && post.user.profilePicture) || null;
        let postType = post.postType || 'no_post_type';
        let postTarget = post.target && post.target.handle;
        let postTime = RelativeDate(post.datePosted);

        return <View style={{flexDirection: 'row', height: 50}}>
            <TouchableOpacity style={{height: '100%', aspectRatio: 1, borderRadius: 100, overflow: 'hidden'}} onPress={viewUserProfile}>
                <Image style={{backgroundColor: Colors.darkGray, flex: 1}} source={{uri: profilePicture}}/>
            </TouchableOpacity >
            <View style={{flexDirection: 'column', height: '100%', justifyContent: 'space-between', marginLeft: 9, padding: 4, flex: 1}}>
                <TouchableOpacity onPress={viewUserProfile}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{username}</Text>
                </TouchableOpacity>
                <View style={{width: '100%'}}>
                    {renderPostType(postType)}
                </View>
            </View>
            <View style={{flexDirection: 'column', height: '100%', marginLeft: 9, paddingTop: 7, paddingRight: 4}}>
                {postTarget && <Text style={{fontSize: 15, fontWeight: '200', alignSelf: 'flex-end', marginBottom: 3}}>@{postTarget}</Text>}
                <Text style={{fontSize: 12, fontWeight: '200', alignSelf: 'flex-end', marginTop: 2}}>{postTime}</Text>    
            </View>
        </View>;
    }

    let renderPostContent = function (content) {
        return <View style={{marginTop: 12}}>
            <Text style={{fontWeight: '400'}}>{content}</Text>
        </View>
    }
    
    let renderPostReaction = function (post) {                        
        let myReactions = post.myReactions || [];
        let reactionCount = post.reactionCount || 0;
        let reactionCountSuffix = reactionCount == 1 ? '' : 's';
        let commentCount = post.commentCount || 0;
        let commentCountSuffix = commentCount == 1 ? '' : 's';
        let maxReactionType = PostHelper.GetMaxReactionTypeFromPost(post);
        let mostReacted = maxReactionType ? (`reaction${maxReactionType[0].toUpperCase() + maxReactionType.substring(1)}`) : null;

        const reactionButtonSize = 28;

        return <View style={{marginTop: 24, flexDirection: 'row', height: reactionButtonSize}}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', height: 16, alignSelf: 'flex-end'}} onPress={viewPostDetail}>           
                <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                    {mostReacted && <Image source={Images[mostReacted]} style={{height: 16, width: 16}} resizeMode='contain'/>}
                    <Text style={{fontSize: 12, fontWeight: '200', marginLeft: 4, marginTop: 3}}>{reactionCount} Reaction{reactionCountSuffix} • {commentCount} Comment{commentCountSuffix}</Text>
                </View>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            {
                ["love", "like", "pray", "praise"].map((key, index)=>{
                    let hasReacted = (myReactions.indexOf(key) != -1);

                    let imageTitle = `reaction${key[0].toUpperCase() + key.substring(1)}`;
                    return <TouchableOpacity key={index} style={{height: '100%', aspectRatio: 1, marginLeft: 4}} onPress={()=>reactToPost(key)}>           
                        <Image source={Images[imageTitle]} style={{height: '100%', aspectRatio: 1,
                        tintColor: hasReacted ? null : 'gray',
                        opacity: hasReacted ? 1 : 0.2,
                        }} resizeMode='contain'/>     
                    </TouchableOpacity>
                })
            }
        </View>
    }    
    
    let post = props.post;

    return (
        <View style={{backgroundColor: 'white'}}>
            {renderPostHeader(post)}                
            {renderPostContent(post.content)}
            {renderPostReaction(post)}                
        </View>
    );
}