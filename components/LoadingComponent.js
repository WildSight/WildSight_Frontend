import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
  } from 'react-native'

const styles = StyleSheet.create({
    loadingView: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'white'
    },
    loadingText: {
        color: '#158467',
        fontSize: 14,
        fontWeight: 'bold'
      }
});

export const Loading = ({text}) => {
    return(
        <View style={styles.loadingView} >
            <ActivityIndicator size="large" color="#158467" />
            <Text style={styles.loadingText}>{text}</Text>
        </View>
    );
};