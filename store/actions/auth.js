import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
   // dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const sendOtp = (email, mobile) => {
  return async dispatch => {
    const url = 'https://umapps.in/sendRegisterOTP?mobileNumber='+mobile+'&emailId='+email
    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error;
      let message = 'Something went wrong!';
      if (errorId === 'Unauthorized') {
        message = 'Invalid credentials';
      }
      // else if (errorId === 'INVALID_PASSWORD') {
      //   message = 'This password is not valid!';
      // }
      throw new Error(message);
    }
  };
};

export const checkValidity = (email, mobile) => {
  return async dispatch => {
    const url = 'https://umapps.in/check-validity?mobileNumber='+mobile+'&emailId='+email
    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      throw new Error(errorResData.message);
    }
  };
};


export const checkIsRegistered = (userId) => {
  return async dispatch => {
    const url = 'https://umapps.in/is-registered?userId='+userId
    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      throw new Error(errorResData.message);
    }
  };
};


export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://umapps.in/sign-in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error;
      let message = 'Something went wrong!';
      if (errorId === 'Unauthorized') {
        message = 'Invalid credentials';
      }
      // else if (errorId === 'INVALID_PASSWORD') {
      //   message = 'This password is not valid!';
      // }
      throw new Error(message);
    }

    const resData = await response.json();
    saveDataToStorage(resData.accessToken, resData.id, resData.emailId, resData.mobileNumber, resData.roles );
  };
};


export const register = (fName, lName, address, password, email, mobile, mobileOTP, emailOTP) => {
  return async dispatch => {
    const response = await fetch(
      'https://umapps.in/sign-up',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailId: email,
          firstName: fName,
          lastName: lName, 
          address: address,
          mobileNumber: mobile, 
          password: password,
          mobileOTP: mobileOTP,
          emailOTP: emailOTP
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      throw new Error(errorResData.message);
    }
  };
};

const saveDataToStorage = (token, userId, emailId, mobileNumber, roles) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      emailId: emailId,
      mobileNumber: mobileNumber,
      roles: roles,
      //Set the expiry date to 7 days from now
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
  );
}

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

