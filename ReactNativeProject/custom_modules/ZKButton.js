import React, { Component } from 'react';

import { 
    View, 
    Button,
 } from 'react-native';

 export default class ZKButton extends Component {
     state = {  }
     constructor(props) {
         super(props)

     }



     render() {
         return (
            <View style={[this.props.style, {flex: 1,alignItems:'center', justifyContent:'center'}]}>
                <Button title={this.props.title}
                        onPress={this.props.onPress}
                        color={this.props.color}
                        fontSize={this.props.fontSize}
                />
            </View>
         );
     }
 }

 ZKButton.defaultProps = {
    title:'Button',
    color:'#333333',
     fontSize:15,
    onPress:()=>{ },
    style:{backgroundColor:'white'}
 }