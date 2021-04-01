import React, {Component} from 'react';
import { View, RefreshControl, Image, StatusBar, ImageBackground, Text, StyleSheet} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {Loading} from './LoadingComponent';
import PTRView from 'react-native-pull-to-refresh';

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            birdFact: "",
            refreshing: false
        }
    }

    onRefresh = async () => {
        this.setState({
            refreshing: true
        });

        await fetch('https://some-random-api.ml/facts/Bird')
        .then(res => res.json())
        .then(fact => this.setState({
            birdFact: fact.fact
        }))
        .catch(() => this.setState({
            birdFact: "Can't Fetch BirdoFact :("
        }));

        this.setState({
            refreshing: false
        });
    }

    componentDidMount(){

        fetch('https://some-random-api.ml/facts/Bird')
        .then(res => res.json())
        .then(fact => this.setState({
            birdFact: fact.fact
        }))
        .catch(() => this.setState({
            birdFact: "Can't Fetch BirdoFact :("
        }))
    }

    render() {

        var today = new Date()
        var curHr = today.getHours()
        var wish = "";

        if (curHr < 12) {
            wish = "Good Morning!";
        } else if (curHr < 18) {
            wish = "Good Afternoon!";
        } else {
            wish = "Good Evening!";
        }

        var facto = <Loading text={'Getting You A Bird Fact......'} />;

        if(this.state.birdFact){
            facto =  <Text style={styles.fact}>{"RANDOM BIRD FACT: "+'\n\n'+this.state.birdFact}</Text>;
        }

        return (
            <View style={styles.container} >
                <View style={{height: '5%', zIndex: 1}}>
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl 
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.onRefresh()}
                            />
                        }
                    >
                    </ScrollView>
                </View>
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#065446" translucent = {true}/>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                    <View style={{height:'100%', backgroundColor: "#00000099"}}>
                        <Text style={styles.wish}>{wish}</Text>
                        <Text style={styles.name}>Bhavesh Kumar</Text>
                        <View style={styles.section}>
                            <View style={{paddingTop: '15%'}}>
                            <Button
                                onPress={() => this.props.navigation.navigate('ADD SIGHTING')}
                                title='ADD SIGHTING'
                                icon={
                                    <Icon
                                        name='plus-circle'
                                        type='font-awesome-5'            
                                        size={24}
                                        color= 'white'
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: "#fa4659",
                                    borderRadius: 20
                                }}
                                titleStyle={{padding: 20, fontWeight: 'bold'}}
                                containerStyle={{marginHorizontal: '15%'}}
                            />
                            <Button
                                title='LOGOUT'
                                icon={
                                    <Icon
                                        name='sign-out-alt'
                                        type='font-awesome-5'            
                                        size={24}
                                        color= 'white'
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: "#fa4659",
                                    borderRadius: 20
                                }}
                                titleStyle={{padding: 20, fontWeight: 'bold'}}
                                containerStyle={{marginHorizontal: '15%', marginTop:'7%'}}
                            
                            />
                            </View>
                            
                        </View>
                        <ScrollView style={{flex: 1}}>
                            {facto}
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        flexDirection: 'column'
    },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
      fact: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 30,
        textAlign: 'center'
      },
      wish: {
        flex: 1,
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: 'center',
        flex: 0.2,

      },
      name: {
        flex: 1,
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: 'center',
        flex: 0.2
      },
      section: {
        flex: 1,
        textAlign: "center",
      },
      scrollView: {
        flex: 1,
        backgroundColor: '#00000099',
        //alignItems: 'center',
        //justifyContent: 'center',
      },
});

export default Home; 