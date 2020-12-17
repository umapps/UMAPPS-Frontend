import React, { Component } from 'react'
import {
    View,
    Platform,
    Button
} from 'react-native'
import Colors from '../../constants/Constants'
import { Text } from 'native-base';
class SriSudhaDetailsScreen extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const response = this.props.navigation.state.params.response;
        return (
            <View style={{
                flex: 1,
                margin: '10%',
            }}>
                <Text>
{JSON.stringify(response)}</Text>
    </View>
        )

    }
}
SriSudhaDetailsScreen.navigationOptions = {
    headerTitle: 'Existing Subscriber',
}
export default SriSudhaDetailsScreen 