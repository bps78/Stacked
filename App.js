import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import handler from './app/ApiHandler.js';
import Stock from './app/Stock.js';
import {useFonts} from 'expo-font'

import ScreenHandler from './app/ScreenHandler.js';



export default function App() {
  

 const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('./app/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('./app/assets/fonts/Lexend-Medium.ttf'),
  });

  handler()
  const [aaplPrice, setApplPrice] = useState(0);
  const [disPrice, setDisPrice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let curApplPrice = global.aaplPrice;
      let curDisPrice = global.disPrice;

       if(curDisPrice != 0) setDisPrice(parseFloat(curDisPrice).toFixed(2)); //Calls these 2 lines every x seconds
       if(curApplPrice != 0) setApplPrice(parseFloat(curApplPrice).toFixed(2)); 

    }, 1500);
    return () => clearInterval(interval);
  }, []);

  if(!fontsLoaded){
    return(null);
  }
    
  return (
   
      <ScreenHandler/> 

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
