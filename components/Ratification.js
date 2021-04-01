import React, {Component} from 'react';
import { View, Image, ImageBackground, Text, StyleSheet, FlatList} from 'react-native';
import ListTemplate from './commonComponents/lists';
const data = [
  {id: 1, name: "Sparrow", category: "Common", sightings: 100, image: "./images/sparrow.jpg", location:"Bird Island", upvotes:15, downvotes:5},
  {id: 2, name: "Myna", category: "Common", sightings: 75, image: "./images/sparrow.jpg", location:"Bird Island", upvotes:1, downvotes:25},
  {id: 3, name: "Hooted Pitoui", category: "Rare", sightings: 20, image: "./images/sparrow.jpg", location:"Bird Island", upvotes:12, downvotes:1},
  {id: 4, name: "Robin", category: "Common", sightings: 110, image: "./images/sparrow.jpg", location:"Bird Island", upvotes:8, downvotes:5},
  {id: 5, name: "Great Indian Bustard", sightings: 5, category: "Endangered", image: "./images/sparrow.jpg",location:"Bird Island", upvotes:99, downvotes:14},
  {id: 6, name: "abcd", category: "Common", sightings: 89, image: "./images/sparrow.jpg",location:"Bird Island", upvotes:1, downvotes:24},
  {id: 7, name: "efgh", category: "Rare", sightings: 30, image: "./images/sparrow.jpg",location:"Bird Island", upvotes:11, downvotes:0},
  {id: 8, name: "ijkl", category: "Common", sightings: 98, image: "./images/sparrow.jpg",location:"Bird Island", upvotes:900, downvotes:156}
];

class Ratification extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/wild2.png')} style={styles.image}>
                      <View style={{height:'100%', backgroundColor: "#000000aa"}}>
                        {/* <Text style={styles.text}>Ratification Screen</Text> */}
                        <FlatList
                        data={data}
                        renderItem={ListTemplate}
                        keyExtractor={item => item.id.toString()}
                        style={{marginBottom: 30}}
                        /> 
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

export default Ratification; 