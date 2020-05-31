import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

const DeleteAccountScreen = props => {
  
  return (
<View style={{
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
}}>
    <Text>
        This is delete account screen
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
