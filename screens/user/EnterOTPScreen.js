import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert,
  Text
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Constants';
import InputCode from 'react-native-input-code';

const EnterOTPScreen = (props) => {

  const emailText = props.navigation.state.params.emailText;
  const mobileText = props.navigation.state.params.mobileText;
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={20}
    style={styles.screen}
  >
    <LinearGradient colors={['#8dc5fc', '#8dc5fc']} style={styles.gradient}>
      <View style={styles.authContainer}>
        <ScrollView>
        { emailText.trim().length ? (

          <React.Fragment>
                       <Card style={styles.authContainer}>
        <View><Text >Enter OTP received to your Mobile number {mobileText}</Text></View>
<InputCode
          length={4}
          // onChangeCode={onChangeCode}
          // onFullFill={onFullFill}
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
          </Card>

          <Card style={styles.authContainer}>
        <View><Text >Enter OTP received to your Email address {emailText}</Text></View>
          <InputCode
          length={4}
          autoFocus={false}
          codeContainerStyle={{
            borderWidth: 0,
            borderBottomWidth: 2,
          }}
          codeContainerCaretStyle={{
            borderWidth: 0,
            borderBottomWidth: 2,
            borderBottomColor: 'red',

          }}
        />
          </Card>
  </React.Fragment>
    ) : (
      <React.Fragment>
         <Card style={styles.authContainer}>
    <View><Text >Enter OTP received to your Mobile number {mobileText}</Text></View>

      <View style={styles.container}>
        <InputCode
          length={4}
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
      </View>
  </Card>
  </React.Fragment>)}

  <View style={styles.buttonContainer}>
              <Button
                title={`Register`}
                color={Colors.primary}
              />
            </View>
        </ScrollView>
      </View>
    </LinearGradient>
  </KeyboardAvoidingView>
  );
};

EnterOTPScreen.navigationOptions = {
  headerTitle: 'Enter OTP'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  buttonContainer: {
    marginTop: 10
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '100%',
    padding: 20,
    marginBottom: 20
  },
  buttonContainer: {
    marginTop: 30
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center'
  },
  iconStyle: {
    fontSize: 28
  },
  itemStyle: {
    marginBottom: 10,
  },
  inputStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  textStyle:
  {
    margin: 10
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#002aff",
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
    borderColor: "#000000",
  },
});

export default EnterOTPScreen;
