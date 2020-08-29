import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, SafeAreaView, Animated, TouchableWithoutFeedback } from 'react-native';
import { UserController } from '../api/UserController';
import ImageLoader from '../api/ImageLoader';
import Colors from '../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';

class TargetSelectionList extends Component {


	state = {
		activeProgress: new Animated.Value(0),
		fullyActive: false,
		inProgress: false,
	}

	componentDidMount() {
		this.state.activeProgress.addListener(({ value }) => this._activeProgress = value);
		this._activeProgress = 0;
		// this.fade(true);
	}

	selectTarget(target) {
		this.fade(false);
		this.props.onSelectTarget(target);
	}

	fade(fadeIn) {
		if (this.inProgress) {
			return;
		}

		this.inProgress = true;
		Animated.timing(this.state.activeProgress, {
			toValue: fadeIn ? 1 : 0,
			duration: 250,
			useNativeDriver: false
		}).start(() => {
			// !fadeIn && this.props.onDismiss();
			this.inProgress = false;
			this.setState({ fullyActive: fadeIn });
		});
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

	render() {
		let targets = [null, ...this.props.targets];

		return <Animated.View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'null', justifyContent: 'flex-end' }} pointerEvents={this.state.fullyActive ? 'auto' : 'none'} >
				<TouchableWithoutFeedback style={{ position: 'absolute', height: '100%', width: '100%' }} onPress={() => this.fade(false)}>
					<Animated.View style={{ flex: 1, backgroundColor: 'black', opacity: this.state.activeProgress.interpolate({ inputRange: [0, 1], outputRange: [0, 0.25]}) }} />
				</TouchableWithoutFeedback>
				<Animated.View style={{ height: this.state.activeProgress.interpolate({ inputRange: [0, 1],outputRange: ['0%', '50%']}), backgroundColor: 'white' }}>
					<View style={{height: 60, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontWeight: '600', fontSize: 16}}>select a group to post to</Text>						
					</View>
					<FlatList
						data={targets}
						renderItem={({ item: target }) => this.renderTarget(target)}
						keyExtractor={(item) => item && item._id || 'Everyone'}
					/>
				</Animated.View>
		</Animated.View>
	}
}

export default TargetSelectionList;
