import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import UMNavigator from './UMNavigator'

const NavigationContainer = (props) => {
    const navRef = useRef()
    const isAuth = useSelector((state) => !!state.auth.token)
    // useSelector(state => console.log(state));
    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'Auth' })
            )
        }
    }, [isAuth])

    return <UMNavigator ref={navRef} />
}

export default NavigationContainer
