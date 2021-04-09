import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {ListItem, Icon, BottomSheet, Button, Card, Avatar} from 'react-native-elements';
import { block } from 'react-native-reanimated';
const incrementCount = (val)=>{
    console.log(val+1);
}
// const obj = ()=>{
//     return(
//         <>
//         <ListItem
//                 key={index}
//                 containerStyle={{
//                     backgroundColor: color,
//                     height: 100, borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%', 
//                     marginTop: '3%'
//                 }}
//                 pad = {30}
//             >   
//                 <Avatar rounded size={'xlarge'} style={{flexGrow:2}} source={require("../images/sparrow.jpg")} icon={{name: 'user', type: 'font-awesome'}}/>
//                 <ListItem.Content style={{flexGrow:6}}>
//                     <ListItem.Title style={{fontWeight: 'bold', color: '#fff'}}>
//                         <Icon name='feather' type="font-awesome-5" color='white' size={15}
//                                 iconStyle={{marginRight: 10}} />{item.name}
//                     </ListItem.Title>
//                     <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
//                             <Icon name='eye' type="font-awesome-5" color='white' size={15}
//                                 iconStyle={{marginRight: 10}} />{item.sightings}
//                     </ListItem.Subtitle>
//                     <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
//                         <Icon name='map-marker-alt' type="font-awesome-5"  color='white' size={15}
//                             iconStyle={{marginRight: 10}} />{item.location}
//                     </ListItem.Subtitle>
//                 </ListItem.Content>
//                 <ListItem.Content style={{flexGrow:2}}>
//                     <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
//                         <Icon name='chevron-up' type="font-awesome-5" color='white' size={15}
//                                 iconStyle={{marginRight: 10}} onPress={()=>incrementCount(item.upvotes)}  />
//                     </ListItem.Subtitle>
//                     <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
//                             {item.upvotes - item.downvotes}
//                     </ListItem.Subtitle>
//                     <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
//                         <Icon name='chevron-down' type="font-awesome-5"  color='white' size={15}
//                             iconStyle={{marginRight: 10}} onPress={ () => incrementCount(item.downvotes)}/>
//                     </ListItem.Subtitle>
//                 </ListItem.Content>
//             </ListItem>
//         </>
//     )
// }

function CardTemplate (props){
        const color = '#ffa500'
        // #ffa500 #5da172
        const {item, index} = props;

        return (
            <Card key={index}
            containerStyle={{
                backgroundColor: '#fab95b',
                borderRadius: 25, borderColor: 'grey', borderWidth: 2, marginHorizontal: '3%', 
                marginTop: '3%'
            }} style={{justifyContent:'center', backgroundColor: '#fff'}}>
                <Card.Title style={{fontSize:34}}>{item.name}</Card.Title>
                <View style={{marginBottom: 10, flex:1,marginLeft:'auto', marginRight:'auto' }}>
                    <Avatar containerStyle={{justifyContent:'center'}}  rounded size={'xlarge'} source={require("../images/sparrow.jpg")} />
                </View>
                
                <View style={{marginBottom: 10}}>
                    <ListItem.Subtitle style={{fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='eye' type="font-awesome-5" color='white' size={15}
                            iconStyle={{marginRight: 10}} />{item.sightings}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontWeight: 'bold', color: '#fff'}}>
                        <Icon name='map-marker-alt' type="font-awesome-5"  color='white' size={15}
                            iconStyle={{marginRight: 10}} />{item.location}
                    </ListItem.Subtitle>
                </View>

                <View style={{flex:12, justifyContent:'space-between'}}>
                    <Button
                    icon={<Icon name='chevron-up' type="font-awesome-5"  color='white' />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                    onPress={()=>incrementCount(item.upvotes)}
                    title='Upvote' />
                    <ListItem.Subtitle  style={{fontWeight: 'bold', color: '#fff', marginLeft:'auto',marginRight:'auto', marginTop:1, marginBottom:1}}>
                            {item.upvotes - item.downvotes}
                    </ListItem.Subtitle>
                    <Button
                    icon={<Icon name='chevron-down' type="font-awesome-5"  color='white' />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 5}}
                    title='Downvote'  onPress={ () => incrementCount(item.downvotes)}/>
                </View>
            </Card>
            
        )
}
export default  CardTemplate;