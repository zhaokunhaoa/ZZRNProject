import React, { Component } from 'react'

import {
    Text,
    View
} from 'react-native'

export default class Chat extends React.Component {
    static navigationOptions = {
        title: 'Chat',
    };
    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    Hello, this is Chat
                </Text>
            </View>
        );
    }
}