import React, { useState, useEffect, useReducer, useCallback, createContext } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,

  ActivityIndicator,
  Alert,
  Text,
  Button
} from 'react-native';
import {
Item, Input, Label
} from 'native-base'

import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import CustomInput from '../../components/UI/Input';
import Colors from '../../constants/Constants';
import * as authActions from '../../store/actions/auth';
import data from '../../data/Countries';
//import Toast from 'react-native-simple-toast';

const ForgotPasswordScreen = props => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobileNbrRegex = /^[0-9]*$/;
    

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordHandler = async () => {
    formState.inputValidities.password = isValidCheck('password', formState.inputValues.password);
    formState.inputValidities.password2 = (formState.inputValues.password === formState.inputValues.password2);
    formState.inputValidities.mobile = isValidCheck('mobile', formState.inputValues.mobile);
    let updatedStatus = true;
      const currentValidities = formState.inputValidities;
      for (const key in currentValidities) {
        updatedStatus = updatedStatus && currentValidities[key];
      }
    
      if(!updatedStatus)
      {
      Alert.alert('Error in the data entered', "All fields are mandatory");
      formState.inputValidities.fName = inputChangeHandler('mobile', formState.inputValues.mobile);
      return;
      }
    let checkValidityAction;
    checkValidityAction = authActions.checkIsRegistered(
      formState.inputValues.mobile
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(checkValidityAction);
      setIsLoading(false);
    }
    catch (err) {
      setError(err.message);
      setIsLoading(false);
      return;
    }
    let action;
      action = authActions.sendForgotPwOtp(
        formState.inputValues.mobile
      );
    setError(null);
    setIsLoading(true);
    try {
     await dispatch(action);
     setIsLoading(false);
     props.navigation.navigate('EnterForgotPasswordOTP', {
      userId: formState.inputValues.mobile,
      password:formState.inputValues.password
    });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

  const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
  
      if(action.input === 'password2')
      {
        if(!(updatedValues.password === updatedValues.password2))
        action.isValid = false;
        else
        action.isValid = true;
      }
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

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      password:'',
      password2:'',
      mobile:''
    },
    inputValidities: {
      password:true,
      password2:true,
      mobile:true
    },
    formIsValid: false
  });
  
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue) => {
      let isValidText = isValidCheck(inputIdentifier, inputValue);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: isValidText,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const isValidCheck = (inputIdentifier, inputValue) => {
    let isValidText = false;
  
    switch(inputIdentifier)
    {
      case 'password': 
      (inputValue.trim().length > 4) ? isValidText = true : isValidText = false;
      break;
      case 'password2': 
      (inputValue.length > 4) ? isValidText = true : isValidText = false;
      break;
      case 'mobile': 
      (inputValue.trim().length > 1 && (mobileNbrRegex.test(inputValue) || emailRegex.test(inputValue)))? isValidText = true : isValidText = false; 
      break;
      default:
        Alert.alert("Invalid Input");
    }
    return isValidText;
  }

  const createErrorText = (element, errorText) => {
    const errorTextComponent = (
      <Text style = {{color: "red"}}>{errorText}</Text>
    );
      if(element =="PASSWORD" && !formState.inputValidities.password)
      return errorTextComponent;
  
      if(element =="PASSWORD2" && !formState.inputValidities.password2)
      return errorTextComponent;
  
      if(element =="MOBILE" && !formState.inputValidities.mobile)
      return errorTextComponent;
  }
  const dispatch = useDispatch();
  return ( 
//           <KeyboardAvoidingView
//     behavior="padding"
//     keyboardVerticalOffset={10}
//     style={styles.screen}
//   >
      <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
<View style={styles.authContainer}>
<View style = {styles.textContainer}>
            <Text style = {styles.textContainer}>Provide your Mobile Number or Email Id </Text>
            <Text style = {{marginBottom:25}}>Same OTP will be sent to both  Mobile number and Email Id (if registered)</Text>
            </View>
            <View >
                   <Item  style={styles.itemStyle}
            error = {!formState.inputValidities.mobile}
            floatingLabel>             
             <Label>Email Id / Mobile Number *</Label>
             < Input 
             autoCapitalize = 'none'
             error = {!formState.inputValidities.mobile}
              style={styles.inputStyle}
            onChangeText={inputChangeHandler.bind(this, 'mobile')}
             /> 
            </Item>
            {createErrorText("MOBILE", 'Invalid Mobile Number/ Email Id')}
<View style = {{padding: 20}}></View>
            <Item  style={styles.itemStyle}
            error = {!formState.inputValidities.password}
            floatingLabel>             
             <Label>New Password *</Label>
             < Input 
             secureTextEntry
            onChangeText={inputChangeHandler.bind(this, 'password')}
             /> 
            </Item>
            {createErrorText("PASSWORD", 'Password Length cannot be less than 5')}
            <Item  style={styles.itemStyle}
            error = {!formState.inputValidities.password2}
            floatingLabel>             
             <Label>Confirm new Password *</Label>
             < Input 
             secureTextEntry
            onChangeText={inputChangeHandler.bind(this, 'password2')}
             /> 
            </Item>
            {createErrorText("PASSWORD2", 'Password not matched')}
            </View>
            <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={'Send OTP'}
                color={Colors.primary}
                onPress={forgotPasswordHandler}
              />
            )}
          </View>
</View>
</ScrollView>
// </KeyboardAvoidingView>
  );
};

ForgotPasswordScreen.navigationOptions = {
  headerTitle: 'Forgot Password'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent:'center',
   alignItems: 'center'
  },
  authContainer: {

    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'stretch',
   // width: '80%',
    // maxWidth: 400,
    // maxHeight: 400,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 5,
  },
  buttonContainer: {
    marginTop: 30,
    width: '70%'
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
    fontSize: 20,
    fontFamily : 'open-sans-bold'
  },
  iconStyle: {
    fontSize: 28
  },
  inputStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  textStyle:
  {
    margin: 10
  }, textStyleCancel:
  {
    marginRight: 30,

    marginBottom: 30
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  noBorder:{
    padding: 0,
    margin: 0,
    borderWidth: 0,
    borderBottomWidth: 0,
    flexDirection: "row",
    width : "100%"
  },
  itemStyle:{
     marginTop: 10,
    borderBottomWidth: 2,
    width : "100%",
    alignItems: 'center'
  }, 
  textAreaStyle: {
    borderWidth: 1,
    width : "100%"
  }
  
});

export default ForgotPasswordScreen;


