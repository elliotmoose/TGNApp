import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ModalHeader from './ModalHeader';
import Colors from '../constants/Colors';
import { Screen } from '../constants/Sizing';
import Images from '../helpers/Images';

class CreateModal extends Component {

	state = {
		target: {
			_id: '12345689',
			name: 'Bethel AOG',
			handle: 'bethelaog',
		},
		postContent: ''
	}
	
	renderTargetSelection() {
		const targetSelectionHeight = 70;
		const padding = 12;
		let targetName = (this.state.target && this.state.target.name) || 'Everyone';
		return <TouchableOpacity style={{height: targetSelectionHeight, padding}}>
			<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
				<Image source={Images.chevron} resizeMode='contain' style={{tintColor: Colors.primary, transform: [{rotate: '-90deg'}], width: 40, aspectRatio: 1}}/>
				<Image source={null} resizeMode='cover' style={{borderRadius: targetSelectionHeight/2, height: '100%', aspectRatio: 1, backgroundColor: Colors.darkGray, marginRight: 12}}/>
				<Text style={{fontWeight: '700'}}>{targetName}</Text>
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

	publish() {

	}

	render() {
		return <View style={{flex: 1, backgroundColor: 'white'}}>
			<ModalHeader leftAction={{
				title: 'Back',
				action: () => this.props.navigation.goBack()
			}}
				rightAction={{
					title: 'Share',
					action: () => {
						this.props.navigation.goBack();

					}
				}}
				middleAction={{
					title: 'New Testimony',
					action: () => { }
				}}>
			</ModalHeader>
			{this.renderTargetSelection()}			
			{this.renderPostContent()}			
		</View>
	}
}

export default CreateModal;
