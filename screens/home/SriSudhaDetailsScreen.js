import React, { Component } from 'react'
import { Card, CardItem, Body, Text, Textarea, Spinner, Input, Item, Label, Form} from 'native-base'
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
this.state = {
    textDisabled: true,
    buttonText: 'Edit',
    textColor: 'gray'
}
    }

    editAddress = () => {
        const {textDisabled, buttonText} =  this.state;
        if(buttonText === 'Edit')
        this.setState({textDisabled: false, buttonText: 'Update', textColor: 'black'})
        if(buttonText === 'Update')
        {

        }
    }

    render() {
        const {textDisabled, buttonText, textColor} = this.state;
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
        <View style = {{justifyContent: 'space-between', display: 'flex', flexDirection: 'row'}}>
        <Text style ={{fontWeight: 'bold', fontSize: 20, marginRight: 10}}> Sri Sudha Id : {item.addressId}</Text>
    </View>
    </CardItem>
    <CardItem>
        <Body>
        <Item style = {{marginBottom: '5%'}}
                        floatingLabel>
                        <Label>Name </Label>
                        <Input style = {{color: textColor}}
                            value = {item.name}
                            disabled = {textDisabled}
                        />
                    </Item>
                    <Label style = {{color: 'gray'}}>Address </Label>
                    <Form style ={{marginBottom: 20}}>
            <Textarea style = {{color: textColor}} rowSpan={3} bordered value = {item.address} disabled={textDisabled}/>
          </Form>
                    <Item style = {{marginBottom: '10%'}}
                        floatingLabel>
                        <Label>District </Label>
                        <Input style = {{color: textColor}}
                            value = {item.district}
                            disabled = {textDisabled}
                        />
                    </Item>

                    <Item style = {{marginBottom: '5%'}}
                        floatingLabel>
                        <Label>Pincode </Label>
                        <Input style = {{color: textColor}}
                            value = {item.pincode}
                            disabled = {textDisabled}
                        />
                    </Item>


                    <Item style = {{marginBottom: '5%'}}
                        >
                        <Label>End Date </Label>
                        <Input style = {{color: 'gray'}}
                            value = {item.endDate}
                            disabled = {true}
                        />
                                <Button
        title={'Renew'}
        color={Colors.primary}
    />
                    </Item>
        </Body>
    </CardItem>
    <CardItem footer>
    <View style={{ flex: 2, marginRight: 15 }}>
    <Button
        title={buttonText}
        color={Colors.primary}
        onPress={this.editAddress}
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