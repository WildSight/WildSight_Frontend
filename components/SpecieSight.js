import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { connect } from "react-redux";
import {fetchSpecies} from '../redux/actions/specie';
import {Loading} from './LoadingComponent';

const  mapStateToProps = (state) => {
    return{
        species: state.species
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchSpecies: () => dispatch(fetchSpecies()),
    };
}

var items = [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },
    {
      id: 4,
      name: 'React Native',
    },
    {
      id: 5,
      name: 'PHP',
    },
    {
      id: 6,
      name: 'Python',
    },
    {
      id: 7,
      name: 'Go',
    },
    {
      id: 8,
      name: 'Swift',
    },
  ];

class SpecieSight extends Component {

    constructor(props){
        super(props);
        this.state={
            searchErr: '',
            selectedItems: [],
            birdNames: []
        }
    }

    componentDidMount = async () => {
        await this.props.fetchSpecies();

        let birds = this.props.species.species;
        let birdNames = this.state.birdNames;
        var bird = {};
        for(var i=0;i<birds.length;i++)
        {
            bird.id = birds[i].id;
            bird.name = birds[i].common_name;
            birdNames.push(bird);
            bird = {};
        }

        this.setState({
            birdNames: birdNames
        });
    }

    
    search(){

        var species = this.state.selectedItems;

        if(species.length === 0)
        {
            this.setState({
                searchErr: '*Enter atleast one specie for search.'
            })
            return;
        }

        this.setState({
            searchErr: ''
        })

        console.log('Starting search with....... \n');
        for(var i=0;i<species.length;i++){
            console.log(species[i].name+"\n");
        }
    }

    render() {

        if(this.props.species.isLoading){
            return(
                <View style={styles.container}>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                    <Loading text='Fetching Bird Names ....' color='black'/>
                </ImageBackground>
                </View>
            );
        }
        else if(this.props.species.errMess){
            return(
                <View>
                    <Text>{this.props.species.errMess}</Text>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                <View style={styles.searchBar}>
                    <View style={{flex: 6, height: 140}}>
                    <SearchableDropdown
                        multi={true}
                        selectedItems={this.state.selectedItems}
                        onItemSelect={(item) => {

                            if(this.state.selectedItems.length === 1){
                                this.setState({
                                    searchErr: '*Only one specie per search is allowed.'
                                });
                                return;
                            }
                            this.setState({
                                searchErr: ''
                            });
                            const items = this.state.selectedItems;
                            items.push(item)
                            this.setState({ selectedItems: items });
                        }}
                        containerStyle={{ padding: 5 }}
                        onRemoveItem={(item, index) => {
                            const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                            this.setState({ selectedItems: items });

                            if(this.state.selectedItems.length === 0){
                                this.setState({
                                    searchErr: '*Enter atleast one specie for search.'
                                })
                            }
                        }}
                        itemStyle={styles.searchItemStyle}
                        itemTextStyle={{ color: '#222' }}
                        itemsContainerStyle={{ maxHeight: 140}}
                        items={this.state.birdNames}
                        chip={true}
                        resetValue={false}
                        textInputProps={
                        {
                            placeholder: "ENTER SPECIES TO SIGHT",
                            underlineColorAndroid: "transparent",
                            style: styles.searchInputStyle
                        }
                        }
                        listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                        }
                        
                    />
                    <Text style={{color: 'red', marginLeft: 5}}>{this.state.searchErr}</Text>
                    </View>
                    <Icon
                        style={{flex: 1}}
                        color="#065446"
                        raised
                        name='search'
                        type='font-awesome-5'
                        onPress={() => this.search()}
                        reverse />
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