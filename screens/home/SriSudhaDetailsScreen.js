import React, { Component } from 'react'
import { Card, CardItem, Body, Text, Textarea, Spinner, Input, Item, Label} from 'native-base'
import {
    View,
    Platform,
    Button,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native'
import Colors from '../../constants/Constants'
class SriSudhaDetailsScreen extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const response = this.props.navigation.state.params.response;
        if(!response || response.length <=0 ){
         return (              <View style={{
            flex: 1,
            margin: '10%',
        }}>
                <Text style= {{color : 'red', fontSize: 20}}>
                Details not found for the registered mobile number. Contact 91XXXX to update your mobile
                </Text>
            </View>
        )
    }
        else {return (
//<KeyboardAvoidingView
                    // style={{
                    //     flex: 1,
                    //     flexDirection: 'column',
                    //     justifyContent: 'center',
                    // }}
                    // behavior="padding"
                    // enabled
                    // keyboardVerticalOffset={1}>
                    <ScrollView>
            <View style={{
                flex: 1,
                margin: '10%',
            }}>
  {/* <Text>
{JSON.stringify(response)}</Text> */}


{response.map((item) =>
    <Card key = {item.addressId}>
    <CardItem header>
        <Text style ={{fontWeight: 'bold', fontSize: 20}}> Sri Sudha Id : {item.addressId}</Text>
    </CardItem>
    <CardItem>
        <Body>
        <Item style = {{marginBottom: '5%'}}
                        floatingLabel>
                        <Label>Name </Label>
                        <Input
                            value = {item.name}
                            disabled = {true}
                        />
                    </Item>

                    <Item style = {{marginBottom: '5%'}}
                        floatingLabel>
                        <Label>Address </Label>
                        <Input
                                                            rowSpan={5}
                                                            bordered
                            value = {item.address}
                           disabled = {true}
                        />
                                                <Textarea

                            // style={styles.textAreaStyle}
                            // onChangeText={inputChangeHandler.bind(
                            //     this,
                            //     'address'
                            // )}
                        />
                    </Item>

                    <Item style = {{marginBottom: '10%'}}
                        floatingLabel>
                        <Label>District </Label>
                        <Input
                            value = {item.district}
                            disabled = {true}
                        />
                    </Item>

                    <Item style = {{marginBottom: '5%'}}
                        floatingLabel>
                        <Label>Pincode </Label>
                        <Input
                            value = {item.pincode}
                            disabled = {true}
                        />
                    </Item>


                    <Item style = {{marginBottom: '5%'}}
                        floatingLabel>
                        <Label>End Date </Label>
                        <Input
                            value = {item.endDate}
                            disabled = {true}
                        />
                    </Item>
        </Body>
    </CardItem>
    <CardItem footer>
    <View style={{ flex: 2, marginRight: 15 }}>
    <Button
        title={'Update'}
        color={Colors.primary}
       // onPress={preSignup}
    />
    </View>
    <View style={{ flex: 2, marginleft: 15 }}>
            <Button
        title={'Renew'}
        color={Colors.primary}
       // onPress={preSignup}
    />
    </View>
    </CardItem>
</Card>
)}

    </View>
    </ScrollView>
               // </KeyboardAvoidingView>
        )}

    }
}
SriSudhaDetailsScreen.navigationOptions = {
    headerTitle: 'Existing Subscriber',
}
export default SriSudhaDetailsScreen 