import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { UserController } from '../../api/UserController';
import Colors from '../../constants/Colors';
import Images from '../../helpers/Images';

class Login extends Component {

    state = {
        username: 'mooselliot',
        password: '12345',
        isLoggedIn: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            isLoggedIn: nextProps.isLoggedIn,
        };
      }
    
    componentDidUpdate() {
        if(this.state.isLoggedIn) {
            this.props.navigation.navigate('AppScreen')
        }
    }

    async submit() {
        try {
            let response = await UserController.login(this.state.username, this.state.password);
        } catch (error) {
            Alert.alert('Login failed', error.message || 'Try again laters')          
        }
    }



    render() {
        return (
            <SafeAreaView style={{backgroundColor: Colors.offWhite, flex: 1}}>
                <TouchableWithoutFeedback style={{flex: 1}} onPress={()=>Keyboard.dismiss()}>
                    <View style={{flex: 1}}>
                        {/* <Image source={Images.logo} style={{left: 5, top: 5, height: '130%', width: '130%', position: 'absolute'}} resizeMode='contain'/>                     */}
                        <View style={{height: 160, width: 110, alignSelf: 'center', marginBottom: 20, marginTop: 50}}>
                            <Image source={Images.logo} style={{height: '100%', width: '100%'}} resizeMode='contain'/>
                        </View>
                        <View style={{flex: 1, padding: 25}}>
                            <TextInput style={styles.usernameTextInput} placeholder='username' value={this.state.username} onChangeText={(text)=>this.setState({username: text})} textContentType='username' autoCapitalize='none' autoFocus={true}/>
                            <TextInput style={styles.usernameTextInput} placeholder='password' secureTextEntry={true} value={this.state.password} onChangeText={(text)=>this.setState({password: text})} textContentType='password' autoCapitalize='none'/>
                            <TouchableOpacity style={styles.loginButton} onPress={()=>this.submit()}>
                                <Text style={{color: 'white', fontWeight: '600', fontSize: 18, letterSpacing: 3}}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    usernameTextInput: {
        backgroundColor: 'white',
        height: 45,
        margin: 5,
        paddingHorizontal: 12,
        borderRadius: 7,
        fontWeight: '600',
        fontSize: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 8
    },
    loginButton: {
        margin: 5, 
        marginTop: 34,
        backgroundColor: Colors.green, 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 50, 
        borderRadius: 100,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 8
    }
});

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.username && state.user.token !== undefined
    }
}

export default connect(
    mapStateToProps
)(Login)