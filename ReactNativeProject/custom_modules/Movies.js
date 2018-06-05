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
    TouchableOpacity,
    RefreshControl
} from 'react-native'
import ZKButton from './ZKButton';
import MovieItem from './MovieItem'
import Chat from './Chat'
import './Service'
import './FlatListState'

import {StackActions, NavigationActions} from 'react-navigation';
import {queryMovies} from "./Service";
import FlatListState from "./FlatListState";

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
            isLoading: true,
            pageIndex: 0,
            isHeaderRefreshing: false,
            footerRefreshState: FlatListState.Idle,
            dataSource: [],
        }
    }

    componentDidMount() {
        this.loadMovieData()
    }

    loadMovieData() {
        let pageIndex = this.state.pageIndex
        // alert(pageIndex)
        fetch(queryMovies('上海', pageIndex, 10))
            .then((response) => response.json())
            .then((json) => {
                console.log('start')

                console.log('end')
                if (json == null) {
                    this.setState({
                        isLoading: false,
                        isHeaderRefreshing: false,
                        footerRefreshState: FlatListState.Failure
                    })
                    return
                }

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
                let refreshState = (movies.length == 0) ? FlatListState.NoMoreData : FlatListState.Idle
                let movieList = this.state.dataSource.concat(movies)
                // alert('load success')
                this.setState({
                    isLoading: false,
                    dataSource: movieList,
                    pageIndex: start,
                    isHeaderRefreshing: false,
                    footerRefreshState: refreshState
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    isLoading: false,
                    isHeaderRefreshing: false,
                    footerRefreshState: FlatListState.Failure
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

    renderFooter() {
        let footer = null

        switch (this.state.footerRefreshState) {
            case FlatListState.Idle:
                break;
            case FlatListState.Refreshing:
                footer =
                    <View style={styles.footer}>
                        <ActivityIndicator size="small"/>
                        <Text style={styles.footerText}>努力加载中</Text>
                    </View>
                break;
            case FlatListState.NoMoreData:
                footer =
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>没有更多数据了</Text>
                    </View>
                break;
            case FlatListState.Failure:
                footer =
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>加载失败，请稍后重试</Text>
                    </View>
                break;
        }
        return footer;
    }

    _headerRefresh = () => {
        this.setState({
            isHeaderRefreshing: true,
        })
        this.loadMovieData()
    }

    _footerRefresh = () => {
        // 如果正在刷新或者没有更多数据，就不再拉取数据
        if (this.state.footerRefreshState == FlatListState.refreshing ||
            this.state.footerRefreshState == FlatListState.NoMoreData ||
            this.state.isHeaderRefreshing) {
            return
        }
        this.setState({
            footerRefreshState: FlatListState.Refreshing
        })
        // alert('end footer')
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
                    onRefresh={this._headerRefresh}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.isHeaderRefreshing}
                    //         onRefresh={this._headerRefresh}
                    //         title="Loading..."/>
                    // }
                    onEndReached={this._footerRefresh}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderFooter()}
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
    footer: {
        alignItems:'center',
        marginTop: 10,
    },
    footerText: {
        flex:1,
        marginTop: 10,
        marginBottom:20,
        color:'#666666'
    },
})
