import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Stock from '../Stock.js';
import colors from '../config/colors.js'
import TextInputBox from '../components/TextInputBox.js';
import { SafeAreaView } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {useFonts} from 'expo-font';
import './HomeScreen';
import './DetailScreen';




export default function AddStock({navigation}) {
    

  //Text Input Values
  let totShares = 0;
  
  const[symbol, setSymbol] = useState('');
  const[shares, setShares] = useState(0);
  const[price, setPrice] = useState(0.0);

  //Import Custom Fonts
  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf')
  });

  function createStockObj(){
     let newList = global.userStocks;
     const len = newList.length + 1;
     const newStock = {
     shares: shares,
     symbol: symbol.toUpperCase(),
     avgPrice: price,
     index: len,
     curPrice: 0,
     dateBought: new Date().toDateString(),
     openPrice: 0,
     }
     
     newList.push(newStock);
     global.userStocks= newList;
     
     let shareSum = global.totShares;
     shareSum += Number(shares);
     global.totShares = Number(shareSum);

     console.log('Stock Added');
     console.log(global.userStocks);
    
     navigation.navigate('Home', {
      totShares: totShares,
    })
  }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>
          <SafeAreaView style = {styles.header}>
            <Text style = {styles.title}>Add Ticker</Text>
          </SafeAreaView>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 90}}>
            
            <TextInputBox
              title="Symbol"
              color= {colors.neutral}
              rectWidth = {350}
              rectHeight = {75}
              iconName='search'
              setFunction={setSymbol}
              length={4}
              autoCap='characters'
              >
            </TextInputBox>
            

            <TextInputBox
              title="Shares"
              color= {colors.neutral}
              rectWidth = {350}
              rectHeight = {75}
              iconName='hashtag'
              setFunction={setShares}
              inputType='number-pad'
              >
            
            </TextInputBox>

            <TextInputBox
              title="Price/ Share"
              color= {colors.neutral}
              rectWidth = {350}
              rectHeight = {75}
              iconName = 'money'
              setFunction={setPrice}
              inputType='decimal-pad'
              >
            </TextInputBox>

          </View>
          <View style={{flex:1}}></View>
           <View style={{flexDirection:'row'}}>
            <TouchableHighlight style={[styles.bottomButtons, {backgroundColor: colors.neutralButton, borderTopRightRadius: 0}]}
              onPress={() => navigation.navigate('Home', {
                totShares: totShares,
              })}
              underlayColor={colors.neutralButtonHighlight}>
            
              <Text style = {styles.buttonText}>Back</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.bottomButtons, {backgroundColor: colors.primaryMid, borderTopLeftRadius: 0}]}
              onPress={() =>  createStockObj()}
              underlayColor={colors.primary}>
            
             <Text style = {styles.buttonText}>Sumbit</Text>
            </TouchableHighlight>
           </View>
        </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    height: 150,
    width: Dimensions.get('screen').width,
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color: 'white',
    marginTop: 20,
    fontSize: 50,
    fontFamily: 'Lexend-Medium',
  },
  bottomButtons:{
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width / 2,
    height:130,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50
  },
  buttonText:{
    fontFamily: 'Lexend-Medium',
    fontSize: 32,
    color: 'white',
  }
});

