import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
    Button
} from 'react-native';
import NoteItem from './NoteItem'
import ZKButton from "./ZKButton";


export default class NoteDetail extends Component {
    state = {  }
    static navigationOptions = {
        title: 'NoteDetail',
        headerTitle: 'NoteDetail-Header',
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#235"
            />
        ),
    };
    constructor(props) {NoteDetail
        super(props)
    }
    
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <NoteItem
                    note={this.props.navigation.state.params.note}
                />
                <ZKButton onPress={() => this.props.navigation.push('NoteDetail', {note:this.props.navigation.state.params.note})} />
                <ZKButton title='back' style={{backgroundColor:'white'}} onPress={() => this.props.navigation.goBack()} />
                <ZKButton title='chat' style={{backgroundColor:'white'}} onPress={() => this.props.navigation.navigate('Chat')} />

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    cellcontainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red',
        marginRight: 0,
        marginLeft: 0,
    },
    avator: {
        width: 35,
        height: 35,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 2.5,
    },
    viewForUserNameAndContent: {
        flex:1,

    },
    username: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        flex:1,
        fontSize: 18,
    },
    time: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        flex:1,
        color: '#999999',
        fontSize: 13,
    },
    content: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 15,
        color: '#333333',
        flex:1,
    },
    postImage: {
        marginBottom: 20,
    },
})