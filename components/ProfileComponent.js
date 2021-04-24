import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FlatList, View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import { ListItem, Icon, BottomSheet, Button, Card, Avatar} from 'react-native-elements';
import {getUserProfile, fetchUserSightings} from '../redux/actions/user'

import {fetchBird} from '../redux/actions/bird';
class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userSightings:[]
        }
    }

    componentDidMount = async()=>{
        const authToken = this.props.auth.token;
        await this.props.getUserProfile({token:authToken});
        await this.props.fetchUserSightings({token:authToken})
        let userSightings = this.props.UserSightings.data;
        let data = []
        for(var i=0;i<userSightings.length;i++){
          let temporary_id=i;
          let sighting = userSightings[i];
          await this.props.fetchBird(userSightings[i].species);
          let obj = {...sighting, temporary_id, common_name:this.props.birds.birds.common_name}
          data.push(obj);
        }
        this.setState({
            userSightings:data
        })
    }
    renderListTempelate = (props)=>{
        const {item, index} = props;
        
        return(
            <ListItem
                key={index}
                containerStyle={{
                    backgroundColor: "#51adcf",
                    height: 100, borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%', 
                    marginTop: '3%'}}
                pad = {30}
            >   
                {(item.image&&<Avatar rounded size={'large'} source={{uri: item.image}} icon={{name: 'user', type: 'font-awesome'}}/>)||
                 (<Avatar rounded size={'large'} source={require("./images/Logo.png")} icon={{name: 'user', type: 'font-awesome'}}/>)
                }
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='feather'
                                    type="font-awesome-5" 
                                    color='white'
                                    size={15}
                                    iconStyle={{marginRight: 10}} />{item.common_name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='eye'
                            type="font-awesome-5" 
                            color='white'
                            size={15}
                            iconStyle={{marginRight: 10}} />{item.count}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );

    }

    getSightingsList = ()=>{
        let userSightings =  this.state.userSightings;
        if(userSightings){
            return(
                <FlatList
                    data={this.state.userSightings}
                        renderItem={this.renderListTempelate}
                        keyExtractor={item =>{
                        return item.temporary_id.toString()}
                        }
                        style={{marginBottom: 30}}
                        />

            )
        }
        


    }

    render() {
        if(this.props.UserProfile.data){
            const user = this.props.UserProfile.data;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                <View>
                <Card key={1}
                    containerStyle={{
                        backgroundColor: '#fab95b',
                        borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%'
                    }} style={{justifyContent:'center', backgroundColor: '#fff'}}>
                    <View style={{marginBottom: 10,marginLeft:'auto', marginRight:'auto' }}>
                        <Avatar containerStyle={{justifyContent:'center', borderColor:'#000', borderWidth:2}}  rounded size={'xlarge'} source={require("./images/user.png")} />
                    </View>
                    <Card.Title style={{fontSize:34, textAlign:'left'}}>
                    <Icon type = 'font-awesome-5' name='at' iconStyle={{marginRight: 10}}/>
                    {user.username}
                    </Card.Title>
                        
                    <View style={{marginBottom: 10}}>
                        <Text>{user.first_name?<ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
                            <Icon name='user' type="font-awesome-5" color='white' size={18}
                                iconStyle={{marginRight: 10, transform: [{ translateY: 3}]}} />
                            <Text style={{fontSize:18, transform: [{ translateY: -1}]}}>{user.first_name+" "+user.last_name}</Text>
                        </ListItem.Subtitle>:''
                        }</Text>
                        <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
                            <Icon name='envelope' type="font-awesome-5"  color='white' size={18}
                                iconStyle={{marginRight: 10, transform: [{ translateY: 3}]}} />
                            <Text style={{fontSize:18, transform: [{ translateY: -1}]}}>{user.email}</Text>
                        </ListItem.Subtitle>
                    </View>

                    <View style={{ justifyContent:'space-between'}}>
                        <Button
                        onPress={() => this.props.navigation.navigate('UPDATE PROFILE')}
                        icon={<Icon name='user-alt' type="font-awesome-5"  color='white' iconStyle={{marginRight:10}}/>}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        title='Update profile' />
                    </View>
                </Card>
                {this.state.userSightings && this.getSightingsList()}
                <View>
                    
                </View>
                </View>
                
                </View>
                </ImageBackground>
            </View>
        );
        }
        return(
            <>
                <View style={styles.container}>
                    <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                        <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                            <Text style={{marginTop:'50%', fontSize:40, textAlign:'center'}}>Trying to fetch...</Text>
                        </View>
                    </ImageBackground>
                </View>
            </>
        )
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

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth: state.Auth,
        UserSightings: state.UserSightings,
        UserProfile: state.UserProfile,
        birds:state.birds
    })

}

export default connect(mapStateToProps,{getUserProfile, fetchUserSightings, fetchBird})(Profile); 