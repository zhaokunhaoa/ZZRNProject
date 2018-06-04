import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
    Animated,
    TouchableOpacity
} from 'react-native';


export default class MovieItem extends PureComponent {

    render() {
        return(
            <View style={styles.container}>
                {
                    this.props.type != 'Detail' ?
                        (<Image source={{uri:this.props.movie.images.medium}} style={{width:100, height:180, marginRight:15}} />)
                        :
                        (<Image source={{uri:this.props.movie.images.medium}} style={{width:150, height:250, marginRight:15}} />)
                }
                <View style={{flex:1}}>
                    <Text style={{marginTop:10}}>
                        {this.props.movie.title}
                    </Text>
                    <Text style={{marginTop:10}}>
                        {this.props.movie.year}
                    </Text>
                    {
                        this.props.movie.rating.average != 0 ?
                            (
                                <View style={styles.horizontalView}>
                                    <Text style={styles.subTitle}>评分:</Text>
                                    <Text style={[styles.subContent, {color:'#ff8800'}]}>{this.props.movie.rating.average}</Text>
                                </View>
                            )
                            :
                            (<Text style={[styles.subTitle, {marginTop:10}]}>
                                暂无评分
                            </Text>)
                    }
                    <View style={styles.horizontalView}>
                        <Text style={styles.subTitle}>导演:</Text>
                        <Text style={[styles.subContent, {color:'#223355'}]}>{this.props.movie.directorNames}</Text>
                    </View>
                    <View style={styles.horizontalView}>
                        <Text style={styles.subTitle}>主演:</Text>
                        <Text style={[styles.subContent, {color: '#223355'}]}>
                            {this.props.movie.actorNames}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

}

MovieItem.defaultProps = {
    type:''
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor:'white',
        padding: 10
    },
    horizontalView: {
        flexDirection:'row',
        marginTop:10
    },
    subTitle: {
        color:'gray'
    },
    subContent: {
        flex:1,
        marginLeft:5
    }
})