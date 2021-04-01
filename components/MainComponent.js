import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';
import Home from './HomeComponent';
import LocationSight from './LocationSight';
import Profile from './ProfileComponent';
import Ratification from './Ratification';
import SpecieSight from './SpecieSight';
import AddSighting from './AddSighting';
import Register from './forms/RegisterComponent'
import Login from './forms/LoginComponent'
const Tab = createBottomTabNavigator();

const ProfileNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const RatificationNavigator = createStackNavigator();
const SpecieSightNavigator = createStackNavigator();
const LocationSightNavigator = createStackNavigator();

function ProfileNavigatorScreen() {
    return(
        <ProfileNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#158467"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"  ,
                    textAlign: 'center',
                    fontWeight: "bold",
                    fontSize: 15                    
                }
            }}
        >
            <ProfileNavigator.Screen
                name="MY PROFILE"
                component={Profile}
                options={{headerTitle: "My Profile"},({navigation}) => ({
                    headerLeft: () => (
                        <Image source={require('./images/Logo.png')} style={{width: 75, height: 75}}/>
                    ),
                    headerRight: () => (
                        <Icon 
                            name='user-alt'
                            type="font-awesome-5" 
                            size={24}
                            color='white'
                            iconStyle={{marginRight: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </ProfileNavigator.Navigator>
    );
}

function LocationSightNavigatorScreen() {
    return(
        <LocationSightNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#158467"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"  ,
                    textAlign: 'center',
                    fontWeight: "bold",
                    fontSize: 15                     
                }
            }}
        >
            <LocationSightNavigator.Screen
                name="LOCATION SIGHT"
                component={LocationSight}
                options={{headerTitle: "Location Sight"},({navigation}) => ({
                    headerLeft: () => (
                        <Image source={require('./images/Logo.png')} style={{width: 75, height: 75}}/>
                    ),
                    headerRight: () => (
                        <Icon 
                            name='globe' 
                            size={24}
                            color='white'
                            type='font-awesome-5'
                            iconStyle={{marginRight: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )

                })}
            />
        </LocationSightNavigator.Navigator>
    );
}

function RatificationNavigatorScreen() {
    return(
        <RatificationNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#158467"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"  ,
                    textAlign: 'center',
                    fontWeight: "bold",
                    fontSize: 15                      
                }
            }}
        >
            <RatificationNavigator.Screen
                name="RATIFICATION"
                component={Ratification}
                options={{headerTitle: "Ratification"},({navigation}) => ({
                    headerLeft: () => (
                        <Image source={require('./images/Logo.png')} style={{width: 75, height: 75}}/>
                    ),
                    headerRight: () => (
                        <Icon 
                            name='check-circle' 
                            size={24}
                            color='white'
                            type='font-awesome-5'
                            iconStyle={{marginRight: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )


                })}
            />
        </RatificationNavigator.Navigator>
    );
}

function SpecieSightNavigatorScreen() {
    return(
        <SpecieSightNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#158467"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff" ,
                    textAlign: 'center',
                    fontWeight: "bold",
                    fontSize: 15                     
                }
            }}
        >
            <SpecieSightNavigator.Screen
                name="SPECIE SIGHT"
                component={SpecieSight}
                options={{headerTitle: "Specie Sight"},({navigation}) => ({
                    headerLeft: () => (
                        <Image source={require('./images/Logo.png')} style={{width: 75, height: 75}}/>
                    ),
                    headerRight: () => (
                        <Icon 
                            name='dove' 
                            size={24}
                            color='white'
                            type='font-awesome-5'
                            iconStyle={{marginRight: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )

                })}
            />
        </SpecieSightNavigator.Navigator>
    );
}

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#158467"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff",
                    textAlign: 'center',
                    fontWeight: "bold",
                    fontSize: 15            
                }
            }}
        >
            <HomeNavigator.Screen
                name="HOME"
                component={Home}
                options={{headerTitle: "Home"},({navigation}) => ({
                    headerLeft: () => (
                        <Image source={require('./images/Logo.png')} style={{width: 75, height: 75}}/>
                    ),
                    headerRight: () => (
                        <Icon 
                            name='home' 
                            size={24}
                            color='white'
                            type='font-awesome-5'
                            iconStyle={{marginRight: 10}}
                            onPress={() => 
                                navigation.toggleDrawer()}
                        />
                    )

                })}
            />
            <HomeNavigator.Screen
                name="ADD SIGHTING"
                component={AddSighting}
                options= {{ headerTitle: "ADD SIGHTING", headerTitleStyle: {textAlign: 'left', fontWeight: 'bold'}}}
            />
            <HomeNavigator.Screen
                name="REGISTER USER"
                component={Register}
                options= {{ headerTitle: "REGISTER USER", headerTitleStyle: {textAlign: 'left', fontWeight: 'bold'}}}
            />

            <HomeNavigator.Screen
                name="LOGIN USER"
                component={Login}
                options= {{ headerTitle: "LOGIN USER", headerTitleStyle: {textAlign: 'left', fontWeight: 'bold'}}}
            />
        </HomeNavigator.Navigator>
    );
}



class Main extends Component {

  render() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions = {{
                    initialRouteName: 'Home',
                    activeBackgroundColor: '#158467',
                    inactiveBackgroundColor: '#065446',
                    activeTintColor: '#fff',
                    inactiveTintColor: '#fff'
                }}>
                <Tab.Screen
                    name = "Home"
                    component = {HomeNavigatorScreen}
                    options = {{
                        title: 'Home',
                        tabBarIcon: ({ color: tintColor, focused }) => (
                            <Icon
                            name='home'
                            type='font-awesome-5'            
                            size={focused ? 30 : 24}
                            iconStyle={{ color: tintColor}}
                            />
                        )
                    }}
                    >
                </Tab.Screen>
                <Tab.Screen
                    name = "Location Sight"
                    component = {LocationSightNavigatorScreen}
                    options = {{
                        title: 'Location Sight',
                        tabBarIcon: ({ color: tintColor, focused }) => (
                            <Icon
                            name='globe'
                            type='font-awesome-5'     
                            size={focused ? 30 : 24}       
                            iconStyle={{ color: tintColor }}
                            />
                        )
                    }}
                    >
                </Tab.Screen>
                <Tab.Screen
                    name = "Specie Sight"
                    component = {SpecieSightNavigatorScreen}
                    options = {{
                        title: 'Specie Sight',
                        tabBarIcon: ({ color: tintColor, focused }) => (
                            <Icon
                            name='dove'
                            type='font-awesome-5'     
                            size={focused ? 30 : 24}       
                            iconStyle={{ color: tintColor }}
                            />
                        )
                    }}
                    >
                </Tab.Screen>
                <Tab.Screen
                    name = "Ratification"
                    component = {RatificationNavigatorScreen}
                    options = {{
                        title: 'Ratification',
                        tabBarIcon: ({ color: tintColor, focused }) => (
                            <Icon
                            name='check-circle'
                            type='font-awesome-5'    
                            size={focused ? 30 : 24}        
                            iconStyle={{ color: tintColor }}
                            />
                        )
                    }}
                    >
                </Tab.Screen>
                <Tab.Screen
                    name = "Profile"
                    component = {ProfileNavigatorScreen}
                    options = {{
                        title: 'Profile',
                        tabBarIcon: ({ color: tintColor, focused }) => (
                            <Icon
                            name='user-alt'
                            type='font-awesome-5'            
                            size={focused ? 30 : 24}
                            iconStyle={{ color: tintColor }}
                            />
                        ) 
                    }}
                    >
                </Tab.Screen>
                
            </Tab.Navigator>          
        </NavigationContainer>
    );
  }
}

export default Main; 