import React, {Component} from 'react';
import { Alert } from 'react-native';
import { View, Image, ImageBackground, Text, StyleSheet, FlatList} from 'react-native';
import { Icon, Input, SearchBar, ListItem } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { connect } from "react-redux";
import {fetchSpecies, searchSpecie} from '../redux/actions/specie';
import {fetchSingleGrid} from "../redux/actions/singlegrid";
import {Loading} from './LoadingComponent';

const  mapStateToProps = (state) => {
    return{
        species: state.species,
        singlegrids: state.singlegrids,
        Auth: state.Auth
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchSpecies: () => dispatch(fetchSpecies()),
        searchSpecie: (birdFilter) => dispatch(searchSpecie(birdFilter)),
        fetchSingleGrid: (gridId) => dispatch(fetchSingleGrid(gridId))
    };
}


class SpecieSight extends Component {

    constructor(props){
        super(props);
        this.state={
            searchErr: '',
            birds: [],
            birdFilter: '',
        }
    }

    componentDidMount(){
         Alert.alert(null, this.props.Auth.username.toString());
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

    

    render() {

        const finalFilter = (filter, birdId) => {
            this.setState({
                birdFilter: filter,
                birds: []
            });


        }

        function renderListItem({item, index}){

            var name = item.common_name;
            return(
                <ListItem
                    key={index}
                    pad = {10}
                    onPress={() => finalFilter(name, birdId)}
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
                        style={{marginTop: 0}}
                        />
        }

        return (
            <View style={styles.container}>
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
                {this.state.searchErr ? <Text style={{color: 'red'}}>{this.state.searchErr}</Text>: <View></View>}
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                    {list}
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
    searchBar: {
        flex: 1,
        flexDirection: 'row'
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