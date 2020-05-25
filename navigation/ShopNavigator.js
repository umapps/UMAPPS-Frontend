import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer
  
} from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { Platform} from 'react-native';

import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import SignUpScreen from '../screens//user/SignUpScreen';
import EnterOTPScreen from '../screens//user/EnterOTPScreen';
import Colors from '../constants/Constants';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    SignUp: SignUpScreen,
    EnterOTP: EnterOTPScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
});

export default createAppContainer(MainNavigator);
