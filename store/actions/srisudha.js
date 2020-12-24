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
            Alert.alert("An Error occured", errorId, [{text: 'Okay'}])
            return
        }
        else {
            let json = await response.json()
            return json;
        }
    }


    export const updateUserDetails = async(addressId, name, address, district, pincode) => {
        const userData = await AsyncStorage.getItem('userData');
        const transformedData = JSON.parse(userData);
        const { token } = transformedData;

        const message = 
            {
                addressId: addressId,
                name: name,
                address: address,
                district: district,
                pincode: pincode
            };
        const url =
            AppConstants.server_url +
            '/update_ss_details'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(message),
        })
        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error
            Alert.alert("An Error occured", errorId, [{text: 'Okay'}])
            return
        }
        else {
            let json = await response.json()
            return json;
        }
    }