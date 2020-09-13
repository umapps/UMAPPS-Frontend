import React, { useState } from 'react'
import {
    View,
    Platform,
    StyleSheet,
    Linking,
    Image,
    TouchableHighlight,
    Alert,
} from 'react-native'
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Row,
    Button,
    Spinner,
} from 'native-base'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import chatIcon from '../../components/UI/liveChat.png'
import HeaderButton from '../../components/UI/HeaderButton'
import * as userActions from '../../store/actions/user'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

const UserHomeScreen = () => {
    const dispatch = useDispatch()
    // const transformedData  = null
    const [isLoading, setIsLoading] = useState(false)
    // const transformedData
    const userNotificationHandler = async () => {
        let action
        action = await userActions.getNotifications()
        setIsLoading(true)
        try {
            await dispatch(action)
            setIsLoading(false)
            Alert.alert('Success!', 'Notification(s) sent successfully')
        } catch (err) {
            Alert.alert('An Error Occurred!', err.message)
            setIsLoading(false)
        }

        const userData = await AsyncStorage.getItem('notifications')

        // transformedData = JSON.parse(userData)

        // console.log(transformedData)
    }
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Text
                style={{
                    // justifyContent: 'flex-start',
                    position: 'absolute',
                    top: 10,
                    width: '100%',
                    fontWeight: 'bold',
                }}>
                My Notifications
            </Text>
            {/* <View>{async () => {
                console.log('1234567890')
                await this.userNotificationHandler.bind(this)
                }}</View> */}

            {/* <Button onClick={() => userNotificationHandler()}>Click me!</Button> */}
            {isLoading ? (
                <Spinner color="#FE4040" />
            ) : (
                <Button
                    onPress={async () => {
                        userNotificationHandler()
                    }}>
                    <Text>Click Me!</Text>
                </Button>
            )}
            <View
                style={{
                    // justifyContent: 'flex-start',
                    position: 'absolute',
                    top: 30,
                    width: '100%',
                }}>
                <Card
                    renderRow={async () => {
                        userNotificationHandler()
                    }}>
                    <CardItem header>
                        <Text>Notification 1</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text> Notification Text</Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Text>Date & Time</Text>
                    </CardItem>
                </Card>
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

UserHomeScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Home Page',
        headerLeft: (
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
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Cart"
                    iconName={
                        Platform.OS === 'android' ? 'md-person' : 'ios-person'
                    }
                    // onPress={() => {
                    //   navData.navigation.navigate('Cart');
                    // }}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

export default UserHomeScreen
