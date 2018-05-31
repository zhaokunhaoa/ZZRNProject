import React from 'react'
import {
    Image,
} from 'react-native'
import {
    createBottomTabNavigator,
    StackNavigator,
    createStackNavigator
} from 'react-navigation';

import Home from './Home'
import Chat from './Chat'
import Me from './Me'
import NoteDetail from './NoteDetail'


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
                height: 0,
            },
            style: {backgroundColor: 'white'},
            tabStyle: {height: 49},
            labelStyle: {fontSize: 11},
            pressColor: 'gray',
            pressOpacity: '0.1',
            upperCaseLabel: false,
        },

    }
)



export default createStackNavigator(
    {
        Main: {
            screen: Tab,
        },
        Chat: {
            screen: Chat
        },
        NoteDetail: {
            screen: NoteDetail
        }
    },
    {
        initialRouteName: 'Main',
        navigationOptions:{
            headerBackTitle:null,
            headerTintColor:'#333333',
            showIcon:true,
            swipeEnabled:true,
            animationEnabled:false,
        },

        mode:'card',
    }
)
