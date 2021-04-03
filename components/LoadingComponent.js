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
    }
});

export const Loading = ({text, color}) => {

    return(
        <View style={styles.loadingView} >
            <ActivityIndicator size="large" color={color} />
            <Text style={{fontSize: 14, fontWeight: 'bold', color: color}}>{text}</Text>
        </View>
    );
};