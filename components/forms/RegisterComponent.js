import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, ImageBackground, Text, Alert, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { Button, Input, Icon} from 'react-native-elements';
import {signUp} from '../../redux/actions/auth';
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            email:"",
            password:"",
            errors:{
                userName:"",
                email:"",
                password:""
            }
        }
    }
    formValidation = ()=>{
        const {userName, email, password} = this.state;
        let userNameError ="", emailError="", passwordError="", error=false;
        if(!userName){
            error=true;
            userNameError="Username is required";
        }
        if(!email){
            error=true;
            emailError="Email is required";
        }else{
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(String(email).toLowerCase())){
                error = true
                emailError="Enter a valid email";
            }
        }
        if(!password){
            error=true;
            passwordError="Password is required";
        }else if(String(password).length<4){
            error=true;
            passwordError="Password should be 4 or more characters long";
        }
        this.setState({
            errors:{
                userName:userNameError,
                password:passwordError,
                email:emailError
            }
        })
        return !error;

    }
    handleSubmit= async()=>{
        const {userName, email, password} = this.state;
        if(this.formValidation()){
            console.log("Data recorded");
            const data = {username:userName, email, password};
            await this.props.signUp(data);
            if(this.props.auth.errMess){
                Alert.alert("Registration failed",this.props.auth.errMess);
            }else if(this.props.auth.message){
                Alert.alert("Registration Successfull",this.props.auth.message);
            }
            this.setState({
                userName:"",
                email:"",
                password:""
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/wild2.png')} style={styles.image}>
                    <View style={{height:'100%', backgroundColor: "#000000aa"}}>

                    <View style={{marginHorizontal: '5%', marginTop:'10%'}}>
                        <Input
                            placeholder="Enter Username...."
                            leftIcon={{ type: 'font-awesome-5', name: 'user', color: '#11cbd7'}}
                            leftIconContainerStyle={{marginRight: 10}}
                            onChangeText={(userName) => this.setState({userName})}
                            value={this.state.userName}
                            label='USER NAME : '
                            errorMessage = {this.state.errors.userName}
                            labelStyle={{color: 'white'}}
                            placeholderTextColor='white'
                            style={{color: 'white'}}
                        />
                        
                        <Input
                            placeholder="Enter Email...."
                            leftIcon={{ type: 'font-awesome-5', name: 'envelope', color: '#11cbd7'}}
                            leftIconContainerStyle={{marginRight: 10}}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            label='EMAIL : '
                            errorMessage = {this.state.errors.email}
                            labelStyle={{color: 'white'}}
                            placeholderTextColor='white'
                            style={{color: 'white'}}
                        />
                        <Input
                            placeholder="Enter Password...."
                            leftIcon={{ type: 'font-awesome-5', name: 'user-lock', color: '#11cbd7'}}
                            leftIconContainerStyle={{marginRight: 10}}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            label='PASSWORD : '
                            errorMessage = {this.state.errors.password}
                            secureTextEntry={true}
                            labelStyle={{color: 'white'}}
                            placeholderTextColor='white'
                            style={{color: 'white'}}
                        />

                        <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
                            <Button
                                onPress = {() => this.handleSubmit()}
                                title="Register User"
                                titleStyle={{marginLeft: '5%'}}
                                icon={
                                    <Icon
                                        name='user-plus'
                                        type='font-awesome-5'            
                                        size={24}
                                        color= 'white'
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: '#85603f',
                                    borderRadius: 28
                                }}
                            />
                        </View>
                    </View>
                    </View>
                    
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#00000099"
      }
});

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth: state.Auth
    })

}
export default connect(mapStateToProps, {signUp})(Register); 