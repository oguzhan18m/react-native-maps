import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

// Timer for logout
let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({type: AUTHENTICATE, userId: userId, token: token});
  };
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
  saveDataToStorage(resData.idToken, resData.localId, expirationDate);
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
  saveDataToStorage(resData.idToken, resData.localId, expirationDate);
};

// LOGOUT

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      //   dispatch(logout());
    }, expirationTime);
  };
};

// SAVE DATA TO DEVICE STORAGE

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
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
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsH-2yfH8ZXJIYulTeE7mSi9i21l18PS0',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        idToken: token,
        password: password.newPassword,
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

  const refreshTokenResp = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=AIzaSyAsH-2yfH8ZXJIYulTeE7mSi9i21l18PS0&grant_type=refresh_token&refresh_token=${resData.refreshToken}`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      // body: JSON.stringify({
      //   grant_type: "refresh_token",
      //   refresh_token : resData.refreshToken,
      // }),
    },
  );

  const refreshData = await refreshTokenResp.json();
  console.log(refreshData);



  alert('Password changed successfully!');
};
