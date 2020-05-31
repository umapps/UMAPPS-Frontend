import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

const UserHomeScreen = props => {
  
  return (
<View style={{
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
}}>
    <Text>
        You have logged in successfully
    </Text>
</View>
  );
};

UserHomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Home Page',
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
          iconName={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
          // onPress={() => {
          //   navData.navigation.navigate('Cart');
          // }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default UserHomeScreen;
