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
        this.props.navigation.navigate('Login')
    }


    render() {
        return (
            <View style={{flex:1}}>
            <ScrollView style={styles.scrollView} keyboardDismissMode='on-drag' stickyHeaderIndices={[0, 1]}>
                <View style={{backgroundColor:'white',flex:1,alignItems:'center'}}>
                    <Image source={require('../img/favicon.png')} style={styles.avator} />
                </View>
                <Text style={{backgroundColor:'#fefefe',paddingLeft:20, paddingTop:5, paddingBottom:5, marginTop:25}}>设置</Text>
                <View style={{alignItems:'center',flex:1}}>
                    <ZKButton onPress={this._pressButton}
                              title='登录'
                              style={{marginTop:25,marginBottom:25, backgroundColor:'white', width:100, height:30}}
                              color='#333333'
                    />
                </View>

            </ScrollView>

            </View>
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