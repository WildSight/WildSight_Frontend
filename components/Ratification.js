import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, View, Image, ImageBackground, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {ListItem, Icon, BottomSheet, Button, Card, Avatar} from 'react-native-elements';
import CardTemplate from './commonComponents/lists';
import MapView, {Marker} from 'react-native-maps';
import {getUnratifiedSights, VoteSighting} from '../redux/actions/unratified_sightings';
import {fetchBird} from '../redux/actions/bird';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Alert } from 'react-native';

class Ratification extends Component {
  constructor(props){
    super(props);
    this.state = {
        limit:10,
        skip:-1,
        sheetVisible: false,
        latitude: 30.73629,
        longitude:  76.7884,
        data:[],
        refreshing: false,
        isCompleted: false
    }
}
  componentDidMount= async()=>{
    const authToken=this.props.auth.token
    this.retrieveData();
  }

  retrieveData = async()=>{
    if (this.state.refreshing||this.state.isCompleted){
      return null;
    }
    const authToken=this.props.auth.token
    this.setState({
      refreshing:true
    })
    try{
      await this.props.getUnratifiedSights({token:authToken, limit:this.state.limit, skip:this.state.skip+1})
      let newData = this.props.UnratifiedSightings.data;
      if(newData){
        if(newData.length==0){
          this.setState({
            refreshing:false,
            isCompleted:true
          })
          return null;
        }
        for(var i=0;i<newData.length;i++){
            let common_name;
            if(newData[i].species){
              await this.props.fetchBird(newData[i].species);
              common_name = this.props.birds.birds.common_name;
            }else{
              common_name = newData[i].new_species;
            }
            newData[i] = {...newData[i], name: common_name}
          }
          var prevData = this.state.data, skip = this.state.skip;
          const resData = prevData.concat(newData)
          this.setState({
            data: resData,
            skip:this.state.skip+1,
            refreshing:false
          })
      }
    }catch(e){
      this.setState({
        refreshing:false
      })
    }
  }



  upvoteSighting = async(sightingId)=>{
    //send bird id, usertoken, voteType
    const pk=sightingId;
    const token = this.props.auth.token;
    const vote="up";
    const Votedata= {pk, token, vote};
    await this.props.VoteSighting(Votedata);
    let prev_data= this.state.data;
    let new_data = this.props.Votes.data;
    if(new_data){
      new_data= new_data[0];
    }

    for(var i=0;i<prev_data.length;i++){
      if(prev_data[i].id===pk){
        const name = prev_data[i].name
        prev_data[i] = {...new_data, name}
        this.setState({
          data: prev_data
        })
        break;
      }
    }
    
  }
  downvoteSighting = async(sightingId)=>{
    //sighting_id, usertoken, voteType
    const pk=sightingId;
    const token = this.props.auth.token;
    const vote="down";
    const Votedata= {pk, token, vote};
    await this.props.VoteSighting(Votedata);
    let prev_data= this.state.data;
    let new_data = this.props.Votes.data;
    if(new_data){
      new_data= new_data[0];
    }

    for(var i=0;i<prev_data.length;i++){
      if(prev_data[i].id===pk){
        const name = prev_data[i].name
        prev_data[i] = {...new_data, name}
        this.setState({
          data: prev_data
        })
        break;
      }
    }
  }

  renderCardTempelate = (props)=>{
    const color = '#ffa500'
        const {item, index} = props;
        const userId=this.props.auth.userId;
        if(item.voted_by.includes(userId))
          return (<></>)
        return (
            <Card key={index}
            containerStyle={{
                backgroundColor: '#8fd6e1',
                //backgroundColor: '#51adcf',
                borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%', 
                marginTop: '3%'
            }} style={{justifyContent:'center', backgroundColor: '#fff'}}>
                <Card.Title style={{fontSize:24}}>{item.name}</Card.Title>
                {item.image &&
                  <View style={{marginBottom: 10, flex:1,marginLeft:'auto', marginRight:'auto' }}>
                    <Avatar containerStyle={{justifyContent:'center'}} size={'xlarge'} source={{uri:item.image}}/>
                </View>
                }

                <View style={{marginBottom: 10}}>
                    <ListItem.Subtitle style={{fontWeight: 'bold', color: '#4b778d'}}>
                        <Icon name='eye' type="font-awesome-5" color='#4b778d' size={15}
                            iconStyle={{marginRight: 10}} />{item.count}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle onPress={() => this.setState({
                      sheetVisible: !this.state.sheetVisible,
                      latitude: parseFloat(item.location_latitude),
                      longitude: parseFloat(item.location_longitude)
                    })} style={{ fontWeight: 'bold', marginVertical: '5%', color: '#4b778d'}}>
                        <Icon name='map-marker-alt' type="font-awesome-5"  color='#4b778d' size={15}
                            iconStyle={{marginRight: 10}} />{item.location_latitude +", "+ item.location_longitude}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#4b778d'}}>
                        <Icon name='calendar-alt' type="font-awesome-5"  color='#4b778d' size={15}
                            iconStyle={{marginRight: 10}} />
                            {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour:'numeric', minute:'numeric'}).format(new Date(Date.parse(item.date_time)))}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#4b778d'}}>
                        <Icon name='chevron-up' type="font-awesome-5"  color='#4b778d' size={15}
                            iconStyle={{marginRight: 10}} />{item.upvotes}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#4b778d'}}>
                        <Icon name='chevron-down' type="font-awesome-5"  color='#4b778d' size={15}
                            iconStyle={{marginRight: 10}} />{item.downvotes}
                    </ListItem.Subtitle>
                </View>

                <View style={{flex:12, justifyContent:'space-between'}}>
                    <Button
                    icon={<Icon name='chevron-up' type="font-awesome-5"  color='white' iconStyle={{marginRight:5}} />}
                    buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 10, backgroundColor:"#b37959"}}
                    onPress={()=>this.upvoteSighting(item.id)}
                    title='Upvote Sighting' />
                
                    <Button
                    icon={<Icon name='chevron-down' type="font-awesome-5"  color='white' iconStyle={{marginRight:5}} />}
                    buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginTop: 5, backgroundColor:"#b37959"}}
                    title='Downvote Sighting'  onPress={ ()=>this.downvoteSighting(item.id)}/>
                </View>
            </Card>            
        )
  }
  renderFooter=()=>{
    if (this.state.refreshing) {
      return <ActivityIndicator size="large" animating={true} color="#125112" />;
    } else {
      return null;
    }
  }

    render() {

      let screenHeight = 2*Dimensions.get('window').height;

      if(this.state.data.length>0){
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                      <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                        <FlatList
                        data={this.state.data}
                        renderItem={this.renderCardTempelate}
                        keyExtractor={item =>{
                        return item.id.toString()}
                        }
                        style={{marginBottom: 30}}
                        ListFooterComponent={this.renderFooter}
                        refreshing={this.state.refreshing}
                        onEndReached={this.retrieveData}
                        onEndReachedThreshold={0.1}
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
            <View style={styles.container}>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                      <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                        <Text style={{marginTop:'50%', fontSize:35, textAlign:'center'}}>Fetching sightings<ActivityIndicator size="large" animating={true} color="#125112"/></Text>
                      </View>
                </ImageBackground>
            </View>
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
      UnratifiedSightings: state.UnratifiedSightings,
      Votes:state.Votes
  })

}


export default connect(mapStateToProps, {getUnratifiedSights, fetchBird, VoteSighting})(Ratification); 