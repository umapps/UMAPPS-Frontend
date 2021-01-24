import React, { Component } from 'react'
import {
    Card,
    CardItem,
    Body,
    Text,
    Textarea,
    Spinner,
    Input,
    Item,
    Label,
    Form,
} from 'native-base'
import {
    View,
    Platform,
    Button,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Linking,
} from 'react-native'
import * as srisudha from '../../store/actions/srisudha'
import Colors from '../../constants/Constants'
class SriSudhaDetailsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: [],
            isLoading: false,
        }
    }

    componentDidMount = () => {
        const response = this.props.navigation.state.params.response
        this.setState({ response: response })
        if (response && response.length > 0) {
            response.map((item) => {
                item.textDisabled = true
                item.textColor = 'gray'
                item.buttonText = 'Edit Details'
            })
        }
    }
    editAddress = async (i) => {
        this.setState({ isLoading: true })
        let response = [...this.state.response]

        if (response && response.length > 0) {
            if (response[i].buttonText === 'Edit Details') {
                response[i].buttonText = 'Update'
                response[i].textDisabled = false
                response[i].textColor = 'black'
                this.setState({ response })
            } else if (response[i].buttonText === 'Update') {
                const resp = await srisudha.updateUserDetails(
                    response[i].addressId,
                    response[i].name,
                    response[i].address,
                    response[i].district,
                    response[i].pincode
                )
                if (resp) {
                    Alert.alert('Success!', 'Details updated successfully', [
                        { text: 'OKAY' },
                    ])
                    this.props.navigation.navigate('SriSudhaHome')
                } else {
                    Alert.alert('An Error occured', [{ text: 'Okay' }])
                }
            }
        }
        this.setState({ isLoading: false })
    }

    handleNameChange = (i, text) => {
        let response = [...this.state.response]
        response[i].name = text
        this.setState({ response })
    }

    handleAddressChange = (i, text) => {
        let response = [...this.state.response]
        response[i].address = text
        this.setState({ response })
    }
    handleDistrictChange = (i, text) => {
        let response = [...this.state.response]
        response[i].district = text
        this.setState({ response })
    }
    handlePincodeChange = (i, text) => {
        let response = [...this.state.response]
        response[i].pincode = text
        this.setState({ response })
    }
    render() {
        const { response, isLoading } = this.state
        if (!response || response.length <= 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        margin: '10%',
                    }}>
                    <Text style={{ color: 'red', fontSize: 20 }}>
                        Details not found for the registered mobile number.
                        Contact 91XXXX to update your mobile
                    </Text>
                </View>
            )
        } else {
            return (
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    behavior="padding"
                    enabled
                    keyboardVerticalOffset={1}>
                    <ScrollView>
                        <View
                            style={{
                                flex: 1,
                                margin: '10%',
                            }}>
                            {response.map((item, i) => (
                                <Card key={item.addressId}>
                                    <CardItem header>
                                        <View
                                            style={{
                                                justifyContent: 'space-between',
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}>
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                    marginRight: 10,
                                                }}>
                                                {' '}
                                                Sri Sudha Id : {item.addressId}
                                            </Text>
                                        </View>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <View
                                                style={{
                                                    width: '100%',
                                                    marginBottom: '5%',
                                                }}>
                                                <Item
                                                    error={
                                                        item.name.length <= 0
                                                    }
                                                    floatingLabel>
                                                    <Label>Name </Label>
                                                    <Input
                                                        style={{
                                                            color:
                                                                item.textColor,
                                                        }}
                                                        autoCapitalize="characters"
                                                        value={item.name}
                                                        disabled={
                                                            item.textDisabled
                                                        }
                                                        onChangeText={this.handleNameChange.bind(
                                                            this,
                                                            i
                                                        )}
                                                    />
                                                </Item>
                                                {item.name.length <= 0 && (
                                                    <Text
                                                        style={{
                                                            color: 'red',
                                                        }}>
                                                        Name cannot be empty
                                                    </Text>
                                                )}
                                            </View>
                                            <View
                                                style={{
                                                    width: '100%',
                                                    marginBottom: '5%',
                                                }}>
                                                <Label
                                                    style={{ color: 'gray' }}>
                                                    Address{' '}
                                                </Label>
                                                <Form>
                                                    <Textarea
                                                        placeholder="Enter your address here"
                                                        autoCapitalize="characters"
                                                        style={{
                                                            color:
                                                                item.textColor,
                                                        }}
                                                        rowSpan={3}
                                                        bordered
                                                        value={item.address}
                                                        disabled={
                                                            item.textDisabled
                                                        }
                                                        onChangeText={this.handleAddressChange.bind(
                                                            this,
                                                            i
                                                        )}
                                                    />
                                                </Form>
                                                {item.address.length <= 0 && (
                                                    <Text
                                                        style={{
                                                            color: 'red',
                                                        }}>
                                                        Address cannot be empty
                                                    </Text>
                                                )}
                                            </View>
                                            <View
                                                style={{
                                                    width: '100%',
                                                    marginBottom: '5%',
                                                }}>
                                                <Item
                                                    error={
                                                        item.district.length <=
                                                        0
                                                    }
                                                    floatingLabel>
                                                    <Label>District </Label>
                                                    <Input
                                                        style={{
                                                            color:
                                                                item.textColor,
                                                        }}
                                                        autoCapitalize="characters"
                                                        value={item.district}
                                                        disabled={
                                                            item.textDisabled
                                                        }
                                                        onChangeText={this.handleDistrictChange.bind(
                                                            this,
                                                            i
                                                        )}
                                                    />
                                                </Item>
                                                {item.district.length <= 0 && (
                                                    <Text
                                                        style={{
                                                            color: 'red',
                                                        }}>
                                                        district cannot be empty
                                                    </Text>
                                                )}
                                            </View>
                                            <View
                                                style={{
                                                    width: '100%',
                                                    marginBottom: '5%',
                                                }}>
                                                <Item
                                                    error={
                                                        item.pincode.length <= 0
                                                    }
                                                    floatingLabel>
                                                    <Label>Pincode </Label>
                                                    <Input
                                                        style={{
                                                            color:
                                                                item.textColor,
                                                        }}
                                                        value={item.pincode}
                                                        disabled={
                                                            item.textDisabled
                                                        }
                                                        keyboardType="number-pad"
                                                        maxLength={6}
                                                        onChangeText={this.handlePincodeChange.bind(
                                                            this,
                                                            i
                                                        )}
                                                    />
                                                </Item>
                                                {item.pincode.length != 6 && (
                                                    <Text
                                                        style={{
                                                            color: 'red',
                                                        }}>
                                                        Pincode should be 6
                                                        characters long
                                                    </Text>
                                                )}
                                            </View>
                                            <Item
                                                style={{ marginBottom: '5%' }}>
                                                <Label>End Date </Label>
                                                <Input
                                                    style={{ color: 'gray' }}
                                                    value={item.endDate}
                                                    disabled={true}
                                                />
                                                <Button
                                                    title={'Renew'}
                                                    color={Colors.primary}
                                                    onPress={() => {
                                                        Linking.openURL(
                                                            'http://www.srijspn.org/srisudha_renewal.html'
                                                        )
                                                    }}
                                                />
                                            </Item>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer>
                                        <View
                                            style={{
                                                flex: 2,
                                                marginRight: 15,
                                            }}>
                                            {isLoading ? (
                                                <ActivityIndicator
                                                    size="small"
                                                    color={Colors.primary}
                                                />
                                            ) : (
                                                <Button
                                                    title={item.buttonText}
                                                    color={Colors.primary}
                                                    disabled={
                                                        item.pincode.length !=
                                                            6 ||
                                                        item.address.length <=
                                                            0 ||
                                                        item.name.length <= 0 ||
                                                        item.district.length <=
                                                            0
                                                    }
                                                    onPress={this.editAddress.bind(
                                                        this,
                                                        i
                                                    )}
                                                />
                                            )}
                                        </View>
                                    </CardItem>
                                </Card>
                            ))}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            )
        }
    }
}
SriSudhaDetailsScreen.navigationOptions = {
    headerTitle: 'Existing Subscriber',
}
export default SriSudhaDetailsScreen
