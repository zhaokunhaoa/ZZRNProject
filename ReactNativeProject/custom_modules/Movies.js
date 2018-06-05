import React, {PureComponent} from 'react'

import {
    Text,
    View,
    FlatList,
    StyleSheet,
    SectionList,
    Alert,
    ActivityIndicator,
    Button,
    TouchableOpacity
} from 'react-native'
import ZKButton from './ZKButton';
import MovieItem from './MovieItem'
import Chat from './Chat'
import './Service'

import {StackActions, NavigationActions} from 'react-navigation';
import {queryMovies} from "./Service";

const api = 'https://api.douban.com/v2/movie/in_theaters?city=%E4%B8%8A%E6%B5%B7&start=1&count=20'

export default class Movies extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: '电影',
        headerTitle: '我是电影',
        headerRight: (
            <Button
                onPress={() => navigation.navigate('Login')}
                title="Info"
            />
        ),
    });


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pageIndex: 0,
            isHeaderRefreshing: false,
            dataSource: [],
        }
    }

    componentDidMount() {
        this.loadMovieData()
    }

    loadMovieData() {
        let pageIndex = this.state.pageIndex
        // alert(pageIndex)
        fetch(queryMovies('上海', 0, 20))
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
                let start = pageIndex + json.subjects.length

                this.setState({
                    isLoading: false,
                    dataSource: movies,
                    pageIndex: start,
                    isHeaderRefreshing: false,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    isLoading: false,
                    isHeaderRefreshing: false,
                })
            })
    }

    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
        this.props.navigation.navigate('MovieDetail', {movieID: id})

    };

    _renderItem = (data) => {
        return <MovieItem
                movie={data.item}
                onPressItem={this._onPressItem}
                hi
                />
    }

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: '#999999'}}/>;
    }

    _onRefresh = () => {
        this.setState({
            isHeaderRefreshing: true
        })
        this.loadMovieData()
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
            <View style={{flex: 1}}>
                <FlatList
                    style={{flex: 1}}
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this._separator}
                    initialNumToRender={4}
                    refreshing={this.state.isHeaderRefreshing}
                    onRefresh={this._onRefresh}
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
