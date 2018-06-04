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

import {StackActions, NavigationActions} from 'react-navigation';

const api = 'https://api.douban.com/v2/movie/in_theaters?city=%E4%B8%8A%E6%B5%B7&start=1&count=20'

export default class MovieDetai extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: '电影信息',
        headerTitle: '电影信息',
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
        return fetch(api)
            .then((response) => response.json())
            .then((json) => {


                var movies = []
                for (var idx in json.subjects) {
                    var movieItem = json.subjects[idx]
                    var directors = ""
                    for (var index in movieItem.directors) {
                        var director = movieItem.directors[index]
                        if (directors == "") {
                            directors = directors + director.name
                        } else {
                            directors = directors + " " + director.name
                        }
                    }
                    var movieItem = json.subjects[idx]
                    var directors = ""
                    for (var index in movieItem.directors) {
                        var director = movieItem.directors[index]
                        if (directors == "") {
                            directors = directors + director.name
                        } else {
                            directors = directors + " " + director.name
                        }
                    }
                    movieItem["directorNames"] = directors

                    var actors = ""
                    for (var index in movieItem.casts) {
                        var actor = movieItem.casts[index]
                        if (actors == "") {
                            actors = actors + actor.name
                        } else {
                            actors = actors + " " + actor.name
                        }
                    }
                    movieItem["actorNames"] = actors
                    movies.push(movieItem)
                }

                this.setState({
                    isLoading: false,
                    dataSource: movies,
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
                <MovieItem movie={this.props.navigation.state.params.movie} type='Detail' />
                <View style={{flexDirection:'row', marginTop:10}}>
                    <ZKButton title='想看' color='#666' style={{flex:1, backgroundColor:'white', margin:10, borderRadius:4}} />
                    <ZKButton title='看过' color='#666' style={{flex:1, backgroundColor:'white', margin:10, borderRadius:4}} />
                </View>
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
})
