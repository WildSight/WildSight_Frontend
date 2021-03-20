import React, {Component} from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StatusBar } from 'react-native'
import { View, Image, ImageBackground, Text, StyleSheet} from 'react-native';


class Home extends Component {

    render() {
        return (
            <View>
                <Text>This is HomeNavigator component.</Text>
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#065446" translucent = {true}/>
            </View>
        );
    }
}

export default Home; 