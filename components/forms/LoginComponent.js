import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, ImageBackground, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Image, Input, Icon} from 'react-native-elements';
import {signIn} from '../../redux/actions/auth';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            password:"",
            errors:{
                userName:"",
                password:""
            }
        }
    }

    formValidation = ()=>{
        const {userName, password} = this.state;
        let userNameError="", passwordError="", error=false;
        if(!userName){
            error=true;
            userNameError="User Name is required";
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
                password:passwordError,
                userName:userNameError
            }
        })
        return !error;

    }

    handleSubmit= async()=>{
        const {userName, password} = this.state;
        if(this.formValidation()){
            console.log("Values recorded");
            const data = {username:userName, password};
            await this.props.signIn(data);
            if(this.props.auth.errMess){
                Alert.alert("Login failed",this.props.auth.errMess);
            }else if(this.props.auth.message){
                Alert.alert("Login Successfull",this.props.auth.message);
                this.props.navigation.navigate('HOME');
            }
            this.setState({
                userName:"",
                password:""
            })
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/wild2.png')} style={styles.image}>
                    <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                        <View style={{marginHorizontal: '5%', marginTop:'40%'}}>
                        <Input
                            placeholder="Enter Username...."
                            leftIcon={{ type: 'font-awesome-5', name: 'envelope', color: '#11cbd7'}}
                            leftIconContainerStyle={{marginRight: 10}}
                            onChangeText={(userName) => this.setState({userName})}
                            value={this.state.userName}
                            label='USER NAME : '
                            errorMessage = {this.state.errors.userName}
                            labelStyle={{color: 'white'}}
                            placeholderTextColor='white'
                            style={{color: 'white'}}
                        />
                        <Text/>
                        <Input
                            placeholder="Enter Password...."
                            type="password"
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
                        </View>

                        <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
                        <Button
                            onPress = {() => this.handleSubmit()}
                            title="Login"
                            titleStyle={{marginLeft: '5%'}}
                            icon={
                                <Icon
                                    name='sign-in-alt'
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

export default connect(mapStateToProps, {signIn})(Login); 