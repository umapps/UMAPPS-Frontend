import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import AppConstants from '../../constants/Constants'

import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

export const authenticate = (userId, token, expiryTime) => {
    return (dispatch) => {
        // dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token })
    }
}

export const sendOtp = (email, countyCode, mobile) => {
    return async (dispatch) => {
        const url =
            AppConstants.server_url +
            '/send-rgOTP?mobileNumber=' +
            mobile +
            '&countryCode=' +
            countyCode +
            '&emailId=' +
            email
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error
            Alert.alert(errorId)
            return
        }
    }
}

export const deleteuser = (token) => {
    return async (dispatch) => {
        const url = AppConstants.server_url + '/delete'
        const response = await fetch(url, {
            method: 'DELETE',
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
        } else {
            logout()
            Alert.alert('User deleted successfully.')
        }
    }
}

export const sendForgotPwOtp = (userId) => {
    return async (dispatch) => {
        const url = AppConstants.server_url + '/send-fpOTP?userId=' + userId
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
    }
}
export const checkValidity = (email, mobile) => {
    return async (dispatch) => {
        const url =
            AppConstants.server_url +
            '/check-validity?mobileNumber=' +
            mobile +
            '&emailId=' +
            email
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            const errorResData = await response.json()
            throw new Error(errorResData.message)
        }
    }
}

export const checkIsRegistered = (userId) => {
    return async (dispatch) => {
        const url = AppConstants.server_url + '/is-registered?userId=' + userId
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            const errorResData = await response.json()
            throw new Error(errorResData.message)
        }
    }
}

export const login = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(AppConstants.server_url + '/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: email,
                password: password,
                returnSecureToken: true,
            }),
        })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error
            let message = 'Something went wrong!'
            if (errorId === 'Unauthorized') {
                message = 'Invalid credentials'
            }
            // else if (errorId === 'INVALID_PASSWORD') {
            //   message = 'This password is not valid!';
            // }
            throw new Error(message)
        }
        const resData = await response.json()
        updateDeviceToken(resData.deviceToken, resData.accessToken)
        saveDataToStorage(
            resData.accessToken,
            resData.id,
            resData.emailId,
            resData.mobileNumber,
            resData.roles
        )
    }
}

export const resetPassword = (userId, password, otp) => {
    return async (dispatch) => {
        const response = await fetch(
            AppConstants.server_url + '/reset-password',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    password: password,
                    otp: otp,
                }),
            }
        )
        if (!response.ok) {
            const errorResData = await response.json()
            throw new Error(errorResData.message)
        }
    }
}

export const register = (
    fName,
    lName,
    address,
    password,
    email,
    mobile,
    countryCode,
    mobileOTP,
    emailOTP,
    expoToken
) => {
    return async (dispatch) => {
        const response = await fetch(AppConstants.server_url + "/sign-up", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailId: email,
                firstName: fName,
                lastName: lName,
                address: address,
                mobileNumber: mobile,
                password: password,
                mobileOTP: mobileOTP,
                emailOTP: emailOTP,
                countryCode: countryCode,
                deviceToken: expoToken,
            }),
        })

        if (!response.ok) {
            const errorResData = await response.json()
            throw new Error(errorResData.message)
        }
    }
}

const saveDataToStorage = async (
    token,
    userId,
    emailId,
    mobileNumber,
    roles
) => {
    await AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            emailId: emailId,
            mobileNumber: mobileNumber,
            roles: roles,
            //Set the expiry date to 7 days from now
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
    )
}

const updateDeviceToken = async (deviceToken, accessToken) => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        )
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(
                Permissions.NOTIFICATIONS
            )
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            return
        }
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('UMnotify', {
                name: 'UMnotify',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            })
        }
        expoToken = await Notifications.getExpoPushTokenAsync()
        var tokenArray = []
        if (deviceToken != null) {
            var tokenArray = deviceToken.split(',')
        }
        if (tokenArray.includes(expoToken)) return
        else {
            tokenArray.push(expoToken)
            {
                const response = await fetch(
                    AppConstants.server_url + '/update_token',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: accessToken,
                        },
                        body: tokenArray.toString(),
                    }
                )
                if (!response.ok) {
                    throw new Error('Unable to update device token')
                }
            }
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}
