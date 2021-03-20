import React, {Component} from 'react';
import { View, Image, ImageBackground, Alert, Text, StyleSheet, ScrollView, FlatList, ToastAndroid, Platform, SafeAreaView, Dimensions} from 'react-native';
import {ListItem, Icon, BottomSheet, Button, Card, Avatar} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const data = [
    {id: 1, name: "Sparrow", category: "Common", sightings: 100, image: "./images/sparrow.jpg"},
    {id: 2, name: "Myna", category: "Common", sightings: 75, image: "./images/sparrow.jpg"},
    {id: 3, name: "Hooted Pitoui", category: "Rare", sightings: 20, image: "./images/sparrow.jpg"},
    {id: 4, name: "Robin", category: "Common", sightings: 110, image: "./images/sparrow.jpg"},
    {id: 5, name: "Great Indian Bustard", sightings: 5, category: "Endangered", image: "./images/sparrow.jpg"},
    {id: 6, name: "abcd", category: "Common", sightings: 89, image: "./images/sparrow.jpg"},
    {id: 7, name: "efgh", category: "Rare", sightings: 30, image: "./images/sparrow.jpg"},
    {id: 8, name: "ijkl", category: "Common", sightings: 98, image: "./images/sparrow.jpg"},
    {id: 9, name: "mnop", category: "Common", sightings: 70, image: "./images/sparrow.jpg"},
    {id: 10, name: "qrst", category: "Rare", sightings: 18, image: "./images/sparrow.jpg"},

];

class LocationSight extends Component {

    constructor(props){
        super(props);

        this.state={
            sheetVisible: false,
            errorMsg: null,
            latitude: 37.78825,
            longitude: -122.4324
        }
    }

    getLoction = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if(status !== 'granted'){
            this.setState({
                errorMsg: 'Permission to access location is denied!'
            })
        }

        let location = await Location.getCurrentPositionAsync({});

        if(this.state.errorMsg){
            Alert(this.state.errorMsg);
            return;
        }

        var loc = JSON.parse(JSON.stringify(location));
        this.setState({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude
        })

        console.log(this.state.location)
    }

    componentDidMount(){

        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
              'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
          }
        else 
          this.getLoction();
        ToastAndroid.show("Fetching species commonly found in your current region!!", ToastAndroid.LONG);
    }

    render() {

        const colors = ['#51adcf', '#fab95b', '#f05454']

        function renderListItem({item, index}){

            var color;

            if(item.category == "Common")
            {
                color = colors[0];
            }    
            else if(item.category == "Rare")
            {
                color = colors[1];
            }    
            else
            {
                color = colors[2];
            }

            return(

                <ListItem
    
                    key={index}
                    containerStyle={{
                        backgroundColor: color,
                        height: 100, borderRadius: 25, marginHorizontal: '3%', 
                        marginTop: '5%'}}
                    pad = {30}
                >   
                    <Avatar rounded size={'large'} source={require("./images/sparrow.jpg")} icon={{name: 'user', type: 'font-awesome'}}/>
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: 'bold', color: '#fff'}}>
                            <Icon name='feather'
                                        type="font-awesome-5" 
                                        color='white'
                                        size={15}
                                        iconStyle={{marginRight: 10}} />{item.name}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
                            <Icon name='bars'
                                    type="font-awesome-5" 
                                    color='white'
                                    size={15}
                                    iconStyle={{marginRight: 10}} />{item.category}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
                            <Icon name='eye'
                                type="font-awesome-5" 
                                color='white'
                                size={15}
                                iconStyle={{marginRight: 10}} />{item.sightings}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        }

        let screenHeight = 2*Dimensions.get('window').height;

        return (
            <ScrollView>
                <Button
                    onPress={() => this.setState({sheetVisible: !this.state.sheetVisible})}
                    title='SEE YOUR CURRENT GRID'
                    icon={
                        <Icon
                            name='map-marked-alt'
                            type='font-awesome-5'            
                            size={24}
                            color= 'white'
                        />
                    }
                    buttonStyle={{
                        backgroundColor: "#fa4659",
                        borderRadius: 10
                    }}
                    titleStyle={{padding: 20}}
                    containerStyle={{margin: 20, marginBottom: 0}}
                    raised
                    />
                <BottomSheet isVisible={this.state.sheetVisible} >
                    <View style={{flex: 1, backgroundColor: 'white'}}>
                    <Text style={{textAlign: 'right', marginBottom: '0%'}}>
                        <Icon 
                            name='times-circle'
                            type='font-awesome-5' 
                            onPress={() => this.setState({sheetVisible: !this.state.sheetVisible})}
                            size={30}
                            />
                        </Text>
                    <MapView 
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005
                        }}
                        style={{height: screenHeight-500, width: Dimensions.get('window').width}}
                    >
                        <Marker 
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                            image={require('./images/Logo.png')}
                            title={'Current Location'}
                        />
                    </MapView>
                    </View>
                </BottomSheet>
                
                <FlatList
                    data={data.sort((s1, s2) => s2.sightings-s1.sightings)}
                    renderItem={renderListItem}
                    keyExtractor={item => item.id.toString()}
                    style={{marginBottom: 30}}
                    />  
            </ScrollView>
        );
    }
}

export default LocationSight; 