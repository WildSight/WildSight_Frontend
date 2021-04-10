import React, {Component} from 'react';
import { Alert } from 'react-native';
import { View, Image, ImageBackground, Text, StyleSheet, FlatList, KeyboardAvoidingView, Dimensions} from 'react-native';
import { Icon, Input, SearchBar, ListItem, BottomSheet, Button } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import MapView, {Marker, Polygon} from 'react-native-maps';
import { connect } from "react-redux";
import {searchSpecie} from '../redux/actions/specie';
import {fetchSingleGrid} from "../redux/actions/singlegrid";
import {getCustomSpecieSightings} from '../redux/actions/sighting';
import {Loading} from './LoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';

const  mapStateToProps = (state) => {
    return{
        species: state.species,
        singlegrids: state.singlegrids,
        Auth: state.Auth,
        sightings: state.sightings
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        searchSpecie: (birdFilter) => dispatch(searchSpecie(birdFilter)),
        fetchSingleGrid: (gridId) => dispatch(fetchSingleGrid(gridId)),
        getCustomSpecieSightings: (specieId, time) => dispatch(getCustomSpecieSightings(specieId, time))
    };
}

const formPolygons = (polygons) => polygons.map((poly) => {

    delete poly.id;

    return(
        <Polygon 
            coordinates={poly}
            fillColor="rgba(240, 89, 69, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={2}
        />
    );
})

class SpecieSight extends Component {

    constructor(props){
        super(props);
        this.state={
            searchErr: '',
            birds: [],
            sheetVisible: false,
            birdFilter: '',
            birdId: 0,
            month: 1,
            polygons: [],
            mapHt: 880,
            sightings: []
        }
    }

    updateSearch = async (birdFilter) => {

        this.setState({ birdFilter });

        if(birdFilter.length< 3){

            this.setState({
                birds: [],
                searchErr: '*Enter atleast 3 characters to begin search.'
            });
        }
        else if(birdFilter.length >= 2){
            await this.props.searchSpecie(birdFilter);

            let birds = this.props.species.species;

            this.setState({
                birds: birds,
                searchErr: ''
            });
        }
    };

    getData = async (birdId) => {
        

        await this.props.getCustomSpecieSightings(birdId, this.state.month.toString());

        this.setState({
            sightings: this.props.sightings.sightings
        });

        var sightings = this.state.sightings;
        var grids = [];

        for(var i=0;i<sightings.length;i++)
        {
            await this.props.fetchSingleGrid(sightings[i].Location);

            grids.push(this.props.singlegrids.singlegrids);
        }

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

        let polygons = [];

        for(var i=0;i<grids.length;i++)
        {
            let polygon = prepareGrid(grids[i]);
            polygon.id = i;
            polygons.push(polygon);
        }

        this.setState({
            polygons: polygons
        });

    }
    
    

    render() {

        const finalFilter = (filter, birdId) => {

            this.setState({
                birdFilter: filter,
                birds: [],
                birdId: birdId 
            });

            this.getData(birdId.toString());

            this.setState({
                sheetVisible: !this.state.sheetVisible
            })
        }

        function renderListItem({item, index}){

            var name = item.common_name;
            return(
                <ListItem
                    key={index}
                    pad = {10}
                    onPress={() => finalFilter(name, item.id)}
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

        let screenHeight = 2*Dimensions.get('window').height;

        if(this.props.species.isLoading){
            
            list = <Loading text='Fetching Results ....' color='black'/>
                                
        }
        else if(this.props.species.errMess){
                    list = <Text>{this.props.species.errMess}</Text>
        }
        else{

            list = <FlatList
                        data={this.state.birds}
                        renderItem={renderListItem}
                        keyExtractor={item => item.id.toString()}
                
                        />
        }

        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/birdcollection.jpg')} style={styles.image}>
                    <SearchBar
                            placeholder="Search Specie by Names..."
                            onChangeText={this.updateSearch}
                            onClear={() => this.setState({
                                birds: []
                            })}
                            value={this.state.birdFilter}
                            clearIcon={{size: 20}}
                            searchIcon={{size: 25}}
                            round
                            clear
                            lightTheme
                        />
                    {list}
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
                    <BottomSheet isVisible={this.state.sheetVisible}>
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
                                latitude: 30.73629,
                                longitude: 76.7884,
                                latitudeDelta: 0.3,
                                longitudeDelta: 0.3
                            }}
                            style={{height: screenHeight-500, width: Dimensions.get('window').width}}
                        >
                            {this.state.polygons.length
                            ?
                            formPolygons(this.state.polygons)
                            :
                            <View></View>
                            }
                        </MapView>
                        </View>
                    </BottomSheet>
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
      },
    searchItemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5
    },
    searchInputStyle: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecieSight);