import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import Images from '../../helpers/Images';
import moment from 'moment';
import { PostController } from '../../api/PostController';
import PostHelper from '../../helpers/Post';
import ImageLoader from '../../api/ImageLoader';
import PostBody from './PostBody';
import { useNavigation } from '@react-navigation/native';
import store from '../../store';
import { connect, useStore, useSelector } from 'react-redux';

export default function FeedPost(props) {

    const navigation = useNavigation();
    let viewPostDetail = function () {
        navigation.navigate('PostDetailScreen', { post: props.post });
    }

    let renderPostComments = function (post) {
        let { comments, commentCount } = post;

        if (!comments || (comments && comments.length == 0) || commentCount == 0) {
            return <View />
        }

        const commentFontSize = 12;
        return <View style={{ marginTop: 14 }}>

            <View style={{ backgroundColor: Colors.gray, height: 1, borderRadius: 10, width: '100%', marginBottom: 6 }} />

            {comments.slice().reverse().map((comment, index) => {
                return <View style={{ flexDirection: 'row', marginTop: 6, marginHorizontal: 4 }} key={comment._id}>
                    <Text style={{ fontSize: commentFontSize }}>
                        <Text style={{ fontWeight: 'bold' }}>{comment.user.username} </Text>
                        {comment.content}
                    </Text>
                </View>
            })}

            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={viewPostDetail}>
                <Text>View all {commentCount} comments</Text>
            </TouchableOpacity>
        </View>
    }

    let propPost = props.post || {};
    let postId = propPost._id;
    // console.log(`rerender for post: ${postId}`);
    
    let post = useSelector(state => state.posts.feedMap[postId]);

    return (
        <View style={{ backgroundColor: 'white', marginBottom: 20, padding: 16 }} {...props.style}>
            <PostBody post={post} />
            {renderPostComments(post)}
        </View>
    );
}