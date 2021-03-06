import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, ImageBackground, Text, Alert, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { Button, Image, Input, Icon} from 'react-native-elements';
import {getImageFromGallery} from '../commonComponents/permissions'
import {updateUserProfile} from '../../redux/actions/user';

var width = Math.floor(Dimensions.get('window').width/2);
var heigth = Math.floor(Dimensions.get('window').height/3);

class UpdateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            imageUrl:"",
            blob:null,
            errors:{
                email:"",
                password:""
            }
        }
    }

    formValidation = ()=>{
        const {email, password} = this.state;
        let emailError="", passwordError="", error=false;
        if(email){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(String(email).toLowerCase())){
                error = true
                emailError="Enter a valid email";
            }
        }
        if(password && (String(password).length<4)){
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
    handleSubmit= async()=>{
        const token = this.props.auth.token;
        const username = this.props.auth.username;
        const {firstName, lastName, email, password} = this.state;
        if(this.formValidation()&&(firstName||lastName||email||password)){
            let data = {token, username}
            firstName?data["first_name"]=firstName:null;
            lastName?data["last_name"]=lastName:null;
            email?data["email"]=email:null;
            password?data["password"]=password:null;
            await this.props.updateUserProfile(data);
            if(this.props.UserProfile.errMess){
                Alert.alert("Error occured", this.props.UserProfile.errMess);
            }else if(this.props.UserProfile.data){
                Alert.alert("Update Success", "Profile updated successfully");
                this.props.navigation.navigate('MY PROFILE');
            }
        }
            
    }

    // getGalleryImage = async () => {
    //     var selectedImage  = await getImageFromGallery(width, heigth);
    //     if(selectedImage){
    //         if(!selectedImage.error){
    //             this.setState({
    //                 imageUrl: selectedImage.imageUrl,
    //                 blob: selectedImage.blob
    //             });
    
    //         }else{
    //             console.log("Error", selectedImage.error);
    //         }
    //     }else{
    //         console.log("Image not selected");
    //     }
        
    // } 

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/wild2.png')} style={styles.image}>
                    <View style={{height:'100%', backgroundColor: "#000000aa"}}>

                    <View style={{marginHorizontal: '5%', marginTop:'8%'}}>
                    <Text style={{marginBottom:'5%', color:'red'}}>** Fill only those fields that you want to edit</Text>
                        <Input
                            placeholder="Enter First Name...."
                            leftIcon={{ type: 'font-awesome-5', name: 'user', color: '#11cbd7'}}
                            leftIconContainerStyle={{marginRight: 10}}
                            onChangeText={(firstName) => this.setState({firstName})}
                            value={this.state.firstName}
                            label='FIRST NAME : '
                            labelStyle={{color: 'white'}}
                            placeholderTextColor='white'
                            style={{color: 'white'}}
                        />
                        <Input
                            placeholder="Enter Last Name...."
                            leftIcon={{ type: 'font-awesome-5', name: 'user', color: '#11cbd7'}}
                            leftIconContainerStyle={{marginRight: 10}}
                            onChangeText={(lastName) => this.setState({lastName})}
                            value={this.state.lastName}
                            label='LAST NAME : '
                            labelStyle={{color: 'white'}}
                            placeholderTextColor='white'
                            style={{color: 'white'}}
                        />
                        <Input
                            placeholder="Enter new Email...."
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
                            placeholder="Enter new Password...."
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
                        {/* <View style={{width: '45%', paddingLeft: '2%', marginTop:'5%', marginBottom:'3%'}}>
                            <Button
                                title="Upload Image"
                                onPress={this.getGalleryImage}
                                buttonStyle={{backgroundColor: '#85603f', borderRadius: 28}}
                                titleStyle={{color: "white", fontWeight: "bold", paddingHorizontal: '5%'}}
                            />
                        </View>
                        <View style={{marginBottom:'10%', marginLeft:'6%'}}>
                            <Text>
                                {!this.state.imageUrl && <Text style={{marginTop:'2%', color:'orange'}}>No image selected</Text>}
                                {this.state.imageUrl && <Text style={{marginTop:'2%', color:'green'}}>Image selected successfully</Text>}
                            </Text>
                        </View> */}

                        <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
                            <Button
                                onPress = {() => this.handleSubmit()}
                                title="Update Profile"
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
        auth: state.Auth,
        UserProfile: state.UserProfile

    })

}

export default connect(mapStateToProps,{updateUserProfile})(UpdateUser); 