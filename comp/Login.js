import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import * as GoogleAuthentication from 'expo-google-app-auth';

import { Button, Text } from '@rneui/themed';
import { app, auth } from '../firebaseConfig';

export default function Login() {

  function doLogin() {
    GoogleAuthentication.logInAsync({
      androidStandaloneAppClientId: '642204247107-c4be9ir81kr6r810tp1rumshs85gs9m2.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    })
      .then((logInResult) => {
        if (logInResult.type === 'success') {
          const { idToken, accessToken } = logInResult;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          return firebase.auth().signInWithCredential(credential);
          // Successful sign in is handled by firebase.auth().onAuthStateChanged
        }
        return Promise.reject(); // Or handle user cancelation separatedly
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Text>Please login and continue</Text>
      <Button onPress={doLogin}>Login with Google</Button>
    </>
  )
}
