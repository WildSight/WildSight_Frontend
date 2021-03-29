import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {ListItem, Icon, BottomSheet, Button, Card, Avatar} from 'react-native-elements';
const incrementCount = (val)=>{
    console.log(val+1);
}

function ListTemplate (props){
        const color = '#51adcf'
        const {item, index} = props;

        return (
            <ListItem
                key={index}
                containerStyle={{
                    backgroundColor: color,
                    height: 100, borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%', 
                    marginTop: '3%'
                }}
                pad = {30}
            >   
                <Avatar rounded size={'xlarge'} style={{flexGrow:2}} source={require("../images/sparrow.jpg")} icon={{name: 'user', type: 'font-awesome'}}/>
                <ListItem.Content style={{flexGrow:6}}>
                    <ListItem.Title style={{fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='feather' type="font-awesome-5" color='white' size={15}
                                iconStyle={{marginRight: 10}} />{item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
                            <Icon name='eye' type="font-awesome-5" color='white' size={15}
                                iconStyle={{marginRight: 10}} />{item.sightings}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='map-marker-alt' type="font-awesome-5"  color='white' size={15}
                            iconStyle={{marginRight: 10}} />{item.location}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={{flexGrow:2}}>
                    <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='chevron-up' type="font-awesome-5" color='white' size={15}
                                iconStyle={{marginRight: 10}} onPress={()=>incrementCount(item.upvotes)}  />
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
                            {item.upvotes - item.downvotes}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='chevron-down' type="font-awesome-5"  color='white' size={15}
                            iconStyle={{marginRight: 10}} onPress={ () => incrementCount(item.downvotes)}/>
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
}

export default  ListTemplate;