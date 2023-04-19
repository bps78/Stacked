
import { Button, StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font' //npm i expo-font
import { useState, useEffect } from 'react';
import ScreenHandler from './app/ScreenHandler.js';
import { ClerkProvider } from '@clerk/clerk-expo';
import AuthScreen from './app/screens/AuthScreen.js';


const key = 'pk_test_d29ya2luZy1zaGFkLTE3LmNsZXJrLmFjY291bnRzLmRldiQ';


export default function App() {
  

 const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('./app/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('./app/assets/fonts/Lexend-Medium.ttf'),
  });




    if(fontsLoaded){
  return (
      <ClerkProvider
      publishableKey={key}
      navigate={() => <ScreenHandler/>}/>
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
