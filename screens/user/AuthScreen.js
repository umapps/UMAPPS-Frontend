import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import * as Updates from 'expo-updates';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Constants';
import * as authActions from '../../store/actions/auth';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {

  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Checking for updates..");
  const [isDownloadingUpdates, setIsDownloadingUpdates] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

 const sendPushNotification = async () => {
    const message = [{
      to: token,
      sound: 'default',
      title: 'Login Successful!',
      body: 'Find the menu items on right',
      data: { data: 'goes here' },
      channelId: 'UMnotify',
      _displayInForeground: true,
    }
  ];
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  useEffect(() => {
    const downloadOTAupdates = async () => {
      try {
        setIsDownloadingUpdates(true);
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setLoadingMessage("New updates found, Downloading.. this might take some depending on network connectivity");
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      }
      catch (e) { console.log(e) }
      finally {
        setIsDownloadingUpdates(false);
      }

      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('App not permitted for push notifications. Please provide this permission if you wish to receive push notifications');
          return;
        }
        if (Platform.OS === 'android') {
          Notifications.createChannelAndroidAsync('UMnotify', {
            name: 'UMnotify',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
          });
        }   
        expoToken = await Notifications.getExpoPushTokenAsync();
        setToken(expoToken);
      }
    };
    downloadOTAupdates();
  }, [error]);

  const authHandler = async () => {
    let action;
    action = authActions.login(
      formState.inputValues.email,
      formState.inputValues.password
    );
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('HomePage');
      sendPushNotification();
      setIsLoading(false);
    } catch (err) {
      Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
      setIsLoading(false);
    }
  };

  const signUpHandler = async () => {
    props.navigation.navigate('SignUp');
  };

  const forgotPasswordHandler = async () => {
    props.navigation.navigate('ForgotPassword');
  }
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const uiComponent = (
    // <KeyboardAvoidingView
    //   behavior="padding"
    //   keyboardVerticalOffset={50}
    //   style={styles.screen}
    // >
    <LinearGradient colors={['#8dc5fc', '#8dc5fc']} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="Email / Mobile number"
            keyboardType="email-address"
            required
            email
            showLabel
            placeholder="Email/ 10 Digit Mobile number"
            autoCapitalize="none"
            errorText="Please enter a valid Email or 10 digit Mobile number"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            showLabel
            minLength={5}
            placeholder="Password"
            autoCapitalize="none"
            errorText="Please enter a valid password"
            onInputChange={inputChangeHandler}
            initialValue=""
          />

          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "blue" }}
              onPress={forgotPasswordHandler}>
              Forgot Password
      </Text>
          </View>
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
                <Button
                  title={'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
          </View>

          <View style={styles.textContainer}>
            <Text>
              Not Registered yet ?
      </Text>
          </View>
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
                <Button
                  title={`Register`}
                  color={Colors.accent}
                  onPress={signUpHandler}
                />
              )}
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
    // </KeyboardAvoidingView>
  );

  const loadingComponent = (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text> {loadingMessage}</Text>
    </View>
  );
  return isDownloadingUpdates ? loadingComponent : uiComponent;
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authorize'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    minWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center'
  }
});

export default AuthScreen;
