import AsyncStorage from '@react-native-community/async-storage'
import AppConstants from '../../constants/Constants'

export const sendNotification = (isEmail, isSms, isPush, subject, text) => {
    return async (dispatch) => {
        const message = {
            isEmail,
            isSms,
            isPush,
            subject,
            text,
        }
        const userData = await AsyncStorage.getItem('userData')

        const transformedData = JSON.parse(userData)

        const { token } = transformedData

        const url = AppConstants.server_url + '/publish-notification'
        const response = await fetch(
            url,

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(message),
            }
        )

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
