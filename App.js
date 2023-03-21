
import { Button, StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font' //npm i expo-font

import ScreenHandler from './app/ScreenHandler.js';



export default function App() {
  

 const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('./app/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('./app/assets/fonts/Lexend-Medium.ttf'),
  });

    if(fontsLoaded){
  return (
   
      <ScreenHandler/> 

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
