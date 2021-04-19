import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';

// Timer for logout
let timer;

export const authenticate = (userId, token, expiryTime) => {
  return setLogoutTimer(expiryTime);
};

// SIGN UP

export const signup = async (email, password) => {
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsH-2yfH8ZXJIYulTeE7mSi9i21l18PS0',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    },
  );

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong!';

    if (errorId === 'EMAIL_EXISTS') {
      message = 'This e-mail exists already.';
    }

    throw new Error(message);
  }

  const resData = await response.json();
  console.log(resData);

  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000,
  );
  saveDataToStorage(
    resData.idToken,
    resData.localId,
    expirationDate,
    resData.email,
  );
};

// LOGIN

export const login = async (email, password) => {
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsH-2yfH8ZXJIYulTeE7mSi9i21l18PS0',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    },
  );

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong!';

    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This e-mail can not be found.';
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is invalid!';
    }

    throw new Error(message);
  }

  const resData = await response.json();
  console.log(resData);

  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000,
  );
  saveDataToStorage(resData.idToken, resData.localId, expirationDate, email);
};

// LOGOUT

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return (timer = setTimeout(() => {
    logout();
  }, expirationTime));
};

// SAVE DATA TO DEVICE STORAGE

const saveDataToStorage = (token, userId, expirationDate, email) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
      email: email,
    }),
  );
};

// CHANGE PASSWORD

export const changePassword = async (
  userId,
  token,
  expirationTime,
  password,
) => {

  var user = firebase.auth();
  console.log(user);

  // user.updatePassword(password).then(function() {
  //   // Update successful.
  // }).catch(function(error) {
  //   // An error happened.
  // });
  // const response = await fetch(
  //   'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsH-2yfH8ZXJIYulTeE7mSi9i21l18PS0',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       idToken: token,
  //       password: password.newPassword,
  //       returnSecureToken: true,
  //     }),
  //   },
  // );

  // if (!response.ok) {
  //   const errorResData = await response.json();
  //   const errorId = errorResData.error.message;
  //   let message = 'Something went wrong!';

  //   if (errorId === 'EMAIL_NOT_FOUND') {
  //     message = 'This e-mail can not be found.';
  //   } else if (errorId === 'INVALID_PASSWORD') {
  //     message = 'This password is invalid!';
  //   }

  //   throw new Error(message);
  // }

  // const resData = await response.json();
  // console.log(resData);

  alert('Password changed successfully!');
};

export const changeNameSurname = async (myName, mySurName, token, userId) => {
  // const nameObject = {
  //   name: myName,
  //   surname: mySurname,
  // };
  const response = await fetch(
    `https://n2-mobile-2dbf3-default-rtdb.firebaseio.com/${userId}/user.json?auth=${token}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        myName,
        mySurName,
      }),
    },
  );

  const resData = await response.json();
  alert(`Name-Surname changed successfully as ${myName} ${mySurName}`);
};
