import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import handler from './app/ApiHandler.js';



export default function App() {
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
    <View style={styles.container}>
      <Text>Appl: {aaplPrice}</Text>
      <Text>Dis: {disPrice}</Text>
      <StatusBar style="auto" />
    </View>
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
