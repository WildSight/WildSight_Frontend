import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import {ListItem, Icon, BottomSheet, Button, Card, Avatar} from 'react-native-elements';

class Profile extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                <View>
                <Card key={1}
                    containerStyle={{
                        backgroundColor: '#fab95b',
                        borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%', 
                        marginTop: '3%'
                    }} style={{justifyContent:'center', backgroundColor: '#fff'}}>
                    <View style={{marginBottom: 10,marginLeft:'auto', marginRight:'auto' }}>
                        <Avatar containerStyle={{justifyContent:'center', borderColor:'#000', borderWidth:2}}  rounded size={'xlarge'} source={require("./images/user.png")} />
                    </View>
                    <Card.Title style={{fontSize:34, textAlign:'left'}}>
                    <Icon type = 'font-awesome-5' name='at' iconStyle={{marginRight: 10}}/>
                    {"Username"}
                    </Card.Title>
                        
                    <View style={{marginBottom: 10}}>
                        <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
                            <Icon name='user' type="font-awesome-5" color='white' size={18}
                                iconStyle={{marginRight: 10, transform: [{ translateY: 3}]}} />
                            <Text style={{fontSize:18, transform: [{ translateY: -1}]}}>{"Rocky"+" "+"Suarez"}</Text>
                        </ListItem.Subtitle>

                        <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
                            <Icon name='envelope' type="font-awesome-5"  color='white' size={18}
                                iconStyle={{marginRight: 10, transform: [{ translateY: 3}]}} />
                            <Text style={{fontSize:18, transform: [{ translateY: -1}]}}>{"testmail@google.com"}</Text>
                        </ListItem.Subtitle>
                    </View>

                    <View style={{ justifyContent:'space-between'}}>
                        <Button
                        icon={<Icon name='user-alt' type="font-awesome-5"  color='white' iconStyle={{marginRight:10}}/>}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        title='Update profile' />
                    </View>
                </Card>
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

export default Profile; 