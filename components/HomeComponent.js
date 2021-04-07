import React, {Component} from 'react';
import{connect} from 'react-redux';
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
            refreshing: false,
            loggedIn:false
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
        if(this.props.auth.userId){
            this.setState({
                loggedIn:true
            })
        }else{
            this.setState({
                loggedIn:false
            })
        }

        this.setState({
            refreshing: false,
            loggedIn:this.props.auth.userId?true:false
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
        this.setState({
            loggedIn:this.props.auth.userId?true:false
        })
        
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

        var facto = <Loading text={'Getting You A Bird Fact......'} color='white' />;

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
                        <Text style={styles.name}>Welcome to Wildsight</Text>
                        
                        <View style={styles.section}>
                            <View style={{paddingTop: '15%'}}>
                            {/* -------------------------------------------------- */}
                            {/* If user not logged In */}
                            
                            {!(this.state.loggedIn) && <>
                                <Button
                                onPress={() => this.props.navigation.navigate('REGISTER USER')}
                                title='Register User'
                                icon={
                                    <Icon
                                        name='user-plus'
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
                                containerStyle={{marginHorizontal: '15%', marginTop:'5%', marginBottom:'2%'}}
                            />

                            <Button onPress={() => this.props.navigation.navigate('LOGIN USER')}
                                title='LOGIN'
                                icon={
                                    <Icon
                                        name='sign-in-alt'
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
                            </>
                            }

                        {/* -------------------------------------------------- */}
                            {/*If logged in*/}
                            {(this.state.loggedIn) &&<><Button
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
                                containerStyle={{marginHorizontal: '15%', marginTop:'5%', marginBottom:'2%'}}
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
                            </>}
                            {/* -------------------------------------------------- */}

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

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth: state.Auth
    })

}
export default connect(mapStateToProps,{})(Home); 