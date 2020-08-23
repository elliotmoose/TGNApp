import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ModalHeader from '../../modals/ModalHeader';
import Colors from '../../constants/Colors';
import { Screen } from '../../constants/Sizing';
import Images from '../../helpers/Images';
import { PostController } from '../../api/PostController';
import PostBody from '../../components/home/PostBody';
import Comment from '../../components/home/Comment';

export default function PostDetailScreen(props) {
	let onReactToPost = async function (postId, reactionType) {
		
	}

	let renderComments = function(comments) {

        if(!comments || (comments && comments.length == 0))
        {
            return <View/>
        }

        const commentFontSize = 12;
        return <View style={{marginTop: 14}}>
            
            <View style={{backgroundColor: Colors.gray, height: 1, borderRadius: 10, width: '100%', marginBottom: 6}}/>
            {comments.slice().reverse().map((comment, index) => {
                return <Comment key={comment._id} comment={comment}/>
            })}
        </View>
	}

	let post = props.route.params.post;
	let comments = (post && post.comments) || [];

	return <View style={{ flex: 1, backgroundColor: 'white'}}>
		<View style={{padding: 16 }}>
			<PostBody
				post={post}
				onRequestViewPostDetail={() => { }}
				style={{ width: '100%' }}
			/>
			{renderComments(comments)}
		</View>
	</View>
}