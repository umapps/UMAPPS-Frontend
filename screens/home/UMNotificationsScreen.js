import React, { Component } from 'react'
import { View, Alert, ScrollView } from 'react-native'
import { Card, CardItem, Body, Text, Spinner } from 'native-base'
import Colors from '../../constants/Constants'
import * as userActions from '../../store/actions/user'
import * as Font from 'expo-font'
import moment from 'moment'
class UMNotificationsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notificationList: [],
            isLoading: true,
        }
    }
    async componentDidMount() {
        try {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            })
            const notifications = await userActions.getNotifications()
            this.setState({ notificationList: notifications, isLoading: false })
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    render() {
        const { isLoading, notificationList } = this.state
        if (isLoading) {
            return <Spinner color={Colors.primary}></Spinner>
        } else if (
            notificationList === undefined ||
            notificationList.length === 0
        ) {
            return (
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        fontFamily: 'open-sans-bold',
                    }}>
                    <Text>No notifications!</Text>
                </View>
            )
        } else if (notificationList && notificationList.length > 0) {
            const notificationsCardList = notificationList.map(
                (notifcation) => (
                    <Card>
                        <CardItem header>
                            <Text>{notifcation.subject}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text> {notifcation.text}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>
                                {moment(notifcation.createdDate).format(
                                    'DD/MM/YYYY'
                                )}
                            </Text>
                        </CardItem>
                    </Card>
                )
            )
            return (
                <ScrollView style={{ margin: 20 }}>
                    {notificationsCardList}
                </ScrollView>
            )
        }
    }
}
UMNotificationsScreen.navigationOptions = {
    headerTitle: 'Notifications',
}
export default UMNotificationsScreen
