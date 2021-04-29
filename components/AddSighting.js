import React, {Component} from 'react';
import { View, ScrollView, Text, Alert, Dimensions, TouchableOpacity, ToastAndroid, FlatList, SectionList} from 'react-native';
import { Button, Image, Input, Icon, BottomSheet, ListItem} from 'react-native-elements';
import Moment from 'moment';
import MapView, {Marker} from 'react-native-maps';
import {openSettingApp, getImageFromGallery, getImageFromCamera, getUserLoction} from './commonComponents/permissions';
import { connect } from "react-redux";
import {fetchSpecies, searchSpecie} from '../redux/actions/specie';
import {getCustomGrid} from '../redux/actions/grid';
import {postRawSighting} from '../redux/actions/rawsighting';
import {getCustomSpeciesLocationSightings} from '../redux/actions/sighting';
import {Loading} from './LoadingComponent';
import { SafeAreaView } from 'react-native';
import {DatePicker} from 'native-base';



var width = Dimensions.get('window').width;
var heigth = Math.floor(Dimensions.get('window').height/3);
let screenHeight = 2*Dimensions.get('window').height;

const  mapStateToProps = (state) => {
    return{
        species: state.species,
        grids: state.grids,
        sightings: state.sightings,
        rawsightings: state.rawsightings,
        Auth: state.Auth
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchSpecies: () => dispatch(fetchSpecies()),
        searchSpecie: (birdFilter) => dispatch(searchSpecie(birdFilter)),
        getCustomGrid: (lat, long) => dispatch(getCustomGrid(lat, long)),
        postRawSighting: (rawSighting, token) => dispatch(postRawSighting(rawSighting, token)),
        getCustomSpeciesLocationSightings: (gridId, time, specieId) => dispatch(getCustomSpeciesLocationSightings(gridId, time, specieId))
    };
}


class AddSighting extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            name: '',
            locCoords: 'Enter Current or Custom Location..',
            birdCount: '',
            dateString: '',
            sheetVisible: false,
            imageUrl: 'abc.png',
            blob: null,
            showDatePicker: false,
            date: new Date(),
            dateTime: '',
            errorMsg: null,
            latitude: 30.73629,
            longitude:  76.7884,
            location: null,
            errors: {
                name: "",
                locCoords: "",
                birdCount: "",
                dateString: ""
            },
            searchErr: '',
            birds: [],
            birdId: ''
        }
    }


    formValidation = ()=>{
        const {name, locCoords, birdCount, dateString} = this.state;
        let nameError ="", locError="", birdCountError="", dateStringError="", error=false;
        if(!name){
            error=true;
            nameError="Name is required";
        }
        if(locCoords==="Enter Current or Custom Location.."){
            error=true;
            locError="Location is required";
        }
        if(!birdCount){
            error=true;
            birdCountError="Bird Count is required";
        }
        if(!dateString){
            error=true;
            dateStringError="Date Time is required";
        }
        this.setState({
            errors:{
                name:nameError,
                locCoords:locError,
                birdCount:birdCountError,
                dateString:dateStringError
            }
        })
        return !error;

    }

    handleSubmit = async () => {

        if(this.formValidation())
        {

            await this.props.getCustomGrid(this.state.latitude.toString(), this.state.longitude.toString());
            
            let grid = this.props.grids.grids[0];
            var sightings = null;
            if(grid && grid.id)
            {
                await this.props.getCustomSpeciesLocationSightings(grid.id, Moment(this.state.date).format('M'), this.state.birdId);
                sightings = this.props.sightings.sightings[0];
            }    

            var rawSighting = {};

            var credibilityError = 1;
            if(!sightings || this.state.imageUrl !== 'abc.png'){
                rawSighting.credible = false;
            }
            else{

                var averageSightings = parseFloat(sightings.Count)/parseFloat(sightings.Number_of_sightings);
                credibilityError = Math.abs(averageSightings-parseFloat(this.state.birdCount))/averageSightings;

                if(credibilityError <= 0.3){
                    rawSighting.credible = true;
                }   
                else
                    rawSighting.credible = false; 
            } 
            
            credibilityError = credibilityError.toFixed(4);
            var credibilityScore = 100*(1-credibilityError);
            ToastAndroid.show("Current Credibilty Score of sighting: "+credibilityScore.toString()+"%", ToastAndroid.LONG);

            rawSighting.image = this.state.imageUrl
            rawSighting.user = this.props.Auth.username.toString();
            rawSighting.count = this.state.birdCount;
            rawSighting.species = this.state.name.toString();
            rawSighting.date_time = Moment(this.state.date).format('YYYY-MM-DD HH:mm');
            rawSighting.location_longitude = parseFloat(this.state.longitude.toFixed(6));
            rawSighting.location_latitude = parseFloat(this.state.latitude.toFixed(6));

            await this.props.postRawSighting(rawSighting, this.props.Auth.token);
        }
    
    }

    dateSelect(Date){
        
        this.setState({
            date: Date,
            dateString: Date.toString()
        })
    }

    getCameraImage= async()=>{
        var selectedImage= await getImageFromCamera(width, heigth);
        if(selectedImage){
            if(!selectedImage.error){
                this.setState({
                    imageUrl: selectedImage.imageUrl,
                    blob: selectedImage.blob
                });
    
            }else{
                console.log("Error", selectedImage.error);
            }
        }else{
            console.log("Image not selected");
        }
    }
    
    getGalleryImage = async () => {
        var selectedImage  = await getImageFromGallery(width, heigth);
        if(selectedImage){
            if(!selectedImage.error){
                this.setState({
                    imageUrl: selectedImage.imageUrl,
                    blob: selectedImage.blob
                });
    
            }else{
                console.log("Error", selectedImage.error);
            }
        }else{
            console.log("Image not selected");
        }
        
    }

    getLoction = async ()=>{
        let location = await getUserLoction();
        if(location.error){
            this.setState({
                errorMsg: location.error
            })
            Alert.alert(null, location.error);
            return;
        }

        let loc = JSON.parse(JSON.stringify(location));
        let latitude = loc.coords.latitude;
        let longitude = loc.coords.longitude
        this.setState({
            latitude,longitude,
            locCoords:latitude.toString()+" "+longitude.toString()
        })
    }

    getCustomLocation = (e) => {

        let latitude = e.nativeEvent.coordinate.latitude;
        let longitude = e.nativeEvent.coordinate.longitude;
        this.setState({
            latitude,longitude,
            locCoords:latitude.toString()+" "+longitude.toString(),
        })
        setTimeout(() => this.setState({
            sheetVisible : !this.state.sheetVisible
        }), 2000);
    }

    onCustomSelect() {
        this.setState({sheetVisible: !this.state.sheetVisible});
        ToastAndroid.show("Select Location By Pressing For Long.", ToastAndroid.LONG);
    }

    updateSearch = async (name) => {

        this.setState({ name });

        if(name.length< 3){

            this.setState({
                birds: [],
                searchErr: '*Enter atleast 3 characters to begin search.',
            });
        }
        else if(name.length >= 2){
            await this.props.searchSpecie(name);

            let birds = this.props.species.species;

            this.setState({
                birds: birds,
                searchErr: ''
            });
        }
    };

    render() {

        const finalFilter = (bird) => {
            this.setState({
                name: bird.common_name,
                birdId: bird.id.toString(),
                birds: []
            })
        }

        function renderListItem({item, index}){

            return(
                <ListItem
                    key={index}
                    pad = {10}
                    onPress={() => finalFilter(item)}
                >   
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: 'bold', color: 'black'}}>
                            <Icon name='feather'
                                        type="font-awesome-5" 
                                        color='black'
                                        size={15}
                                        iconStyle={{marginRight: 10}} />{item.common_name}
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            );
        }

        var list;

        if(this.props.species.isLoading){
            
            list = <Loading text='Getting names ....' color='black'/>
                                
        }
        else if(this.props.species.errMess){
                    list = <Text>{this.props.species.errMess}</Text>
        }
        else if(this.state.birds.length){

            list = <FlatList
                        data={this.state.birds}
                        renderItem={renderListItem}
                        keyExtractor={item => item.id.toString()}
                        style={{marginTop: 0}}
                        />
        }


        return (
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <Image 
                        style={{height: heigth, width: width, marginTop: '10%'}}
                        source={{ uri: this.state.imageUrl}}
                        
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: '10%', paddingBottom: '0%'}}>
                    <View style={{width: '45%', height: 100, paddingRight: '2%'}}>
                        <Button
                            title="Camera"
                            onPress={this.getCameraImage}
                            buttonStyle={{backgroundColor: '#85603f', borderRadius: 28}}
                            titleStyle={{color: "white", fontWeight: "bold", paddingHorizontal: '5%'}}
                        />
                    </View>
                    <View style={{width: '45%', height: 100, paddingLeft: '2%'}}>
                        <Button
                            title="Gallery"
                            onPress={this.getGalleryImage}
                            buttonStyle={{backgroundColor: '#85603f', borderRadius: 28}}
                            titleStyle={{color: "white", fontWeight: "bold", paddingHorizontal: '5%'}}
                        />
                    </View>
                </View>
                <View style={{marginHorizontal: '5%'}}>
                    <Input
                        placeholder="Enter Specie Name ..."
                        leftIcon={{ type: 'font-awesome-5', name: 'dove'}}
                        leftIconContainerStyle={{marginRight: 10}}
                        onChangeText={(name) => this.updateSearch(name)}
                        value={this.state.name}
                        label='NAME : '
                        errorMessage={this.state.errors.name}
                    />
                    <View>
                        {list}
                    </View>
                    <Input
                        placeholder="Input Location...."
                        leftIcon={{ type: 'font-awesome-5', name: 'map-marker-alt'}}
                        leftIconContainerStyle={{marginRight: 10}}
                        disabled
                        value={this.state.locCoords}
                        label='LOCATION : '
                        errorMessage={this.state.errors.locCoords}
                        multiline
                    />
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: '10%', paddingBottom: '0%'}}>
                    <View style={{width: '45%', height: 100, paddingRight: '2%'}}>
                        <Button
                            title="Current"
                            onPress={this.getLoction}
                            buttonStyle={{backgroundColor: '#85603f', borderRadius: 28}}
                            titleStyle={{color: "white", fontWeight: "bold", paddingHorizontal: '5%'}}
                        />
                    </View>
                    <View style={{width: '45%', height: 100, paddingLeft: '2%'}}>
                        <Button
                            title="Custom"
                            onPress={() => this.onCustomSelect()}
                            buttonStyle={{backgroundColor: '#85603f', borderRadius: 28}}
                            titleStyle={{color: "white", fontWeight: "bold", paddingHorizontal: '5%'}}
                        />
                    </View>
                    </View>
                    <Input
                        placeholder="Mention Estimated Bird Count...."
                        leftIcon={{ type: 'font-awesome-5', name: 'calculator'}}
                        leftIconContainerStyle={{marginRight: 10}}
                        onChangeText={(birdCount) => this.setState({
                            birdCount
                        })}
                        value={this.state.birdCount}
                        label='BIRD COUNT : '
                        errorMessage={this.state.errors.birdCount}
                    />
                     <View style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: 10,
                                }}>
                        <DatePicker
                            defaultDate={new Date()}
                            maximumDate={new Date()}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="SELECT DATE"
                            textStyle={{ color: "black", fontWeight: 'bold', borderRadius: 30, backgroundColor: '#c6f1e7' }}
                            placeHolderTextStyle={{ color: "black", fontWeight: 'bold', borderRadius: 30, backgroundColor: '#c6f1e7' }}
                            onDateChange={(date) => this.dateSelect(date)}
                            disabled={false}
                        />
                    </View>
                </View>
                <Text style={{color: 'red', textAlign: 'center'}}>{this.state.errors.dateString}</Text>
                <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
                <Button
                        onPress = {() => this.handleSubmit()}
                        title=" Submit Sighting"
                        titleStyle={{marginLeft: '5%'}}
                        icon={
                            <Icon
                                name='telegram-plane'
                                type='font-awesome-5'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: '#85603f',
                            borderRadius: 28,
                            marginBottom: '5%'
                        }}
                        />
                </View>
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
                            onLongPress={(e) => this.getCustomLocation(e)}
                            style={{height: screenHeight-500, width: Dimensions.get('window').width}}
                        >
                            {this.state.locCoords !== "Enter Current or Custom Location.."
                            ?
                            <Marker 
                                coordinate={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude
                                }}
                                image={require('./images/Logo.png')}
                                title={'Selected Location'}
                            />
                            :
                            <View></View>
                            }
                        </MapView>
                        </View>
                    </BottomSheet>
            </ScrollView>
        );
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(AddSighting);