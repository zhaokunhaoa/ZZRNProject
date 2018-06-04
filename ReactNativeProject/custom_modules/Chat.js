import React, { Component } from 'react'

import {
    Text,
    View,
    FlatList,
    StyleSheet,
    SectionList,
    Alert,
    ActivityIndicator
} from 'react-native'
import ZKButton from "./ZKButton";

import { StackActions, NavigationActions } from 'react-navigation';

const api = 'https://facebook.github.io/react-native/movies.json'

export default class Chat extends React.Component {
    static navigationOptions = {
        title: 'Chat',
    };


    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return fetch('https://api.douban.com/v2/movie/in_theaters?city=%E4%B8%8A%E6%B5%B7&start=1&count=20')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.subjects,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }



    render(){

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

    // _onPressAction() {
    //
    //
    //     fetch('https://www.sojson.com/open/api/weather/json.shtml?city=%E4%B8%8A%E6%B5%B7');
    // }
    //
    // render() {
    //     return (
    //           <View style={styles.container}>
    //             <SectionList
    //               sections={[
    //                 {titleName: 'KKD', data: ['Devin']},
    //                 {titleName: 'ZZJ', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
    //               ]}
    //               renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
    //               renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.titleName}</Text>}
    //               keyExtractor={(item, index) => index}
    //             />
    //             <ZKButton onPress={this._onPressAction} />
    //
    //           </View>
    //         );
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        flex:1,
        // paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        // paddingBottom: 2,
        fontSize: 14,
        height:44,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
        // textAlignVertical:'bottom',
        // textAlign:'center',
        backgroundColor:'red'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor:'white'

    },
})
