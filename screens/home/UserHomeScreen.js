import React from 'react'
import { View, Text, Platform, StyleSheet, Linking } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'

const UserHomeScreen = (props) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Text>You have logged in successfully</Text>
            {/* <Text onPress = {() => {Linking.openURL('https://tawk.to/chat/5f44a5b61e7ade5df443a843/default')}}> */}
            <Text
                onPress={() => {
                    Linking.openURL('https://umapps.in/chat')
                }}>
                Online Chat
            </Text>
        </View>
    )
}

UserHomeScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Home Page',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={
                        Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
                    }
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Cart"
                    iconName={
                        Platform.OS === 'android' ? 'md-person' : 'ios-person'
                    }
                    // onPress={() => {
                    //   navData.navigation.navigate('Cart');
                    // }}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

export default UserHomeScreen
