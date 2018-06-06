import React, {Component} from 'react';
import {
    Text,
    StatusBar,
    TextInput,
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Button,
    KeyboardAvoidingView
} from 'react-native';

import ZKButton from './ZKButton'

export default class App extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Login',
        headerTitle: '我是Login',
        headerRight: (
            <Button
                onPress={() => navigation.navigate('Chat')}
                title="Info"
            />
        ),
    });

    constructor(props) {
        super(props)
        this.state = {name: '', email: ''}
    }

    render() {
        return (
            <ScrollView style={styles.container} keyboardDismissMode='on-drag'>
                {/*<StatusBar barStyle="dark-content"/>*/}
                <View style={styles.header}>
                    <Text style={styles.description}>
                        This demo shows how using available TextInput customizations can make
                        forms much easier to use. Try completing the form and notice that different
                        fields have specific optimizations and the return key changes from focusing
                        next input to submitting the form.
                    </Text>
                </View>


                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                    ref={ref => {
                        this._nameInput = ref
                    }}
                    placeholder="请输入帐号"
                    autoFocus={true}
                    autoCapitalize="words"
                    autoCorrect={true}
                    keyboardType="default"
                    returnKeyType="next"
                    onSubmitEditing={this._next}
                    blurOnSubmit={false}
                />visible-password
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                    ref={ref => {
                        this._emailInput = ref
                    }}
                    placeholder="请输入密码"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    secureTextEntry={true}
                    returnKeyType="done"
                    onSubmitEditing={this._submit}
                    blurOnSubmit={true}
                />
                <View style = {[styles.container, {alignItems:'center'}]}>
                    <ZKButton onPress={this._submit}
                              title='登录'
                              style={{
                                  marginTop: 25,
                                  marginBottom: 25,
                                  backgroundColor: '#235',
                                  width: 100,
                                  height: 40
                              }}
                              color='#fff'
                    />
                </View>
            </ScrollView>
        );
    }

    _next = () => {
        this._emailInput && this._emailInput.focus();
    };

    _submit = () => {
        alert(`Welcome, ${this.state.name}! Confirmation password has been sent to ${this.state.email}`);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column-reverse',
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
