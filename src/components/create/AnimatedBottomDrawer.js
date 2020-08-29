import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

class AnimatedBottomDrawer extends Component {

	state = {
		activeProgress: new Animated.Value(0),
		fullyActive: false,
		inProgress: false,
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
			this.inProgress = false;
			this.setState({ fullyActive: fadeIn });
		});
	}

	render() {	
		return <Animated.View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: 'null', justifyContent: 'flex-end' }} pointerEvents={this.state.fullyActive ? 'auto' : 'none'} >
				<TouchableWithoutFeedback style={{ position: 'absolute', height: '100%', width: '100%' }} onPress={() => this.fade(false)}>
					<Animated.View style={{ flex: 1, backgroundColor: 'black', opacity: this.state.activeProgress.interpolate({ inputRange: [0, 1], outputRange: [0, 0.25]}) }} />
				</TouchableWithoutFeedback>
				<Animated.View style={{ height: this.state.activeProgress.interpolate({ inputRange: [0, 1],outputRange: ['0%', '50%']}), backgroundColor: 'white' }}>
					{this.props.children}
				</Animated.View>
		</Animated.View>
	}
}

export default AnimatedBottomDrawer;
