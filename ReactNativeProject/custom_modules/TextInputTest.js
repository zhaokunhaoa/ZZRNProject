import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Image,
    Alert
  } from 'react-native';
  
const onButtonPress = () => {
    console.log('点了button');
    // Alert.alert('Button has been pressed!');
};

export default class TextInputTest extends Component {
    render() {
        return (
            <Button onPress={onButtonPress}
                    title='button'
                    color='red'
                    backgroundColor='#333333'
                    styles={styles.button}
            />

        );
    }
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#ffffff',
        color: '#ffffff',
    }

})

