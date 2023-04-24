
import { Button, StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font' //npm i expo-font
import { useState, useEffect } from 'react';
import ScreenHandler from './app/ScreenHandler.js';
import HomeScreen from './app/screens/HomeScreen.js';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import AuthScreen from './app/screens/AuthScreen.js';
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";


const tokenCache = {
  getToken(key) { 
    try {
      return SecureStore.getItemAsync(key);
    }
    catch (err) {
      return null;
    }
  }, 
  saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    }
    catch (err) {
      return null;
    }
  }
};


const key = 'pk_test_d29ya2luZy1zaGFkLTE3LmNsZXJrLmFjY291bnRzLmRldiQ';


export default function App() {
  

 const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('./app/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('./app/assets/fonts/Lexend-Medium.ttf'),
  });




    if(fontsLoaded){
  return (
      <ClerkProvider publishableKey={key} tokenCache={tokenCache}>
        <ScreenHandler/>
      </ClerkProvider>
      
  );}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
