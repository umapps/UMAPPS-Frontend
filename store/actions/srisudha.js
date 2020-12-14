import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import AppConstants from '../../constants/Constants'

export const checkUserDetails = async() => {
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token } = transformedData;
        const url =
            AppConstants.server_url +
            '/get_ss_details'
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
            Alert.alert(errorId)
            return
        }
        else {
            let json = await response.json()
            return json;
        }
    }