import React, { Component } from 'react'
import {
    Image,
    StatusBar
} from 'react-native'
import {
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';

import Home from './Home'
import Chat from './Chat'
import Me from './Me'
import NoteDetail from './NoteDetail'
import Movies from './Movies'

export default class RootScene extends Component {
    constructor() {
        super()
        StatusBar.setBarStyle('light-content')
    }

    render() {
        return <Navigator/>
    }
}

const Tab = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: '首页',
                headerTitle: 'Home',
                tabBarIcon: ({tintColor}) => <Image
                    style={{tintColor: tintColor, width: 20, height: 20,}}
                    source={require('../img/favicon.png')}/>,
            }
        },
        Me: {
            screen: Me,
            navigationOptions: {
                tabBarLabel: '我的',
                headerTitle: 'Me',
                tabBarIcon: ({tintColor}) => <Image
                    style={{tintColor: tintColor, width: 20, height: 20,}}
                    source={require('../img/favicon.png')}
                />,
            }
        },
        Movies: {
            screen: Movies,
            navigationOptions: {
                tabBarLabel: '电影',
                headerTitle: '电影',
                tabBarIcon: ({tintColor}) => <Image
                    style={{tintColor: tintColor, width: 20, height: 20,}}
                    source={require('../img/favicon.png')}
                />,
            }
        }
    },
    {
        animationEnabled: true,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        backBehavior: 'none',
        tabBarOptions: {
            activeTintColor: '#228cea',
            inactiveTintColor: 'gray',
            showIcon: true,
            indicatorStyle: {
                height: 10,
            },
            style: {backgroundColor: 'white'},
            tabStyle: {height: 49},
            labelStyle: {fontSize: 11},
            pressColor: 'gray',
            pressOpacity: '0.1',
            upperCaseLabel: false,
        },
        initialRouteName: 'Home',
    }
)


const Navigator =  createStackNavigator(
    {
        Tab: Tab,
        Home: Home,
        Chat: Chat,
        NoteDetail: NoteDetail,
        Me: Me,
        Movies: Movies
    },
    {
        initialRouteName: 'Tab',
        navigationOptions: {
            headerStyle: {backgroundColor: '#235'},
            headerTintColor: '#ffffff',
            headerTruncatedBackTitle: '返回',
        },
        mode: 'card',

    }

)