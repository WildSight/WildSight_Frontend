import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Image, ImageBackground, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {ListItem, Icon, BottomSheet, Button, Card, Avatar} from 'react-native-elements';
import CardTemplate from './commonComponents/lists';
import MapView, {Marker} from 'react-native-maps';
import {getUnratifiedSights, VoteSighting} from '../redux/actions/unratified_sightings';
import {fetchBird} from '../redux/actions/bird';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Alert } from 'react-native';

const Tempdata = [
  {id: 1, species: "Sparrow", category: "Common", count: 100, image: "./images/sparrow.jpg", location:"Bird Island", upvotes:15, downvotes:5},
  {id: 2, species: "Myna", category: "Common", count: 75, image: "./images/sparrow.jpg", location:"Bird Island", upvotes:1, downvotes:25},
  {id: 3, species: "Hooted Pitoui", category: "Rare", count: 20, image: "./images/sparrow.jpg", location:"Bird Island", upvotes:12, downvotes:1},
  {id: 4, species: "Robin", category: "Common", count: 110, image: "./images/sparrow.jpg", location:"Bird Island", upvotes:8, downvotes:5},
  {id: 5, species: "Great Indian Bustard", count: 5, category: "Endangered", image: "./images/sparrow.jpg",location:"Bird Island", upvotes:99, downvotes:14},
  {id: 6, species: "abcd", category: "Common", count: 89, image: "./images/sparrow.jpg",location:"Bird Island", upvotes:1, downvotes:24},
  {id: 7, species: "efgh", category: "Rare", count: 30, image: "./images/sparrow.jpg",location:"Bird Island", upvotes:11, downvotes:0},
  {id: 8, species: "ijkl", category: "Common", count: 98, image: "./images/sparrow.jpg",location:"Bird Island", upvotes:900, downvotes:156}
];

class Ratification extends Component {
  constructor(props){
    super(props);
    this.state = {
        limit:10,
        skip:0,
        sheetVisible: false,
        latitude: 30.73629,
        longitude:  76.7884,
    }
}
  componentDidMount= async()=>{
    const authToken=this.props.auth.token
    await this.props.getUnratifiedSights({token:authToken, limit:this.state.limit, skip:this.state.skip})

  }
  getBirdName = async(id)=>{
    await this.props.fetchBird(id)
    console.log(this.props.birds)
    console.log(this.props.birds.birds.common_name);
    return "test"
  }
  upvoteSighting = async(sightingId)=>{
    //send bird id, usertoken, voteType
    const pk=sightingId;
    const token = this.props.auth.token;
    const vote="up";
    const data= {pk, token, vote};
    await this.props.VoteSighting(data);
  }
  downvoteSighting = async(sightingId)=>{
    //sighting_id, usertoken, voteType
    const pk=sightingId;
    const token = this.props.auth.token;
    const vote="down";
    const data= {pk, token, vote};
    await this.props.VoteSighting(data);
  }

  renderCardTempelate = (props)=>{
    const color = '#ffa500'
        const {item, index} = props;
        // console.log(this.props.birds);
        return (
            <Card key={index}
            containerStyle={{
                backgroundColor: '#51adcf',
                borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%', 
                marginTop: '3%'
            }} style={{justifyContent:'center', backgroundColor: '#fff'}}>
                <Card.Title style={{fontSize:34}}>{item.species}</Card.Title>
                {item.image &&
                  <View style={{marginBottom: 10, flex:1,marginLeft:'auto', marginRight:'auto' }}>
                    <Avatar containerStyle={{justifyContent:'center'}}  rounded size={'xlarge'} source={{uri:item.image}}/>
                </View>
                }

                <View style={{marginBottom: 10}}>
                    <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='eye' type="font-awesome-5" color='white' size={15}
                            iconStyle={{marginRight: 10}} />{item.count}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle onPress={() => this.setState({
                      sheetVisible: !this.state.sheetVisible,
                      latitude: parseFloat(item.location_latitude),
                      longitude: parseFloat(item.location_longitude)
                    })} style={{ fontWeight: 'bold', marginVertical: '5%', color: '#fff'}}>
                        <Icon name='map-marker-alt' type="font-awesome-5"  color='white' size={15}
                            iconStyle={{marginRight: 10}} />{item.location_latitude +", "+ item.location_longitude}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='calendar-alt' type="font-awesome-5"  color='white' size={15}
                            iconStyle={{marginRight: 10}} />
                            {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour:'numeric', minute:'numeric'}).format(new Date(Date.parse(item.date_time)))}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='chevron-up' type="font-awesome-5"  color='white' size={15}
                            iconStyle={{marginRight: 10}} />{item.upvotes}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='chevron-down' type="font-awesome-5"  color='white' size={15}
                            iconStyle={{marginRight: 10}} />{item.downvotes}
                    </ListItem.Subtitle>
                </View>

                <View style={{flex:12, justifyContent:'space-between'}}>
                    <Button
                    icon={<Icon name='chevron-up' type="font-awesome-5"  color='white' iconStyle={{marginRight:5}} />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10, backgroundColor:"#b37959"}}
                    onPress={()=>this.upvoteSighting(item.id)}
                    title='Upvote Sighting' />
                
                    <Button
                    icon={<Icon name='chevron-down' type="font-awesome-5"  color='white' iconStyle={{marginRight:5}} />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 5, backgroundColor:"#b37959"}}
                    title='Downvote Sighting'  onPress={ ()=>this.downvoteSighting(item.id)}/>
                </View>
            </Card>            
        )
  }

    render() {

      let screenHeight = 2*Dimensions.get('window').height;

      if(this.props.UnratifiedSightings.data){
        let Unratified_Sights = this.props.UnratifiedSightings.data;
        // let data = []
        // for(var i=0;i<Unratified_Sights.length;i++){
        //   let temporary_id=i;
        //   let sighting = Unratified_Sights[i];
        //   let obj = {...sighting, temporary_id}
        //   data.push(obj);
        // }
        // console.log(Unratified_Sights);
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                      <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                        <FlatList
                          data={Unratified_Sights}
                          renderItem={this.renderCardTempelate}
                          keyExtractor={item =>{
                          return item.id.toString()}
                        }
                        style={{marginBottom: 30}}
                        /> 
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
                                    style={{height: screenHeight-500, width: Dimensions.get('window').width}}
                                >
                                    {this.state.latitude && this.state.longitude
                                    ?
                                    <Marker 
                                        coordinate={{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude
                                        }}
                                        title={'Desired Location'}
                                    />
                                    :
                                    <View></View>
                                    }
                                </MapView>
                                </View>
                            </BottomSheet>
                      </View>
                </ImageBackground>
            </View>
        );
      }else{
        return(
          <>
            <Text>Trying to fetch</Text>
          </>
        )
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
        justifyContent: "center",
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
      birds:state.birds,
      UnratifiedSightings: state.UnratifiedSightings
  })

}


export default connect(mapStateToProps, {getUnratifiedSights, fetchBird, VoteSighting})(Ratification); 