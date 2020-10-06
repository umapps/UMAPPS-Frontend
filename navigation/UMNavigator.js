import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView, Button, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import AdminScreen from '../screens/home/AdminScreen'
import DeleteAccountScreen from '../screens/home/DeleteAccountScreen'
import UserHomeScreen from '../screens/home/UserHomeScreen'
import DetailScreen from '../screens/home/DetailScreen'
import UMNotificationsScreen from '../screens/home/UMNotificationsScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'
import SignUpScreen from '../screens/user/SignUpScreen'
import EnterOTPScreen from '../screens/user/EnterOTPScreen'
import ForgotPasswordScreen from '../screens/user/ForgotPasswordScreen'
import EnterForgotPasswordOTPScreen from '../screens/user/EnterForgotPasswordOTPScreen'
import Colors from '../constants/Constants'
import * as authActions from '../store/actions/auth'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen,
        SignUp: SignUpScreen,
        EnterOTP: EnterOTPScreen,
        EnterForgotPasswordOTP: EnterForgotPasswordOTPScreen,
        ForgotPassword: ForgotPasswordScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
)

const UserNavigator = createStackNavigator(
    {
        UMNotifications: UMNotificationsScreen,
        Detail: DetailScreen,
    },
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons
                    name={
                        Platform.OS === 'android' ? 'md-person' : 'ios-person'
                    }
                    size={23}
                    color={drawerConfig.tintColor}
                />
            ),
        },
        defaultNavigationOptions: defaultNavOptions,
    }
)

const AdminNavigator = createStackNavigator(
    {
        AdminScreen: AdminScreen,
    },
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-key' : 'ios-key'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            ),
        },
        defaultNavigationOptions: defaultNavOptions,
    }
)

const DeleteAccountNavigator = createStackNavigator(
    {
        DeleteAccountScreen: DeleteAccountScreen,
    },
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons
                    name={
                        Platform.OS === 'android'
                            ? 'md-close-circle'
                            : 'ios-close-circle'
                    }
                    size={23}
                    color={drawerConfig.tintColor}
                />
            ),
        },
        defaultNavigationOptions: defaultNavOptions,
    }
)

const HomePageNavigator = createDrawerNavigator(
    {
        'Notifications ': UserNavigator,
        'Admin ': AdminNavigator,
        'Delete_account   ': DeleteAccountNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary,
        },
        contentComponent: (props) => {
            const dispatch = useDispatch()
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView
                        forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItems {...props} />
                        <Button
                            title="Logout"
                            color={Colors.primary}
                            onPress={() => {
                                dispatch(authActions.logout())
                                props.navigation.navigate('Auth')
                            }}
                        />
                    </SafeAreaView>
                </View>
            )
        },
    }
)

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    HomePage: HomePageNavigator,
})

export default createAppContainer(MainNavigator)
