import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import handler from './app/ApiHandler.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenHandler from './app/ScreenHandler.js';
import AddStock from './app/screens/AddStock.js';


export default function App() {
  const [portList, setPortList] = useState([]); //Array of Stock Objects


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
    

  return (
    <AddStock/>
    
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
