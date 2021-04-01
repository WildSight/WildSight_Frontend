import React, {Component} from 'react';
import { View, ImageBackground, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Image, Input, Icon} from 'react-native-elements';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            errors:{
                email:"",
                password:""
            }
        }
    }

    formValidation = ()=>{
        const {email, password} = this.state;
        let emailError="", passwordError="", error=false;
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
                password:passwordError,
                email:emailError
            }
        })
        return !error;

    }

    handleSubmit= ()=>{
        if(this.formValidation()){
            console.log("Values recorded");
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/wild2.png')} style={styles.image}>
                    <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                        <View style={{marginHorizontal: '5%', marginTop:'40%'}}>
                        <Input
                            placeholder="Enter Email...."
                            leftIcon={{ type: 'font-awesome-5', name: 'envelope'}}
                            leftIconContainerStyle={{marginRight: 10}}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            label='EMAIL : '
                            errorMessage = {this.state.errors.email}
                        />
                        <Text/>
                        <Input
                            placeholder="Enter Password...."
                            type="password"
                            leftIcon={{ type: 'font-awesome-5', name: 'user-lock'}}
                            leftIconContainerStyle={{marginRight: 10}}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            label='PASSWORD : '
                            errorMessage = {this.state.errors.password}
                            secureTextEntry={true}
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
        backgroundColor: "#000000a0"
      }
});

export default Login; 