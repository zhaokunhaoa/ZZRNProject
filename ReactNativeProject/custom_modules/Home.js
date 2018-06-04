import React, { Component, PureComponent } from 'react';

import {
    Animated,
    FlatList,
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';

import NoteItem from './NoteItem'
import NoteDetail from "./NoteDetail";

var ITEM_HEIGHT = 100;

export default class Home extends React.PureComponent {


    static navigationOptions = {
        title: 'Home',
        headerTitle: 'Home',
    };


    // 构造
    constructor(props) {
        super(props);
    }
    _refreshing(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            alert('刷新成功')
        },1500)
    }
    _onload(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            alert('加载成功')
        },1500)
    }

    itemClick(item, index) {
        // alert('点击了第' + index + '项，电影名称为：' + item.name);
        var title = '第' + (index + 1) + '个' + ' title=' + item.title;
        this.props.navigation.navigate('NoteDetail', {note:{bgColor: 'white', username: title, content:item.content}})
    }

    _renderItem = (data) => {
        var title = '第' + (data.index + 1) + '个' + ' title=' + data.item.title;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.itemClick.bind(this, data.item, data.index)}>
                <NoteItem
                    note={{bgColor: 'white', username: title, content:data.item.content, contentLines:2}}
                />
            </TouchableOpacity>
        );
    }

    _header = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
    }

    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height:0.5,backgroundColor:'#dcdcdc'}}/>;
    }

    _keyExtractor = (item, index) => index + '';


    render() {
        var data = [];
        for (var i = 0; i < 100; i++) {
            data.push({key: i, title: (i+1) + '', content:'12345678901234567890123456789012345678901234567890123456789012345678901234567890'});
        }

        return (
            <View style={{flex:1}}>
                <Button title='滚动到指定位置' onPress={()=>{
                    this.props.navigation.navigate('NoteDetail', {bgColor: 'white'})
                }}/>
                <View style={{flex:1}}>
                    <FlatList
                        // ref={(flatList)=>this._flatList = flatList}
                        // ListHeaderComponent={this._header}
                        // ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        onPress = {this._onPressItem}
                        onRefresh={this._refreshing}
                        refreshing={false}
                        onEndReachedThreshold={0}
                        onEndReached={
                            this._onload
                        }
                        // numColumns ={2}
                        // columnWrapperStyle={{borderWidth:2,borderColor:'red',paddingLeft:0}}

                        // horizontal={true}

                        getItemLayout={(data,index)=>(
                        {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT+2) * index, index}
                        )}

                        // onEndReachedThreshold={5}
                        //onEndReached={(info)=>{
                        //console.warn(info.distanceFromEnd);
                        //}}

                        //onViewableItemsChanged={(info)=>{
                        //console.warn(info);
                        //}}
                        data={data}>
                    </FlatList>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});