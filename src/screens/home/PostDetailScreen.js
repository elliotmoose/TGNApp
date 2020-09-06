import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { PostController } from '../../api/PostController';
import PostBody from '../../components/home/PostBody';
import { FlatList } from 'react-native-gesture-handler';
import FullComment from '../../components/home/FullComment';
import { useSelector } from 'react-redux';

export default function PostDetailScreen(props) {
	let propsPost = props.route.params.post;	
	let postId = propsPost._id;
	let post = useSelector(state => state.posts.cache[postId]);
	
	if(!post) {
		return <View/>;
	}

	let [comments, setComments] = useState([]);
	let [isLoading, setIsLoading] = useState(false);



	useEffect(() => {
		if (isLoading) {

			const loadComments = async () => {				
				let comments = await PostController.LoadComments(postId) || [];
				setComments(comments);				
				setIsLoading(false);
			}
	
			loadComments();
		}
	}, [isLoading])

	//componentDidMount => Get comments
	useEffect(()=>{
		setIsLoading(true);
	}, []);
	
	let postItem = {_id: postId}	
	return <View style={{ flex: 1, backgroundColor: Colors.offWhite, alignItems: 'center', justifyContent: 'center'}}>		
		{
		isLoading ? 
		<ActivityIndicator/>
		:
		<FlatList 
			style={{width: '100%'}}
			data={[postItem, ...comments]}
			renderItem={({item}) => {
				if(item === postItem) {
					return <View style={{padding: 16, backgroundColor: 'white' }}>
					<PostBody
						post={post}
						style={{ width: '100%'}}
					/>
				</View>
				}
				else {
					return <FullComment comment={item} style={{paddingLeft: 16, paddingTop: 18,  paddingBottom: 10}}/>
				}
			}}
			keyExtractor={(item)=>item._id}
		/>	}
	</View>
}