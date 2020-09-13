import React from 'react'
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Linking,
    Image,
    TouchableHighlight,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import chatIcon from '../../components/UI/liveChat.png'
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

            <TouchableHighlight
                underlayColor="white"
                style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    height: '12%',
                    width: '25%',
                }}
                onPress={() => {
                    Linking.openURL(
                        'https://tawk.to/chat/5f44a5b61e7ade5df443a843/default'
                    )
                }}>
                <View
                    style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                    }}>
                    <Text
                        style={{
                            color: 'blue',
                            height: '100%',
                            width: '100%',
                            paddingBottom: 1,
                            alignItems: 'center',
                        }}>
                        Any queries?
                    </Text>
                    <Image
                        source={chatIcon}
                        style={{
                            position: 'absolute',
                            right: 5,
                            bottom: 5,
                            height: '65%',
                            width: '100%',
                        }}
                    />
                </View>
            </TouchableHighlight>
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
