import React, { useState, useEffect, useReducer, useCallback, createContext } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,

  ActivityIndicator,
  Alert,
  Text,
  Modal,
  Button,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import {
  Icon, Container, 
Content, Form, Item, Input, Label, Textarea
} from 'native-base'

import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import CustomInput from '../../components/UI/Input';
import Colors from '../../constants/Constants';
import * as authActions from '../../store/actions/auth';
import data from '../../data/Countries';
//import Toast from 'react-native-simple-toast';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const mobileNbrRegex = /^[0-9]*$/;

const SignUpScreen = props => {


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



const countryData = data;
const defaultFlag = data.filter(
  obj => obj.name === 'India'
  )[0].flag;


  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setFlag] = useState(defaultFlag);
  const [countryCode, setCountryCode] = useState('+91');
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fName: '',
      lName:'',
      address:'',
      password:'',
      password2:'',
      email:'',
      mobile:''
    },
    inputValidities: {
      fName: true,
      lName: true,
      address:true,
      password:true,
      password2:true,
      email:true,
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

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

const preSignup = ()=> {
formState.inputValidities.fName = isValidCheck('fName', formState.inputValues.fName);
formState.inputValidities.lName = isValidCheck('lName', formState.inputValues.lName);
formState.inputValidities.address = isValidCheck('address', formState.inputValues.address);
formState.inputValidities.password = isValidCheck('password', formState.inputValues.password);
formState.inputValidities.password2 = isValidCheck('password2', formState.inputValues.password2);
formState.inputValidities.email = isValidCheck('email', formState.inputValues.email);
formState.inputValidities.mobile = isValidCheck('mobile', formState.inputValues.mobile);
let updatedStatus = true;
  const currentValidities = formState.inputValidities;
  for (const key in currentValidities) {
    updatedStatus = updatedStatus && currentValidities[key];
  }

  if(!updatedStatus)
  {
  Alert.alert('Mandatory fields not entered', "Except Email Address, all fields are mandatory");
  formState.inputValidities.fName = inputChangeHandler('fName', formState.inputValues.fName);
  return;
  }
  signUpHandler();
}

  const signUpHandler = async () => {
    let action;
      action = authActions.sendOtp(
        formState.inputValues.email,
        formState.inputValues.mobile
      );
    setError(null);
    setIsLoading(true);
    try {
     await dispatch(action);
     setIsLoading(false);
     props.navigation.navigate('EnterOTP', {
      emailText : formState.inputValues.email,
      mobileText: formState.inputValues.mobile
    });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const createIcon = (element) => {
const icon = (
  <Icon name='close-circle'/>
);
    if(element == "FIRSTNAME"  && !formState.inputValidities.fName)
      return icon;
      if(element == "LASTNAME"  && !formState.inputValidities.lName)
      return icon;
      if(element == "EMAIL"  && !formState.inputValidities.email)
      return icon;
      if(element == "PASSWORD"  && !formState.inputValidities.password)
      return icon;
      if(element == "PASSWORD2"  && !formState.inputValidities.password2)
      return icon;
      if(element == "MOBILE"  && !formState.inputValidities.mobile)
      return icon;
}

const createErrorText = (element, errorText) => {
  const errorTextComponent = (
    <Text style = {{color: "red"}}>{errorText}</Text>
  );
  if(element =="FIRSTNAME" && !formState.inputValidities.fName)
    return errorTextComponent;
  if (element =="LASTNAME" && !formState.inputValidities.lName)
    return errorTextComponent;

    if (element =="ADDRESS" && !formState.inputValidities.address)
    return errorTextComponent;

    if(element =="EMAIL" && !formState.inputValidities.email)
    return errorTextComponent;

    if(element =="PASSWORD" && !formState.inputValidities.password)
    return errorTextComponent;

    if(element =="PASSWORD2" && !formState.inputValidities.password2)
    return errorTextComponent;

    if(element =="MOBILE" && !formState.inputValidities.mobile)
    return errorTextComponent;
}
  const selectCountry = async (country) => {
    const countryData = await data
    try {
      // Get the country code
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      // Get the country flag
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      // Update the state then hide the Modal
      setCountryCode(countryCode);
      setFlag(countryFlag);
      //setState({ phoneNumber: countryCode, flag: countryFlag })
      await setModalVisible(false);
    }
    catch (err) {
      console.log(err)
    }
  };


  const isValidCheck = (inputIdentifier, inputValue) => {
    let isValidText = false;
  
    switch(inputIdentifier)
    {
      case 'fName': 
      (inputValue.trim().length > 0) ? isValidText = true : isValidText = false;
      break;
      case 'lName': 
      (inputValue.trim().length > 0) ? isValidText = true : isValidText = false;
      break;
      case 'address': 
      (inputValue.trim().length > 0) ? isValidText = true : isValidText = false;
      break;
      case 'password': 
      (inputValue.trim().length > 4) ? isValidText = true : isValidText = false;
      break;
      case 'password2': 
      (inputValue.length > 4) ? isValidText = true : isValidText = false;
      break;
      case 'email': 
    (inputValue.trim().length == 0 || emailRegex.test(inputValue)) ? isValidText = true : isValidText = false;
      break;

      case 'mobile': 
      (inputValue.trim().length > 1 && mobileNbrRegex.test(inputValue))? isValidText = true : isValidText = false; 
      break;
      default:
        Alert.alert("NUMBER NOT FOUND");
    }
    return isValidText;
  }

  return ( 

    <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.gradient}>
      <View style={styles.authContainer}>
        <ScrollView>
            <Item  style={styles.itemStyle}
            error = {!formState.inputValidities.fName}
            floatingLabel>             
             <Label>First Name * </Label>
             < Input 
             onChangeText={inputChangeHandler.bind(this, 'fName')}/>
             {createIcon("FIRSTNAME")}  
            </Item>
            {createErrorText("FIRSTNAME", 'First Name cannot be empty')} 


            <Item  style={styles.itemStyle}
            error = {!formState.inputValidities.lName}
            floatingLabel>             
             <Label>Last Name * </Label>
             <Input 
           onChangeText={ inputChangeHandler.bind(this, 'lName')}
             />
             {createIcon("LASTNAME")}  
            </Item>
          
            {createErrorText("LASTNAME", 'Last Name cannot be empty')}

 <Text style = {{paddingTop: 15, fontSize: 15}}> Address *</Text>
                    <View>
             < Textarea style = {styles.textAreaStyle}
                         onChangeText={inputChangeHandler.bind(this, 'address')}/>
            </View>
            {createErrorText("ADDRESS", 'Address cannot be empty')}
          
          <Item  style={styles.itemStyle}
            error = {!formState.inputValidities.password}
            floatingLabel>             
             <Label>Password * </Label>
             < Input 
             secureTextEntry
             onChangeText={inputChangeHandler.bind(this, 'password')}/>
             {/* {createIcon("PASSWORD")}    */}
            </Item>
          
            {createErrorText("PASSWORD", 'Password Length cannot be less than 5')}

            <Item  style={styles.itemStyle}
            error = {!formState.inputValidities.password2}
            floatingLabel>             
             <Label>Re-enter Password * </Label>
             < Input 
             secureTextEntry
             onChangeText={inputChangeHandler.bind(this, 'password2')}/>
             {/* {createIcon("PASSWORD2")}   */}
            </Item>
            {createErrorText("PASSWORD2", 'Password not matched')}

<View style = {styles.textContainer}>
            <Text style = {styles.textContainer}>OTP will be sent to Email ID and Mobile </Text>
            <Text>(Register your Email ID to receive instant OTP's, Confirmations and Communications. But, Email ID is not mandatory)</Text>
            </View>
            <Item  style={styles.itemStyle}
            error = {!formState.inputValidities.email}
            floatingLabel>             
             <Label>Email Address </Label>
             < Input 
             style={styles.inputStyle}
             keyboardType="email-address"
             onChangeText={inputChangeHandler.bind(this, 'email')}/>
             {/* {createIcon("EMAIL")}   */}
            </Item>
          
            {createErrorText("EMAIL", 'Invalid Email Address')}
            
          <Item style = {styles.itemStyle} 
          error = {!formState.inputValidities.mobile}>
            <Icon
              active
              name='md-arrow-dropup-circle'
              style={styles.iconStyle}
              onPress={() => setModalVisible(true)}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}><Text style={styles.inputStyle}>{flag}</Text></TouchableOpacity>

            <View><Text >{countryCode}</Text></View> 

            <Item  style={styles.noBorder}
            floatingLabel>             
             <Label>Mobile Number *</Label>
             < Input 
             style={styles.inputStyle}
             keyboardType="number-pad"
             onChangeText={inputChangeHandler.bind(this, 'mobile')}/>
             {createIcon("MOBILE")}   
            </Item>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={modalVisible}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 7, marginTop: 30, marginBottom: 30}}>
                      <FlatList
                        data={countryData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                          ({ item }) =>
                            <TouchableWithoutFeedback onPress={() => selectCountry(item.name)}>
                              <View style={styles.countryStyle}>
                                <Text style={styles.textStyle}>
                                  {item.flag} {item.name} ({item.dial_code})
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                        }
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={styles.closeButtonStyle}>
                      <Text style={styles.textStyleCancel}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
          </Item>

          {createErrorText("MOBILE", 'Invalid Mobile Number')}

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.accent} />
            ) : (
              <Button
                title={'Send OTP'}
                color={Colors.primary}
                onPress={preSignup}
              />
            )}
          </View>

        </ScrollView>
      </View>
    </LinearGradient>
  );
};

SignUpScreen.navigationOptions = {
  headerTitle: 'Register'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    alignItems: 'center'
  },
  authContainer: {
   // width: '80%',
    // maxWidth: 400,
    // maxHeight: 400,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 5,
  },
  buttonContainer: {
    marginTop: 30
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
    width : "100%"
  }, 
  textAreaStyle: {
    borderWidth: 1,
    width : "100%"
  }
  
});

export default SignUpScreen;


