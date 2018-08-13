import React, {Component} from 'react'

import {
    Text,
    View,
    FlatList,
    StyleSheet,
    SectionList,
    Alert,
    ActivityIndicator,
    Button,
    ScrollView,
} from 'react-native'
import ZKButton from './ZKButton';
import MovieItem from './MovieItem'
import './Service'

import {StackActions, NavigationActions} from 'react-navigation';
import {movieDetail} from "./Service";

const api = 'https://api.douban.com/v2/movie/subject/'

export default class MovieDetai extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: '电影信息',
        headerTitle: '电影',
        headerRight: (
            <Button
                onPress={() => navigation.navigate('Login')}
                title="Info"
            />
        ),
    });


    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    componentDidMount() {
        return fetch(movieDetail(this.props.navigation.state.params.movieID))
            .then((response) => response.json())
            .then((json) => {

                var directors = ""
                for (var index in json.directors) {
                    var director = json.directors[index]
                    if (directors == "") {
                        directors = directors + director.name
                    } else {
                        directors = directors + " " + director.name
                    }
                }
                json["directorNames"] = directors

                var actors = ""
                for (var index in json.casts) {
                    var actor = json.casts[index]
                    if (actors == "") {
                        actors = actors + actor.name
                    } else {
                        actors = actors + " " + actor.name
                    }
                }
                json["actorNames"] = actors


                this.setState({
                    isLoading: false,
                    dataSource: json,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <ScrollView style={{flex: 1}}>
                <MovieItem movie={this.state.dataSource} type='Detail' />
                <View style={{flexDirection:'row'}}>
                    <ZKButton title='想看' color='#666' style={{flex:1, backgroundColor:'white', padding:10, borderRadius:4}} />
                    <ZKButton title='看过' color='#666' style={{flex:1, backgroundColor:'white', padding:10, borderRadius:4}} />
                </View>
                <Text style={styles.summary}>
                    {this.state.dataSource.summary}
                </Text>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        flex: 1,
        // paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        // paddingBottom: 2,
        fontSize: 14,
        height: 44,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
        // textAlignVertical:'bottom',
        // textAlign:'center',
        backgroundColor: 'red'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: 'white'

    },
    summary: {
        backgroundColor:'white',
        marginTop:10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        fontSize:15,
        color:'#333333',
        marginBottom:100,
        lineHeight:25,
    }
})
