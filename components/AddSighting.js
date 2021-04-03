import React, {Component} from 'react';
import { View, ScrollView, Text, Alert, Dimensions, TouchableOpacity, ToastAndroid} from 'react-native';
import { Button, Image, Input, Icon, BottomSheet} from 'react-native-elements';
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from 'moment';
import MapView, {Marker} from 'react-native-maps';
import {openSettingApp, getImageFromGallery, getImageFromCamera, getUserLoction} from './commonComponents/permissions';


var width = Dimensions.get('window').width;
var heigth = Math.floor(Dimensions.get('window').height/3);
let screenHeight = 2*Dimensions.get('window').height;

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
            date: new Date(),
            time: new Date(),
            show: false,
            mode: "date",
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
            }
        }
    }

    /*componentDidMount(){

        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
              'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
          }
        else 
          this.getLoction();
    }*/

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

    handleSubmit = (Sighting) => {

        if(this.formValidation())
            Alert.alert("Form Submitted", JSON.stringify(Sighting));
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

    render() {

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
                        placeholder="Enter Specie Name...."
                        leftIcon={{ type: 'font-awesome-5', name: 'dove'}}
                        leftIconContainerStyle={{marginRight: 10}}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                        label='NAME : '
                        errorMessage={this.state.errors.name}
                    />
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
                                    margin: 20,
                                }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        paddingBottom: '3%'
                                    }}>
                                        SIGHTING DATE TIME
                                    </Text>
                                    <TouchableOpacity style={{flex: 1}}
                                        style={{
                                            padding: 15,
                                            borderColor: "#158467",
                                            borderWidth: 2,
                                            flexDirection: "row",
                                            borderRadius: 20
                                        }}
                                        onPress={() => this.setState({ show: true, mode: 'date' })}
                                    >
                                    <Icon type='font-awesome-5' name='calendar-alt' color="#158467" style={{paddingRight: 10}} />
                                    <Text >
                                        {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
                                    </Text>
                                    </TouchableOpacity>
                                    {this.state.show && (
                                        <DateTimePicker
                                            value={this.state.date}
                                            mode={this.state.mode}
                                            display="default"
                                            onChange={(selected, value) => {
                                                if (value !== undefined) {
                                                this.setState({
                                                    show: this.state.mode === "time" ? false : true,
                                                    mode: "time",
                                                    date: new Date(selected.nativeEvent.timestamp),
                                                    time: new Date(selected.nativeEvent.timestamp),
                                                    dateTime: Moment(new Date(selected.nativeEvent.timestamp)).format('DD-MMM-YYYY h:mm A').toString(),
                                                    dateString: (new Date(selected.nativeEvent.timestamp)).toString()

                                                });
                                                } else {
                                                this.setState({ show: false });
                                                }
                                            }}
                                        />
                                    )}
                                    </View>
                </View>
                <Text style={{color: 'red', textAlign: 'center'}}>{this.state.errors.dateString}</Text>
                <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
                <Button
                        onPress = {() => this.handleSubmit(this.state)}
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
                            borderRadius: 28
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
  

export default AddSighting;