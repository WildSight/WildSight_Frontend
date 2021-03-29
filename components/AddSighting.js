import React, {Component} from 'react';
import { View, ScrollView, Text, Alert, Dimensions, TouchableOpacity} from 'react-native';
import { Button, Image, Input, Icon} from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as IntentLauncher from 'expo-intent-launcher';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import Moment from 'moment';

var width = Dimensions.get('window').width;
var heigth = Math.floor(Dimensions.get('window').height/3);

class AddSighting extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            imageUrl: 'abc.png',
            blob: null,
            name: '',
            locCoords: 'Getting Current Location..',
            birdCount: '',
            date: new Date(),
            time: new Date(),
            show: false,
            mode: "date",
            dateTime: '',
            duration: '',
            dateString: '',
            errorMsg: null,
            latitude: 37.78825,
            longitude: -122.4324,
            location: null,
        }
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
    }

    handleSubmit = (Sighting) => {

        Alert.alert("Form Submitted", JSON.stringify(Sighting));
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                
                aspect: [width, heigth],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                var image = await fetch(capturedImage.uri);
                var Blob = await image.blob();

                this.setState({
                    imageUrl: capturedImage.uri,
                    blob: Blob
                });
            }
        }

    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraRollPermission.status === 'granted') {
            let selectedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [width, heigth]
            })
            if(!selectedImage.cancelled) {
                console.log(selectedImage);
                var image = await fetch(selectedImage.uri);
                var Blob = await image.blob();

                this.setState({
                    imageUrl: selectedImage.uri,
                    blob: Blob
                });
            }
        }
    }

    openSettingApp = () => {
        if(Platform.OS==='ios'){
            Linking.openURL('app-settings:');
        }
        else{
            IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
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
            
            this.setState({
                locCoords: this.state.latitude.toString()+" "+this.state.longitude.toString()
            })
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
                            onPress={this.getImageFromCamera}
                            buttonStyle={{backgroundColor: '#85603f', borderRadius: 28}}
                            titleStyle={{color: "white", fontWeight: "bold", paddingHorizontal: '5%'}}
                        />
                    </View>
                    <View style={{width: '45%', height: 100, paddingLeft: '2%'}}>
                        <Button
                            title="Gallery"
                            onPress={this.getImageFromGallery}
                            buttonStyle={{backgroundColor: '#85603f', borderRadius: 28}}
                            titleStyle={{color: "white", fontWeight: "bold", paddingHorizontal: '5%'}}
                        />
                    </View>
                </View>
                <View style={{marginHorizontal: '5%'}}>
                    <Input
                        placeholder="Enter Name...."
                        leftIcon={{ type: 'font-awesome-5', name: 'dove'}}
                        leftIconContainerStyle={{marginRight: 10}}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                        label='NAME : '
                    />
                    <Input
                        placeholder="Input Location...."
                        leftIcon={{ type: 'font-awesome-5', name: 'map-marker-alt'}}
                        leftIconContainerStyle={{marginRight: 10}}
                        disabled
                        value={this.state.locCoords}
                        label='LOCATION : '
                    />
                    <Input
                        placeholder="Mention Estimated Bird Count...."
                        leftIcon={{ type: 'font-awesome-5', name: 'calculator'}}
                        leftIconContainerStyle={{marginRight: 10}}
                        onChangeText={(birdCount) => this.setState({
                            birdCount
                        })}
                        value={this.state.birdCount}
                        label='BIRD COUNT : '
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
            </ScrollView>
        );
    }
}
  

export default AddSighting;