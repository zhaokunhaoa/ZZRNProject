import React, {Component} from 'react'

import {
    Text,
    View,
    FlatList,
    StyleSheet,
    SectionList,
    Alert,
    ActivityIndicator
} from 'react-native'
import ZKButton from './ZKButton';
import MovieItem from './MovieItem'

import {StackActions, NavigationActions} from 'react-navigation';

const api = 'https://api.douban.com/v2/movie/in_theaters?city=%E4%B8%8A%E6%B5%B7&start=1&count=20'

export default class Movies extends React.Component {
    static navigationOptions = {
        title: '电影',
    };


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

    _renderItem = (data) => {
        return <MovieItem movie={data.item}/>
    }

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: '#999999'}}/>;
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
            <View style={{flex: 1, paddingTop: 20}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this._separator}
                />
            </View>
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
