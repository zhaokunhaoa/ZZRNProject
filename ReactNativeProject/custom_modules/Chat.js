import React, {Component} from 'react';
import {
    Text,
    StatusBar,
    TextInput,
    View,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';

import ZKButton from './ZKButton'

export default class App extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Chat',
        headerTitle: 'Chat',
        headerRight: (
            <Text>Hello</Text>
        ),
    });
    state = {
        name: '',
        email: '',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <View style={styles.header}>
                    <Text style={styles.description}>
                        This demo shows how using available TextInput customizations can make
                        forms much easier to use. Try completing the form and notice that different
                        fields have specific optimizations and the return key changes from focusing
                        next input to submitting the form.
                    </Text>
                </View>

            </ScrollView>
        );
    }

    _next = () => {
        this._emailInput && this._emailInput.focus();
    };

    _submit = () => {
        alert(`Welcome, ${this.state.name}! Confirmation email has been sent to ${this.state.email}`);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    header: {
        paddingTop: 20 + 20,
        padding: 20,
        backgroundColor: '#336699',
    },
    description: {
        fontSize: 14,
        color: 'white',
    },
    input: {
        margin: 20,
        marginBottom: 0,
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
    },
});
