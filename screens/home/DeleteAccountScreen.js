import React, {useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  Alert,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import * as authActions from '../../store/actions/auth'; 

const DeleteAccountScreen = props => {
  const dispatch = useDispatch();
  const deleteUserApi = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      props.navigation.navigate('Auth');
      return;
    }
    const transformedData = JSON.parse(userData);
    const { token } = transformedData;
    let action;
    action = authActions.deleteuser(token);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Auth');
      
     // Alert.alert('Login successful for '+formState.inputValues.email);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const deleteUserHandler = async () => {
    Alert.alert(
      "Alert! All your data will be lost",
      "Do you want to continue?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: deleteUserApi }
      ],
      { cancelable: false }
    );

  }

  return (
<View style={{
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
}}>
    <Text style = {{color: "blue"}}
      onPress={deleteUserHandler}>
        Click here to delete your account
    </Text>
</View>
  );
};

DeleteAccountScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Delete account',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-close-circle' : 'ios-close-circle'}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default DeleteAccountScreen;
