import React, { Component } from 'react';

import { 
    View, 
    Button,
 } from 'react-native';

 export default class ZKButton extends Component {
     state = {  }
     constructor(props) {
         super(props)
         this.props.title=Button
         this.props.color="blue"
         this.props.onPress=()=>{ }
         this.props.style={}
     }
     render() {
         return (
            <View style={this.props.style}>
                <Button title={this.props.title}
                        onPress={this.props.onPress}
                        color={this.props.color}
                />
            </View>
         );
     }
 }