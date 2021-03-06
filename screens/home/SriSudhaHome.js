import React, { Component } from 'react'
import Colors from '../../constants/Constants'
import {
    View,
    Platform,
    Button,
    ActivityIndicator,
    Alert,
    Linking,
    Text,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as srisudha from '../../store/actions/srisudha'
class SriSudhaHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
        }
    }
    checkDetails = async () => {
        try {
            const props = this.props
            this.setState({ isLoading: true })
            const resp = await srisudha.checkUserDetails()
            this.setState({ isLoading: false })
            props.navigation.navigate('SriSudhaDetails', {
                response: resp,
            })
        } catch (err) {
            Alert.alert('An Error occured', [{ text: 'Okay' }])
        }
    }

    render() {
        const { isLoading } = this.state
        return (
            <View
                style={{
                    flex: 1,
                    margin: '5%',
                }}>
                <Text
                    style={{
                        color: Colors.blue,
                        justifyContent: 'center',
                        paddingVertical: 1,
                        textAlign: 'center',
                        fontSize: 24,
                    }}>
                    Sri Sudha , spiritual Kannada monthly
                </Text>
                <Text
                    style={{
                        color: Colors.blue,
                        justifyContent: 'center',
                        paddingVertical: 20,
                        textAlign: 'center',
                        fontSize: 21,
                    }}>
                    More than 50 years of publication history.!
                </Text>
                {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                    <Button
                        title={'Existing subscriber'}
                        color={Colors.primary}
                        onPress={this.checkDetails}
                    />
                )}

                <View style={{ margin: '10%' }}></View>
                <Button
                    title={'New Subscriber'}
                    color={Colors.primary}
                    onPress={() => {
                        Linking.openURL('http://www.srijspn.org/srisudha.html')
                    }}
                />
            </View>
        )
    }
}
SriSudhaHome.navigationOptions = (navData) => {
    return {
        headerTitle: 'Sri Sudha',
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
    }
}

export default SriSudhaHome
