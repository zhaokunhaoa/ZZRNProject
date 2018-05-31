import React, { Component, PureComponent } from 'react';
import { 
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
    Animated,
    TouchableOpacity
} from 'react-native';

import TextInputTest from './TextInputTest'
import ZKButton from './ZKButton'

const pressButton = ()=>{

}

export default class NoteItem extends PureComponent {

    constructor(props) {
        super(props)

    }

    _onPress = () => {
        alert('NoteItem')
    };

    render() {
        return (
            <View style={{flex: 1,flexDirection:'row',backgroundColor:this.props.note.bgColor}}>
                <Image source={require('../img/favicon.png')} style={styles.avator} />
                <View style={styles.viewForUserNameAndContent}>
                    <Text style={styles.username}>{this.props.note.username}</Text>
                    <Text style={styles.time}>2018-05-30 11:30</Text>
                    <Text style={styles.content}
                          numberOfLines={this.props.note.contentLines}
                    >
                        {this.props.note.content}
                    </Text>
                    <Image source={require('../img/favicon.png')} style={styles.postImage} />
                </View>
            </View>
        );
    }
}

NoteItem.defaultProps = {
    note: {
        username: '',
        content: '',
        bgColor: 'red',
        contentLines: 0,
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