import React, {Component} from 'react';
import { View, Alert, Text, ImageBackground, StyleSheet, Linking, FlatList, ToastAndroid, Platform, SafeAreaView, Dimensions} from 'react-native';
import {ListItem, Icon, BottomSheet, Button, Card, Avatar} from 'react-native-elements';
import MapView, {Marker, Polygon} from 'react-native-maps';
import {Loading} from './LoadingComponent';
import {Picker} from 'native-base';
import * as IntentLauncher from 'expo-intent-launcher';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {connect} from 'react-redux';
import {getCustomGrid} from '../redux/actions/grid';
import {getCustomSightings} from '../redux/actions/sighting';
import {fetchSpecies, getSpecie} from '../redux/actions/specie';
import {fetchBird} from '../redux/actions/bird';
import { set } from 'react-native-reanimated';

const  mapStateToProps = (state) => {
    return{
        grids: state.grids,
        sightings: state.sightings,
        species: state.species,
        birds: state.birds
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        getCustomGrid: (lat, long) => dispatch(getCustomGrid(lat, long)),
        getCustomSightings: (gridId, time) => dispatch(getCustomSightings(gridId, time)),
        fetchBird: (birdId) => dispatch(fetchBird(birdId))
    };
}


const d = new Date();

class LocationSight extends Component {

    constructor(props){
        super(props);

        this.state={
            month: d.getMonth()+1,
            sheetVisible: false,
            errorMsg: null,
            latitude: 30.73629,
            longitude:  76.7884,
            location: null,
            type: "Current",
            polygon: [],
            sightings: [],
            data: []
        }
    }

    onMonthValueChange = async (value) => {
        this.setState({
          month: value
        });

    }

    openSettingApp = () => {
        if(Platform.OS==='ios'){
            Linking.openURL('app-settings:');
        }
        else{
            IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
        }
    }
    onCustomSelect() {

        this.setState({
            type: "Custom",
            sheetVisible: true
        });
        ToastAndroid.show("Select Location By Pressing For Long.", ToastAndroid.LONG);
    }

    getData = async (sightings) => {

        var data = [];
        var spec = {};
        var birds = [];

        for(var i=0;i<sightings.length;i++)
        {
            await this.props.fetchBird(sightings[i].Species);

            birds.push(this.props.birds.birds);
        }

        let species = birds;

        for(var i=0;i<species.length;i++){

            for(var j=0;j<sightings.length;j++){

                if(sightings[j].Species.toString() === species[i].id.toString()){

                    spec.common_name = species[i].common_name;
                    spec.Count = sightings[j].Count;
                    spec.Number_of_sightings = sightings[j].Number_of_sightings;
                    spec.avgSightings = Math.floor(spec.Count/spec.Number_of_sightings);
                    spec.id = i;

                    data.push(spec);
                    spec = {};
                    break;
                }
            }
            
        }
        
        this.setState({
            data: data
        });
    }

    getLocTimeSpecies = async (e) => {

        function prepareGrid(grid){

            let polygon = [];
            let loc1 = {}
            loc1.longitude = parseFloat(grid.x_coordinate_start);
            loc1.latitude = parseFloat(grid.y_coordinate_start);
    
            let loc2 = {}
            loc2.longitude = parseFloat(grid.x_coordinate_start);
            loc2.latitude = parseFloat(grid.y_coordinate_end);
    
            let loc3 = {}
            loc3.longitude = parseFloat(grid.x_coordinate_end);
            loc3.latitude = parseFloat(grid.y_coordinate_start);
    
            let loc4 = {}
            loc4.longitude = parseFloat(grid.x_coordinate_end);
            loc4.latitude = parseFloat(grid.y_coordinate_end);
    
            polygon.push(loc1);
            polygon.push(loc2);
            polygon.push(loc4);
            polygon.push(loc3);
            polygon.push(loc1);

            
            return polygon;
        }

        if(this.state.type == "Custom"){
            let latitude = e.nativeEvent.coordinate.latitude;
            let longitude = e.nativeEvent.coordinate.longitude;
            var location = {};
            location.latitude = latitude;
            location.longitude = longitude;
            this.setState({
                latitude,longitude,
                location: location
            });

            ToastAndroid.show("Preparing Grid....", ToastAndroid.SHORT);

            await this.props.getCustomGrid(latitude.toString(), longitude.toString());
            
            let grid = this.props.grids.grids[0];
            var polygon = prepareGrid(grid);
            this.setState({
                polygon: polygon
            });

            setTimeout(() => this.setState({
                sheetVisible: false
            }), 2000);

            await this.props.getCustomSightings(grid.id, this.state.month);

            this.setState({
                sightings: this.props.sightings.sightings
            });

            this.getData(this.state.sightings);

        }
            
    }

    getLoction = async () => {

            this.setState({
                type: "Current"
            })
            let {status} = await Permissions.askAsync(Permissions.LOCATION);

            if(status !== 'granted'){
                this.setState({
                    errorMsg: 'Permission to access location is denied!'
                })
            }

            let location = await Location.getCurrentPositionAsync({});

            this.setState({
                location: location
            });

            if(this.state.errorMsg){
                Alert.alert(null, this.state.errorMsg);
                return;
            }

            var loc = JSON.parse(JSON.stringify(location));
            this.setState({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            })
    }

    componentDidMount(){

        Alert.alert(
            "Location",
            "Choose Location Type",
            [
              { 
                  text: "Custom", 
                  onPress: () => this.onCustomSelect()
              },
              {
                text: "Current",
                onPress: () => this.getLoction()
              }
            ]
          );
    }

    render() {

        const colors = ['#51adcf', '#fab95b', '#f05454']

        function renderListItem({item, index}){

            return(

                <ListItem
                    key={index}
                    containerStyle={{
                        backgroundColor: colors[1],
                        height: 100, borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%', 
                        marginTop: '3%'}}
                    pad = {30}
                >   
                    <Avatar rounded size={'large'} source={require("./images/sparrow.jpg")} icon={{name: 'user', type: 'font-awesome'}}/>
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
                                iconStyle={{marginRight: 10}} />Average Sightings -- {item.avgSightings}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        }

        let screenHeight = 2*Dimensions.get('window').height;

        const inChandigarh = () => {

            let lat = this.state.latitude;
            let lng = this.state.longitude;

            if(lat <= 30.819310 && lat > 30.632511 && lng <= 76.923046 && lat > 76.634918)
                return true;
            else
                return false;
        }


        if ((this.state.location || this.state.type === "Custom")){
            
                // if((this.state.location || this.state.type === "Custom") || inChandigarh()){

                    var list;
                    if(this.props.sightings.isLoading || this.props.species.isLoading){

                        list =  <Loading text={'Fetching Species found in selected region.....'} color='#fa4659' /> 
                    }
                    else {
                        if(this.props.sightings.sightings.length === 0){
                            list = <Text style={styles.noRecord}>No Species Recorded for given location and month.</Text>
                        }
                        else {
                            list = <FlatList
                                    data={this.state.data.sort((s1, s2) => s2.avgSightings-s1.avgSightings)}
                                    data={this.state.data}
                                    renderItem={renderListItem}
                                    keyExtractor={item => item.id.toString()}
                                    style={{marginBottom: 30}}
                                    /> 
                        }
                    }

                return (
                    <View style={styles.container}>
                        <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                        <SafeAreaView style={{flex: 1}}>
                            <BottomSheet isVisible={this.state.sheetVisible} >
                                <View style={{flex: 1, backgroundColor: 'white'}}>
                                <Text style={{textAlign: 'right', marginBottom: '0%'}}>
                                    <Icon 
                                        name='times-circle'
                                        type='font-awesome-5' 
                                        onPress={() => this.setState({sheetVisible: false})}
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
                                    onLongPress={(e) => this.getLocTimeSpecies(e)}
                                    style={{height: screenHeight-500, width: Dimensions.get('window').width}}
                                >
                                    {this.state.location
                                    ?
                                    <Marker 
                                        coordinate={{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude
                                        }}
                                        title={'Selected Location'}
                                    />
                                    :
                                    <View></View>
                                    }
                                    {this.state.polygon.length
                                    ?
                                    <Polygon 
                                        coordinates={this.state.polygon}
                                        fillColor="rgba(0, 200, 0, 0.5)"
                                        strokeColor="rgba(0,0,0,0.5)"
                                        strokeWidth={2}
                                    />
                                    :
                                    <View></View>
                                    }
                                </MapView>
                                </View>
                            </BottomSheet>
                            {list}
                        </SafeAreaView>
                        <Button
                            onPress={() => this.setState({sheetVisible: !this.state.sheetVisible})}
                            title='VIEW MAP'
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
                            }}
                            titleStyle={{padding: 20}}
                            containerStyle={{margin: 20, marginTop: 0}}
                            raised
                            />
                        <View style={{height: '10%'}}>
                            <Picker
                                style={{marginHorizontal: 20}}
                                itemStyle={{fontWeight: 'bold'}}
                                selectedValue={this.state.month}
                                onValueChange={this.onMonthValueChange.bind(this)}
                                textStyle={{color: 'white'}}

                            >
                                <Picker.Item label="January" value={1} />
                                <Picker.Item label="February" value={2} />
                                <Picker.Item label="March" value={3} />
                                <Picker.Item label="April" value={4} />
                                <Picker.Item label="May" value={5} />
                                <Picker.Item label="June" value={6} />
                                <Picker.Item label="July" value={7} />
                                <Picker.Item label="August" value={8} />
                                <Picker.Item label="September" value={9} />
                                <Picker.Item label="October" value={10} />
                                <Picker.Item label="November" value={11} />
                                <Picker.Item label="December" value={12} />
                            </Picker>
                           
                        </View>
                        </ImageBackground>
                    </View>
            );
        // }
            /*else{
                return (
                    <View style={styles.container}>
                        <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                            <Text style={styles.noRecord}>You are not in Chandigarh</Text>
                        </ImageBackground>
                    </View>
                );
            }*/
        }
        else
        {   
            return(
                <View style={styles.container}>
                    <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                        <Loading text={'Getting Location ..... \n\n Location Services Must be ON for Current Location'} color='#fa4659' />
                    </ImageBackground>
                </View>
            );
        }
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
      },
      noRecord: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0",
        textAlignVertical: 'center'
      }
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSight); 