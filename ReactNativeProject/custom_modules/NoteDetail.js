import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
} from 'react-native';
import NoteItem from './NoteItem'


export default class NoteDetail extends Component {
    state = {  }
    static navigationOptions = {
        title: 'NoteDetail',
    };
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <NoteItem
                    note={this.props.navigation.state.params.note}
                />
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