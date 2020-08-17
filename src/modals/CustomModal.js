import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, TextInput, Image, Modal, Text, View, TouchableWithoutFeedback, TouchableOpacity, Clipboard, Alert, ActivityIndicator, Platform, BackHandler} from 'react-native'
import ActivityModal from './ActivityModal';
import PropTypes from 'prop-types'

type Props = {
    visible : boolean,
    preventDismissOnTap : Boolean,
    onDismiss : () => void, 
    selectAreaAction? : () => void,
    containerHeight : any,    
    containerWidth : any
}

export default class CustomModal extends Component<Props>
{
    state = {                
        currentCode : '',
        loading : false
    }

    setLoading(isLoading)
    {        
        this.setState({loading: isLoading})
    }    

    render()
    {                               
        return <Modal animationType='fade' visible={this.props.visible} transparent={true} onRequestClose={()=>this.props.onDismiss()}>
            <TouchableWithoutFeedback onPress={this.props.onDismiss}>
                <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.32 }} />

                    <KeyboardAvoidingView behavior={'padding'} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: this.props.containerWidth, height: this.props.containerHeight, backgroundColor: 'white', borderRadius: 23, alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                            <TouchableWithoutFeedback style={{ width: '100%', height: '100%', alignItems: 'center' }} onPress={(event) => {this.props.preventDismissOnTap || event.preventDefault(); this.props.selectAreaAction }}>
                                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                    {this.props.children}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>    
                                                
                        <ActivityModal visible={this.state.loading}/>                        
                    </KeyboardAvoidingView>

                    
                </View>
                </TouchableWithoutFeedback>
            </Modal>
    }
}

CustomModal.defaultProps = {
    containerHeight: '70%',
    containerWidth: '70%',
    preventDismissOnTap : false,
    selectAreaAction: ()=>{}
}