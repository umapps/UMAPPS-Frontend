import React, { Component, useEffect } from 'react'
import chatIcon from '../../components/UI/liveChat.png'
import {
    View,
    Alert,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Linking,
} from 'react-native'
import { Card, CardItem, Body, Text, Spinner } from 'native-base'
import Colors from '../../constants/Constants'
import * as userActions from '../../store/actions/user'
import * as Font from 'expo-font'
import moment from 'moment'
import { render } from 'react-dom'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'

const DetailScreen = (props) => {
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
                    height: '50%',
                    width: '100%',
                    marginTop: 10,
                    flex: 1,
                    alignContent: 'center',
                    flexDirection: 'column',
                }}>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 30,
                        fontWeight: 'bold',
                    }}>
                    {props.navigation.state.params.data.subject}
                </Text>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        marginTop: 50,
                        marginLeft: 10,
                        marginRight: 10,
                    }}>
                    {props.navigation.state.params.data.text}
                </Text>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginTop: 50,
                    }}>
                    Date Posted-:{' '}
                    {moment(
                        props.navigation.state.params.data.createdDate
                    ).format('DD/MM/YYYY')}
                </Text>
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

DetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Event Detail',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={
                        Platform.OS === 'android' ? 'md-menu' : 'ios-arrow-back'
                    }
                    onPress={() => {
                        navData.navigation.pop()
                    }}
                />
            </HeaderButtons>
        ),
    }
}
export default DetailScreen
