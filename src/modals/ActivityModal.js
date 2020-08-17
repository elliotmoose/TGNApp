import React,{Component} from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

export default class ActivityModal extends Component
{

    render()
    {        
        return (
            <Modal animationType='fade' visible={this.props.visible} transparent={true}>
                <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.32, alignItems: 'center', justifyContent: 'center' }} ></View>
                <View  style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <ActivityIndicator color='white' style={{width: 40,height:40}}/>
                </View>
            </Modal>
        )
    }
}