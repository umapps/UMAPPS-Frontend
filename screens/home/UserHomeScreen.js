import React, { Component } from 'react'
import {
    View,
    Platform,
    StyleSheet,
    Linking,
    Image,
    TouchableHighlight,
} from 'react-native'
import { Text, Button } from 'native-base'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import chatIcon from '../../components/UI/liveChat.png'
import HeaderButton from '../../components/UI/HeaderButton'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
class UserHomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            onNotificationClick: false,
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        })
        this.setState({ isLoading: false })
    }
    render() {
        const { isLoading } = this.state
        if (isLoading) {
            return <AppLoading />
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        fontFamily: 'open-sans-bold',
                    }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            flex: 1,
                            width: '70%',
                        }}>
                        <Button
                            style={{ justifyContent: 'center' }}
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'UMNotifications'
                                )
                            }}>
                            <Text>Click to view Notifications!</Text>
                        </Button>
                    </View>
                    <TouchableHighlight
                        underlayColor="white"
                        style={{
                            flex: 1,
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            height: '12%',
                            width: '25%',
                        }}
                        onPress={() => {
                            Linking.openURL(
                                'https://tawk.to/chat/5f44a5b61e7ade5df443a843/default'
                            )
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                            }}>
                            <Text
                                style={{
                                    color: 'blue',
                                    height: '100%',
                                    width: '100%',
                                    paddingBottom: 1,
                                    alignItems: 'center',
                                }}>
                                Any queries?
                            </Text>
                            <Image
                                source={chatIcon}
                                style={{
                                    position: 'absolute',
                                    right: 5,
                                    bottom: 5,
                                    height: '65%',
                                    width: '100%',
                                }}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }
    }
}

UserHomeScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Home Page',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={
                        Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
                    }
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Notifications"
                    iconName={
                        Platform.OS === 'android'
                            ? 'md-notifications'
                            : 'ios-notifications'
                    }
                    onPress={() => {
                        navData.navigation.navigate('UMNotifications')
                    }}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

export default UserHomeScreen
