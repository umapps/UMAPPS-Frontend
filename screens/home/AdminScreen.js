import React, { useState } from 'react'
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Alert,
    Modal,
    TouchableHighlight,
    KeyboardAvoidingView,
    ScrollView,
    Button,
} from 'react-native'
import { ListItem, CheckBox, Body, Form, Textarea, Spinner } from 'native-base'
import Colors from '../../constants/Constants'
import * as adminActions from '../../store/actions/admin'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import { useDispatch } from 'react-redux'

const AdminScreen = (props) => {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [smsCheckBox, setSmsCheckBox] = useState(false)
    const [pushCheckBox, setPushCheckBox] = useState(false)
    const [emailCheckBox, setEmailCheckBox] = useState(false)
    const [subjectText, setSubjectText] = useState('')
    const [contentText, setContentText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const notificationHandler = async () => {
        let action
        action = adminActions.sendNotification(
            emailCheckBox,
            smsCheckBox,
            pushCheckBox,
            subjectText,
            contentText
        )
        setIsLoading(true)
        try {
            await dispatch(action)
            setIsLoading(false)
            Alert.alert('Success!', 'Notification(s) sent successfully', [
                { text: 'Okay', onPress: () => setModalVisible(!modalVisible) },
            ])
        } catch (err) {
            Alert.alert('An Error Occurred!', err.message, [
                { text: 'Okay', onPress: () => setModalVisible(!modalVisible) },
            ])
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                }}>
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    behavior="padding"
                    enabled
                    keyboardVerticalOffset={1}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        automaticallyAdjustContentInsets={false}
                        style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Send Notifications
                            </Text>
                            <ListItem>
                                <CheckBox
                                    checked={smsCheckBox}
                                    color={Colors.accent}
                                    onPress={() => {
                                        setSmsCheckBox(!smsCheckBox)
                                    }}
                                />
                                <Body>
                                    <Text> SMS</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox
                                    checked={pushCheckBox}
                                    color={Colors.accent}
                                    onPress={() => {
                                        setPushCheckBox(!pushCheckBox)
                                    }}
                                />
                                <Body>
                                    <Text> Push Notification</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox
                                    checked={emailCheckBox}
                                    color={Colors.accent}
                                    onPress={() => {
                                        setEmailCheckBox(!emailCheckBox)
                                    }}
                                />
                                <Body>
                                    <Text> Email</Text>
                                </Body>
                            </ListItem>

                            <Form>
                                <Textarea
                                    rowSpan={2}
                                    bordered
                                    placeholder="Subject "
                                    style={{ marginBottom: 30, marginTop: 30 }}
                                    onChangeText={(text) =>
                                        setSubjectText(text)
                                    }
                                />
                            </Form>
                            <Form>
                                <Textarea
                                    rowSpan={5}
                                    bordered
                                    placeholder="Notification Text "
                                    style={{ marginBottom: 30 }}
                                    onChangeText={(text) =>
                                        setContentText(text)
                                    }
                                />
                            </Form>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: '5%',
                                }}>
                                <View style={{ flex: 1 }}>
                                    {isLoading ? (
                                        <Spinner color={Colors.primary} />
                                    ) : (
                                        <TouchableHighlight
                                            style={{
                                                ...styles.modalButton,
                                                backgroundColor: Colors.primary,
                                            }}
                                            onPress={() => {
                                                notificationHandler()
                                            }}>
                                            <Text style={styles.textStyle}>
                                                Send
                                            </Text>
                                        </TouchableHighlight>
                                    )}
                                </View>
                                <View style={{ flex: 1, paddingLeft: 20 }}>
                                    {isLoading ? (
                                        <Spinner color={Colors.primary} />
                                    ) : (
                                        <TouchableHighlight
                                            style={{
                                                ...styles.modalButton,
                                                backgroundColor: Colors.primary,
                                            }}
                                            onPress={() => {
                                                setModalVisible(!modalVisible)
                                            }}>
                                            <Text style={styles.textStyle}>
                                                Cancel
                                            </Text>
                                        </TouchableHighlight>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
            <Button
                title={' Send Notification '}
                color={Colors.primary}
                onPress={() => {
                    setModalVisible(true)
                }}
            />
        </View>
    )
}

AdminScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Admin Page',
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
                    title="key"
                    iconName={Platform.OS === 'android' ? 'md-key' : 'ios-key'}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        margin: '10%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        textAlign: 'center',
        flexDirection: 'row',
    },
    modalView: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 5,
        elevation: 5,
    },
    openButton: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        elevation: 2,
        width: '80%',
        height: 40,
    },
    modalButton: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        elevation: 2,
        width: '100%',
        height: 40,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    modalText: {
        marginBottom: 15,
        paddingTop: 25,
        textAlign: 'center',
    },
})

export default AdminScreen
