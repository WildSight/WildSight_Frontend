import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, FlatList, View, Image, ImageBackground, Text, StyleSheet, ScrollView} from 'react-native';
import { ListItem, Icon, BottomSheet, Button, Card, Avatar} from 'react-native-elements';
import {getUserProfile, fetchUserSightings} from '../redux/actions/user'

import {fetchBird} from '../redux/actions/bird';
import { SafeAreaView } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            limit:10,
            skip:-1,
            userSightings:[],
            sheetVisible: false,
            latitude: 30.73629,
            longitude:  76.7884,
            refreshing: false,
            isCompleted: false,
            count:0
        }
    }

    componentDidMount =async()=>{
        const authToken = this.props.auth.token;
        await this.props.getUserProfile({token:authToken});
        this.retrieveData();
    }

    retrieveData= async()=>{
        if (this.state.refreshing||this.state.isCompleted){
            return null;
        }
        const authToken = this.props.auth.token;
        this.setState({
            refreshing:true
        })
        try{
            await this.props.fetchUserSightings({token:authToken, limit:this.state.limit, skip:this.state.skip+1})
            let userSightings = this.props.UserSightings.data;
            if(userSightings.length==0){
                this.setState({
                    refreshing:false,
                    isCompleted:true
                })
                return null;
            }
            let data = []
            let count = this.state.count+1;
            for(var i=0;i<userSightings.length;i++){
            let temporary_id=count+i;
            let sighting = userSightings[i];
            let common_name;
            if(userSightings[i].species){
                await this.props.fetchBird(userSightings[i].species);
                common_name = this.props.birds.birds.common_name;
            }else{
                common_name = userSightings[i].new_species;
            }
            
            let obj = {...sighting, temporary_id, common_name}
            count = count + data.length;
            data.push(obj);
            }
            var prevData = this.state.userSightings;
            const resData = prevData.concat(data)
            this.setState({
                userSightings:resData,
                skip:this.state.skip+1,
                refreshing:false,
                count
            })

        }catch(e){
            console.log(e);
            this.setState({
                refreshing:false
              })
        }

    }
    renderListTempelate = (props)=>{
        const {item, index} = props;
        
        return(
            <ListItem
                key={index}
                containerStyle={{
                    backgroundColor: "#51adcf",
                    height: "auto", borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%', 
                    marginTop: '3%', marginBottom: '2%'}}
                pad = {30}
            >   
                {(item.image&&<Avatar rounded size={'large'} source={{uri: item.image}} icon={{name: 'user', type: 'font-awesome'}}/>)||
                 (<Avatar rounded size={'large'} source={require("./images/Logo.png")} icon={{name: 'user', type: 'font-awesome'}}/>)
                }
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold', color: '#fff', marginBottom:5}}>
                        <Icon name='feather'
                                    type="font-awesome-5" 
                                    color='white'
                                    size={15}
                                    iconStyle={{marginRight: 10}} />{item.common_name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff', marginBottom:5}}>
                        <Icon name='eye'
                            type="font-awesome-5" 
                            color='white'
                            size={15}
                            iconStyle={{marginRight: 10}} />{item.count}
                    </ListItem.Subtitle>
                    
                    <ListItem.Subtitle onPress={() => this.setState({
                      sheetVisible: !this.state.sheetVisible,
                      latitude: parseFloat(item.location_latitude),
                      longitude: parseFloat(item.location_longitude)
                    })} style={{ fontWeight: 'bold', color: '#fff', marginBottom:5}}>
                        <Icon name='map-marker-alt' type="font-awesome-5"  color='#4b778d' size={15}
                            iconStyle={{marginRight: 10}} />{item.location_latitude +", "+ item.location_longitude}
                    </ListItem.Subtitle>
                    
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#eee', marginBottom:5}}>
                        <Icon name='calendar-alt' type="font-awesome-5"  color='#eee' size={15}
                            iconStyle={{marginRight: 10}} />
                            {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour:'numeric', minute:'numeric'}).format(new Date(Date.parse(item.date_time)))}
                    </ListItem.Subtitle>
                    
                </ListItem.Content>
            </ListItem>
        );

    }
    renderFooter=()=>{
        if (this.state.refreshing) {
          return <ActivityIndicator size="large" animating={true} color="#125112" />;
        } else {
          return null;
        }
    }

    getSightingsList = ()=>{
        let userSightings =  this.state.userSightings;
        if(userSightings.length>0){
            return(
                <FlatList
                    data={this.state.userSightings}
                    renderItem={this.renderListTempelate}
                    keyExtractor={item =>{
                        return item.temporary_id.toString()}
                    }
                    style={{marginBottom: 30}}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onEndReached={this.retrieveData}
                    onEndReachedThreshold={0.000000001}
                />

            )
        }
        return(
            <Text style={{marginTop:'10%', fontSize:30, textAlign:'center'}}>Loading User Sightings <ActivityIndicator 
                size='large' animating={true} color="#125112"/>
            </Text>
        )
    }

    render() {
        if(this.props.UserProfile.data){
            const user = this.props.UserProfile.data;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                <ScrollView >
                <View>
                <Card key={1}
                    containerStyle={{
                        backgroundColor: '#fab95b',
                        borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%'
                    }} style={{justifyContent:'center', backgroundColor: '#fff'}}>
                    <View style={{marginBottom: 10,marginLeft:'auto', marginRight:'auto' }}>
                        <Avatar containerStyle={{justifyContent:'center', borderColor:'#000', borderWidth:2}}  rounded size={'xlarge'} source={require("./images/user.png")} />
                    </View>
                    <Card.Title style={{fontSize:26, textAlign:'left'}}>
                    <Icon type = 'font-awesome-5' name='at' iconStyle={{marginRight: 10}}/>
                    {user.username}
                    </Card.Title>
                        
                    <View style={{marginBottom: 10}}>
                        <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff', marginBottom:10}}>
                                    <Text><Icon name='envelope' type="font-awesome-5"  color='white' size={18}
                                        iconStyle={{marginRight: 10, transform: [{ translateY: 3}]}} /></Text>
                                    <Text style={{fontSize:18, transform: [{ translateY: -1}]}}>{user.email}</Text>
                                </ListItem.Subtitle>
                        <Text>{user.first_name&&
                        <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff', marginBottom:10}}>
                            <Text><Icon name='user' type="font-awesome-5" color='white' size={18}
                                iconStyle={{marginRight: 10, transform: [{ translateY: 3}]}} /></Text>
                            <Text style={{fontSize:18, transform: [{ translateY: -1}]}}>{user.first_name+" "+user.last_name}</Text>
                        </ListItem.Subtitle>
                        }</Text>
                        
                                
                        
                    </View>

                    <View style={{ justifyContent:'space-between'}}>
                        <Button
                        onPress={() => this.props.navigation.navigate('UPDATE PROFILE')}
                        icon={<Icon name='user-alt' type="font-awesome-5"  color='white' iconStyle={{marginRight:10}}/>}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        title='Update profile' />
                    </View>
                </Card>
                    {this.getSightingsList()}
                <View>
                    
                </View>
                </View>
                </ScrollView>
                </View>
                </ImageBackground>
            </View>
        );
        }else return(
            <>
                <View style={styles.container}>
                    <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                        <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                            <Text style={{marginTop:'50%', fontSize:30, textAlign:'center'}}>Loading <ActivityIndicator 
                                size='large' animating={true} color="#125112"/>
                            </Text>
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