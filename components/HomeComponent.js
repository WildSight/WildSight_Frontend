import React, {Component} from 'react';
import { StatusBar } from 'react-native'
import { View, Image, Button, ImageBackground, Text, StyleSheet} from 'react-native';

class Home extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#065446" translucent = {true}/>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                    <Text style={styles.text}>Home Screen</Text>
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
      }
});

export default Home; 