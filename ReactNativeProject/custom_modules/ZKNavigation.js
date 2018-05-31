import React, { Component } from 'react';
import {
    StackNavigator,
} from 'react-navigation';

import Chat from './Chat'
import NoteDetail from './NoteDetail'
import Tab from './ZKTabrBarController'

export default StackNavigator({
    Main: {screen: Tab},
    Chat: {screen: Chat},
    NoteDetail: {screen: NoteDetail}
});
