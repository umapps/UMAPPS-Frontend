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
  TouchableWithoutFeedback
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
import Toast from 'react-native-simple-toast';

const countryData = data;
const defaultFlag = data.filter(
  obj => obj.name === 'India'
  )[0].flag;

const SignUpScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setFlag] = useState(defaultFlag);
  const [countryCode, setCountryCode] = useState('+91');
  const [error, setError] = useState();


  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const [mobileError, setMobileError] = useState(false);


  const [firstNameText, setFirstNameText] = useState('');
  const [lastNameText, setLastNameText] = useState('');
  const [addressText, setAddressText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [password2Text, setPassword2Text] = useState('');
  const [mobileText, setMobileText] = useState('');
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);


  // useEffect(() => {
  //   firstNameTextChange(firstNameText);
  //   lastNameTextChange(lastNameText);
  //   addressTextChange(addressText);
  //   password2TextChange(password2Text);
  //   passwordTextChange(passwordText);
  //   emailTextChange(emailText);
  //   mobileTextChange(mobileText);
  // }, [firstNameError,lastNameError ,addressError ,password2Error,passwordError , emailError , mobileError]);

  
const preSignup = ()=> {
  firstNameTextChange(firstNameText);
  lastNameTextChange(lastNameText);
  addressTextChange(addressText);
  password2TextChange(password2Text);
  passwordTextChange(passwordText);
  emailTextChange(emailText);
  mobileTextChange(mobileText);
  if(firstNameError || lastNameError || addressError || password2Error || passwordError || emailError || mobileError)
  {
    return;
  }
else
{
  signUpHandler();
}
}

  const signUpHandler = async () => {
    let action;
      action = authActions.sendOtp(
        emailText,
        mobileText
      );
    setError(null);
    setIsLoading(true);
    try {
     await dispatch(action);
     setIsLoading(false);
     props.navigation.navigate('EnterOTP', {
      emailText : emailText,
      mobileText: mobileText
    });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  
  const firstNameTextChange = (firstNameText) => {
    Toast.showWithGravity('This is a long toast at the top.', Toast.LONG, Toast.TOP);
    setFirstNameText(firstNameText);
    if(firstNameText.length < 1)
    {
      setFirstNameError(true);
    }
    else{
      setFirstNameError(false);
    }
  }


  const lastNameTextChange = (lastNameText) => {
  
    setLastNameText(lastNameText);
    if(lastNameText.length < 1)
    {
      setLastNameError(true);
    }
    else{
      setLastNameError(false);
    }
  }

  const addressTextChange = (addressText) => {
  
    setAddressText(addressText);
    if(addressText.length < 1)
    {
      setAddressError(true);
    }
    else{
      setAddressError(false);
    }
  }

  const emailTextChange = (emailText) => {
  
    setEmailText(emailText);

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( !(emailText.trim().length == 0 || emailRegex.test(emailText)))
    {
      setEmailError(true);
    }
    else{
      setEmailError(false);
    }
  }
  const passwordTextChange = (passwordText) => {
  
    setPasswordText(passwordText);
    if(passwordText.length < 5)
    {
      setPasswordError(true);
    }
    else{
      setPasswordError(false);
    }
    if(password2Text.length > 0 && (password2Text !== passwordText))
    {
      setPassword2Error(true);
    }
    else{
      setPassword2Error(false);
    }
  }

  const password2TextChange = (password2Text) => {
  
    setPassword2Text(password2Text);
    if(password2Text !== passwordText || password2Text.trim().length< 1)
    {
      setPassword2Error(true);
    }
    else{
      setPassword2Error(false);
    }
  }

  const mobileTextChange = (mobileText) => {
   const mobileNbrRegex = /^[0-9]*$/;
    setMobileText(mobileText);
    if( mobileText.length < 1 || !mobileNbrRegex.test(mobileText))
    {
      setMobileError(true);
    }
    else{
      setMobileError(false);
    }
  }

  const createIcon = (element) => {
const icon = (
  <Icon name='close-circle'/>
);
    if(element == "FIRSTNAME"  && firstNameError)
      return icon;
      if(element == "LASTNAME"  && lastNameError)
      return icon;
      if(element == "EMAIL"  && emailError)
      return icon;
      if(element == "PASSWORD"  && passwordError)
      return icon;
      if(element == "PASSWORD2"  && password2Error)
      return icon;
      if(element == "MOBILE"  && mobileError)
      return icon;
}

const createErrorText = (element, errorText) => {
  const errorTextComponent = (
    <Text style = {{color: "red"}}>{errorText}</Text>
  );
  if(element =="FIRSTNAME" && firstNameError)
    return errorTextComponent;
  if (element =="LASTNAME" && lastNameError)
    return errorTextComponent;

    if (element =="ADDRESS" && addressError)
    return errorTextComponent;

    if(element =="EMAIL" && emailError)
    return errorTextComponent;

    if(element =="PASSWORD" && passwordError)
    return errorTextComponent;

    if(element =="PASSWORD2" && password2Error)
    return errorTextComponent;

    if(element =="MOBILE" && mobileError)
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

  return ( 
  //   <KeyboardAvoidingView
  //   behavior="padding"
  //   keyboardVerticalOffset={2}
  //   style={styles.screen}
  // >
    <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.gradient}>
      <View style={styles.authContainer}>
        <ScrollView>
            <Item  style={styles.itemStyle}
            error = {firstNameError}
            floatingLabel>             
             <Label>First Name * </Label>
             < Input 
             onChangeText={firstNameText => firstNameTextChange(firstNameText)}/>
             {createIcon("FIRSTNAME")}  
            </Item>
            {createErrorText("FIRSTNAME", 'First Name cannot be empty')}


            <Item  style={styles.itemStyle}
            error = {lastNameError}
            floatingLabel>             
             <Label>Last Name * </Label>
             < Input 
             onChangeText={lastNameText => lastNameTextChange(lastNameText)}/>
             {createIcon("LASTNAME")}  
            </Item>
          
            {createErrorText("LASTNAME", 'Last Name cannot be empty')}

 <Text style = {{paddingTop: 15, fontSize: 15}}> Address *</Text>
                    <View>
             < Textarea style = {styles.textAreaStyle}
                         onChangeText={addressText => addressTextChange(addressText)}/>
            </View>
            {createErrorText("ADDRESS", 'Address cannot be empty')}
          
          <Item  style={styles.itemStyle}
            error = {passwordError}
            floatingLabel>             
             <Label>Password * </Label>
             < Input 
             secureTextEntry
             onChangeText={passwordText => passwordTextChange(passwordText)}/>
             {/* {createIcon("PASSWORD")}   */}
            </Item>
          
            {createErrorText("PASSWORD", 'Password Length cannot be less than 5')}

            <Item  style={styles.itemStyle}
            error = {password2Error}
            floatingLabel>             
             <Label>Re-enter Password * </Label>
             < Input 
             secureTextEntry
             onChangeText={password2Text => password2TextChange(password2Text)}/>
             {/* {createIcon("PASSWORD2")}   */}
            </Item>
            {createErrorText("PASSWORD2", 'Password not matched')}

<View style = {styles.textContainer}>
            <Text style = {styles.textContainer}>OTP will be sent to Email ID and Mobile </Text>
            <Text>(Register your Email ID to receive instant OTP's, Confirmations and communications. But, Email ID is not mandatory)</Text>
            </View>
            <Item  style={styles.itemStyle}
            error = {emailError}
            floatingLabel>             
             <Label>Email Address </Label>
             < Input 
             keyboardType="email-address"
             onChangeText={emailText => emailTextChange(emailText)}/>
             {/* {createIcon("EMAIL")}   */}
            </Item>
          
            {createErrorText("EMAIL", 'Invalid Email Address')}
            
          <Item style = {styles.itemStyle} 
          error = {mobileError}>
            <Icon
              active
              name='md-arrow-dropup-circle'
              style={styles.iconStyle}
              onPress={() => setModalVisible(true)}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}><Text style={styles.inputStyle}>{flag}</Text></TouchableOpacity>

            <View><Text >{countryCode}</Text></View> 

            <Item  style={styles.noBorder}
            error = {mobileError}
            floatingLabel>             
             <Label>Mobile Number *</Label>
             < Input 
             keyboardType="number-pad"
             onChangeText={mobileText => mobileTextChange(mobileText)}/>
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
  // </KeyboardAvoidingView>
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
