import React, { Component } from "react";
import { KeyboardAvoidingView, Text, View, Alert, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import db from "../Config";
import * as firebase from 'firebase';

export default class LoginScreen extends Component{
  constructor(){
    super();
    this.state = {
      emailID: '',
      password: ''
    }  
  }

  login = async(emailID, password)=>{
    if(emailID && password){
      try {
        const response = await firebase.auth().signInWithEmailAndPassword(emailID, password);
        console.log(response);
        if(response){
          this.props.navigation.navigate('WriteStory');
        }
      }
      catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('User does not exist.')
            break;

          case 'auth/invalid-email':
            Alert.alert('Incorrect email or password');
            break;
        
          default:
            break;
        }
      }
    }
    else{
      Alert.alert("Please enter Email and Password.");
    }
  }
  render(){
    return(
      <KeyboardAvoidingView style = {{alignItems:'center', marginTop:20}}>
        <View>
          <TextInput
            style = {styles.loginBox}
            placeholder = "abcd1234@example.com"
            keyboardType = "email-address"
            onChangeText = {text=>{
              this.setState({emailID:text});
            }}
          />
          <TextInput
            style = {styles.loginBox}
            placeholder = "Enter password"
            secureTextEntry = {true}
            onChangeText = {text=>{
              this.setState({password:text});
            }}
          />          
        </View>
        <View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={()=>{
              this.login(this.state.emailID, this.state.password)
            }}>
            <Text style = {{textAlign:'center'}}>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  submitButton: {
    height:30,
    width:90,
    borderWidth:1,
    marginTop:20,
    paddingTop:5,
    borderRadius:7
  }
});