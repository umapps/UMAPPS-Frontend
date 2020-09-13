import AsyncStorage from '@react-native-community/async-storage'
import AppConstants from '../../constants/Constants'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
export const getNotifications = async () => {
    return async (dispatch) => {
        const userData = await AsyncStorage.getItem('userData')

        const transformedData = JSON.parse(userData)

        const { token } = transformedData
        const url = AppConstants.server_url + '/notifications'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error
            let message = 'Something went wrong!'
            if (errorId === 'Unauthorized') {
                message = 'Invalid credentials'
            }
            throw new Error(message)
        }
        // console.log(response.body)
        const resData = await response.json()
        console.log(JSON.stringify(resData))

        await AsyncStorage.setItem('notifications', JSON.stringify(resData))

        resData.map((item, index) => {
            return (
                <View key={index}>
                    <Text>{item.text}</Text>
                </View>
            )
        })
    }
}
