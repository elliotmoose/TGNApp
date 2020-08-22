import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Images from '../helpers/Images';

class ModalHeader extends Component {
    
    render() {
        let {leftAction, rightAction, middleAction} = this.props;
        let leftText = leftAction && leftAction.title;
        let middleText = middleAction && middleAction.title;
        let rightText = rightAction && rightAction.title;

        return <SafeAreaView edges={['top']} style={{marginHorizontal: 15}}>
            <View style={{width: '100%', height: 50, justifyContent: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={leftAction && leftAction.action} style={{...styles.actionButtonStyle}}>
                    <Text style={styles.actionButtonTextStyle}>{leftText}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={middleAction && middleAction.action} style={{...styles.actionButtonStyle, flex: 1}}>
                    <View style={{flexDirection: 'row', height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: 16}}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>{middleText}</Text>
                        <Image source={Images.chevron} resizeMode='contain' style={{width: 40, aspectRatio: 1, tintColor: Colors.primary}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={rightAction && rightAction.action} style={{...styles.actionButtonStyle}}>
                    <Text style={{...styles.actionButtonTextStyle}}>{rightText}</Text>
                </TouchableOpacity>
            </View>
            <View style={{height: 1.2,  backgroundColor: Colors.gray, marginTop: 8}}/>
        </SafeAreaView>
    }
}

const styles = StyleSheet.create({
    actionButtonStyle: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    actionButtonTextStyle: {
        color: Colors.primary,
        fontWeight: '700'        
    }
});

export default ModalHeader;
