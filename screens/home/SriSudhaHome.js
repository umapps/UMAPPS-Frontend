import React, { Component } from 'react'
import Colors from '../../constants/Constants'
import {
    View,
    Platform,
    Button
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'
import * as srisudha from '../../store/actions/srisudha'
class SriSudhaHome extends Component {
    constructor(props) {
        super(props)
    }
    checkDetails = async() => {
      const resp = await srisudha.checkUserDetails();
      console.log(resp);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                margin: '10%',
            }}>
            <Button
            title={' Existing subscriber '}
            color={Colors.primary}
             onPress={this.checkDetails}
        />
        <View style ={{margin: '10%'}}></View>
        <Button
        title={'New Subscriber'}
        color={Colors.primary}
       // onPress={preSignup}
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
        )
    }
}

export default SriSudhaHome