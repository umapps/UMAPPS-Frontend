import React, { useState, useEffect, useReducer, useCallback } from 'react'
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    Alert,
    Text,
    ActivityIndicator,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Constants'
import InputCode from 'react-native-input-code'
import * as authActions from '../../store/actions/auth'

const EnterForgotPasswordOTPScreen = (props) => {
    const userId = props.navigation.state.params.userId
    const password = props.navigation.state.params.password

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [mobileOTP, setMobileOTP] = useState('')
    const [currentCount, setCount] = useState(30)
    const Clock = () => {
        const timer = () => setCount(currentCount - 1)
        useEffect(() => {
            if (currentCount <= 0) {
                return () => clearInterval(id)
            }
            const id = setInterval(timer, 1000)
            return () => clearInterval(id)
        }, [currentCount])
        return (
            <Text style={{ flex: 3 }}>
                <Text>Resend OTP in </Text>
                <Text
                    style={{
                        paddingRight: 0,
                        fontSize: 25,
                        fontWeight: 'bold',
                        justifyContent: 'flex-end',
                    }}>
                    {currentCount}{' '}
                </Text>
                <Text>seconds </Text>
            </Text>
        )
    }
    const dispatch = useDispatch()

    const resendOTP = async () => {
        let action
        action = authActions.sendForgotPwOtp(userId)
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(action)
            setIsLoading(false)
        } catch (err) {
            setError(err.message)

            setIsLoading(false)
        }
        setCount(30)
    }
    const registerHandler = async () => {
        if (mobileOTP.trim().length != 4) {
            Alert.alert('OTP not entered correctly')
            return
        }
        let action
        action = authActions.resetPassword(userId, password, mobileOTP)
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(action)
            Alert.alert(
                'Success!',
                'Password reset successfully. Please login to continue'
            )
            props.navigation.navigate('Auth')
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }])
        }
    }, [error])
    const mobileComponent = (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={20}
            style={styles.screen}>
            <LinearGradient
                colors={['#8dc5fc', '#8dc5fc']}
                style={styles.gradient}>
                <View style={styles.authContainer}>
                    <ScrollView>
                        <Card style={styles.authContainer}>
                            <View>
                                <Text>
                                    Enter OTP received to your Mobile number /
                                    Email ID - {userId}
                                </Text>
                            </View>
                            <InputCode
                                length={4}
                                onChangeCode={(mobileOTP) => {
                                    setMobileOTP(mobileOTP)
                                }}
                                //onFullFill={onFullFill}
                                codeContainerStyle={{
                                    borderWidth: 0,
                                    borderBottomWidth: 2,
                                }}
                                codeContainerCaretStyle={{
                                    borderWidth: 0,
                                    borderBottomWidth: 2,
                                    borderBottomColor: 'red',
                                }}
                                autoFocus
                            />
                            <View style={styles.resendOTPView}>
                                <Clock />
                                <View style={{ flex: 2, marginleft: 10 }}>
                                    <Button
                                        title={' Resend OTP '}
                                        color={Colors.accent}
                                        disabled={
                                            currentCount > 0 ? true : false
                                        }
                                        onPress={resendOTP}
                                    />
                                </View>
                            </View>
                        </Card>
                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.primary}
                                />
                            ) : (
                                <Button
                                    title={'Reset Password'}
                                    color={Colors.primary}
                                    onPress={registerHandler}
                                />
                            )}
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )

    return mobileComponent
}

EnterForgotPasswordOTPScreen.navigationOptions = {
    headerTitle: 'Enter OTP',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    buttonContainer: {
        marginTop: 10,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authContainer: {
        width: '100%',
        padding: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 30,
    },
    textContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    iconStyle: {
        fontSize: 28,
    },
    itemStyle: {
        marginBottom: 10,
    },
    inputStyle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    textStyle: {
        margin: 10,
    },
    borderStyleBase: {
        width: 30,
        height: 45,
    },

    borderStyleHighLighted: {
        borderColor: '#002aff',
    },

    underlineStyleBase: {
        fontSize: 25,
        fontWeight: 'bold',
        width: 30,
        height: 25,
        borderWidth: 0,
        borderBottomWidth: 2,
    },

    underlineStyleHighLighted: {
        fontSize: 25,
        fontWeight: 'bold',
        borderColor: '#000000',
    },
    resendOTPView: {
        flex: 1,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
    },
})

export default EnterForgotPasswordOTPScreen
