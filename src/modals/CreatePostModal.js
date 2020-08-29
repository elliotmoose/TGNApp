import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, FlatList } from 'react-native';
import ModalHeader from './ModalHeader';
import Colors from '../constants/Colors';
import { Screen } from '../constants/Sizing';
import Images from '../helpers/Images';
import { PostController } from '../api/PostController';
import { UserController } from '../api/UserController';
import AnimatedBottomDrawer from '../components/create/AnimatedBottomDrawer';
import ImageLoader from '../api/ImageLoader';

class CreatePostModal extends Component {

	state = {
		postType: 'testimony',
		postContent: '',
		targets: []
	}
	
	componentDidMount() {
		this.loadTargets();
	}

	requestSelectPostType() {
		Keyboard.dismiss();
		this.postTypeSelection && this.postTypeSelection.fade(true);
	}

	async loadTargets() {
		let me = UserController.getLoggedInUser();
		let targets = await UserController.loadUserMemberOf(me._id) || [];
		this.setState({targets});
	}

	requestingSelectTargets() {
		Keyboard.dismiss();
		this.targetSelectionList && this.targetSelectionList.fade(true);
	}
	
	selectTarget(target) {
		this.targetSelectionList.fade(false);
		this.setState({target});
	}

	renderSelectedTarget() {
		const targetSelectionHeight = 70;
		const padding = 12;
		let target = this.state.target;
		let targetName = (target && target.name) || 'Everyone';
		let handle = target && target.handle || '';
		let orgPicture = {uri: ImageLoader.LoadOrgPicture(handle)};
		return <TouchableOpacity style={{height: targetSelectionHeight, padding}} onPress={this.requestingSelectTargets.bind(this)}>
			<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
				<Image source={Images.chevron} resizeMode='contain' style={{tintColor: Colors.primary, transform: [{rotate: '-90deg'}], width: 40, aspectRatio: 1}}/>
				<Image source={orgPicture} resizeMode='cover' style={{borderRadius: targetSelectionHeight/2, height: '100%', aspectRatio: 1, backgroundColor: Colors.darkGray, marginRight: 12}}/>
				<Text style={{fontWeight: '700'}}>{targetName}</Text>
			</View>
		</TouchableOpacity>
	}

	renderTarget(target) {
		let name = target && target.name || 'Everyone';
		let handle = target && target.handle || '';
		let orgPicture = {uri: ImageLoader.LoadOrgPicture(handle)};
		let isTargeted = (target !== null && target !== undefined);

		return <TouchableOpacity style={{ height: 56, paddingHorizontal: 24, marginBottom: 24 }} onPress={()=>this.selectTarget(target)}> 
			<View style={{ width: '100%', height: '100%', flexDirection: 'row'}}>
				<Image source={orgPicture} style={{borderRadius: 300, aspectRatio: 1, height: '100%', backgroundColor: Colors.darkGray}}/>
				<View style={{ flex: 1, justifyContent: 'space-around', marginLeft: 14}}>
					<Text style={{fontWeight: '700', fontSize: 21}}>{name}</Text>
					{isTargeted && <Text style={{fontWeight: '700', fontSize: 16}}>@{handle}</Text>}
				</View>
			</View>
		</TouchableOpacity>
	}

	renderAttributedText() {		
		var re = /\B@\w+/g; 
		var str = this.state.postContent;
		var mentions = str.match(re) || [];
		
		let tokens = [];

		//removes duplicates
		let uniqueMentions = [...new Set(mentions)];

		
		for(let mention of uniqueMentions)
		{
			let index = -1;
			// let stopper = 3;
			while(str.indexOf(mention+' ', index+1) != -1)
			{
				let found = str.indexOf(mention+' ', index+1);
				tokens.push({
					index: found,
					length: mention.length 
				});
				index = found;

				// stopper -= 1;
				// if(stopper < 0)
				// {
				// 	break;
				// }
			}
		}

		tokens.sort((a,b)=>a.index - b.index);
		// console.log(tokens.map(token => token.index));
		let finalTextObjects = [];
		let lastIndex = 0;
		
		if(tokens.length == 0)
		{
			finalTextObjects.push({text: str});
		}
		else 
		{
			for(let i=0; i<tokens.length; i++) {
				let token = tokens[i];
				let normalText = str.substring(lastIndex, token.index);
				let mentionText = str.substr(token.index, token.length);
				finalTextObjects.push({
					text: normalText,
					type: null
				})
				
				finalTextObjects.push({
					text: mentionText,
					type: 'mention'
				})
	
				lastIndex = token.index + token.length;

				if(i == tokens.length-1)
				{
					finalTextObjects.push({
						text: str.substring(lastIndex),
						type: null
					})					
				}
			}
		}
		
		return finalTextObjects.map((textObject, index)=>{
			let isMention = (textObject.type == 'mention');

			return <Text key={index} style={{fontWeight: isMention ? 'bold' : 'normal', color: isMention ? Colors.blue : 'black'}}>{textObject.text}</Text>
		});
	}

	renderPostContent() {
		return <TextInput multiline value={''} style={{backgroundColor: Colors.lightgray, borderRadius: 12, margin: 12, height: Screen.height/4, paddingTop: 14, paddingLeft: 14}} 
			onChangeText={(text)=>this.setState({postContent: text})} spellCheck={false}>
			{this.renderAttributedText()}
		</TextInput>
	}

	async publish(content, postType, targetId) {
		await PostController.MakePost(content, postType, targetId);
	}

	render() {

		let targets = [null, ...this.state.targets];

		return <View style={{flex: 1, backgroundColor: 'white'}}>	
			<ModalHeader leftAction={{
				title: 'Back',
				action: () => this.props.navigation.goBack()
			}}
				rightAction={{
					title: 'Share',
					action: async () => {						
						await this.publish(this.state.postContent, this.state.postType, this.state.target && this.state.target._id || null);
						//TODO: trycatch error if any
						this.props.navigation.goBack();
					}
				}}
				middleAction={{
					title: 'New Testimony',
					action: () => this.requestSelectPostType()
				}}>
			</ModalHeader>
			{this.renderSelectedTarget()}			
			{this.renderPostContent()}		
			<AnimatedBottomDrawer ref={(ref)=>this.targetSelectionList = ref}>
				<View style={{height: 60, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontWeight: '600', fontSize: 16}}>select a group to post to</Text>						
					</View>
					<FlatList
						data={targets}
						renderItem={({ item: target }) => this.renderTarget(target)}
						keyExtractor={(item) => item && item._id || 'Everyone'}
					/>
			</AnimatedBottomDrawer>
			<AnimatedBottomDrawer ref={(ref)=>this.postTypeSelection = ref}>
				<View style={{flex: 1, backgroundColor: 'red'}}/>
			</AnimatedBottomDrawer>
		</View>
	}
}

export default CreatePostModal;
