import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
} from 'react-native';
import ZKButton from "./ZKButton";

export default class Me extends React.Component {
    static navigationOptions = {
        title: 'Me',
        headerTitle: 'Me',
    };
    _pressButton = () => {
        this.props.navigation.navigate('Chat', { user: 'Lucy' })
    }


    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={{backgroundColor:'white',flex:1,alignItems:'center'}}>
                    <Image source={require('../img/favicon.png')} style={styles.avator} />
                </View>
                <Text style={{backgroundColor:'#f1f1f1',paddingLeft:20, paddingTop:5, paddingBottom:5}}>设置</Text>
                <ZKButton onPress={this._pressButton}
                          title='点我 chat'
                />
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor:'red',

    },
    avator: {
        margin:100,
        flex:1,
        width:40,
        height:40,
    },
})