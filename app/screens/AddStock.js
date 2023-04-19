import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';
import Stock from '../Stock.js';
import colors from '../config/colors.js'
import TextInputBox from '../components/TextInputBox.js';
import { SafeAreaView } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {useFonts} from 'expo-font';
import './HomeScreen';
import './DetailScreen';




export default function AddStock({navigation}) {
    

  //API Starter Code
  const finnhub = require('finnhub');
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = "cfnqd0pr01qr96uomd9gcfnqd0pr01qr96uomda0" 
  const finnhubClient = new finnhub.DefaultApi()

  //Text Input Values
  let totShares = 0;
  
  const[symbol, setSymbol] = useState('');
  const[shares, setShares] = useState(0);
  const[price, setPrice] = useState(0.0);

  //Modal Bool
  const[modalVisible, setModalVisible] = useState(false);

  //Import Custom Fonts
  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf')
  });

  const[errorText, setErrorText] = useState(""); //Contains desc of user's failed entry if any

  function createStockObj(){
  
     finnhubClient.quote(symbol, (error, data, response) => {  //Checks to see if the user entered a valid symbol
     

      if(symbol == "" || data.c == 0){
        console.log('Detail: Invalid Symbol');
        setModalVisible(true);
        setErrorText("The Symbol You Entered is Invalid");
      }else if(shares == 0){
        console.log('Detail: Invalid Shares');
        setModalVisible(true);
        setErrorText("Number of Shares Field is Required");
      }else if(price == 0){
        console.log('Detail: Invalid Price');
        setModalVisible(true);
        setErrorText("Price Field is Required");

      }else{
        let newList = global.userStocks;
        const len = newList.length + 1;
        const newStock = {
        shares: shares,
        symbol: symbol.toUpperCase(),
        avgPrice: price,
        index: len,
        curPrice: data.c,
        dateBought: new Date().toDateString(),
        openPrice: data.pc,
        lots: 1,
        }
        
        let isDupe = false;
        //Check for Dupes
        for(let i = 0; i < newList.length; i++){
          if(newList[i].symbol == symbol.toUpperCase()){
            const totThisShares =  Number(newList[i].shares) + Number(shares);
            newList[i].avgPrice = (Number(newList[i].avgPrice * newList[i].shares) + Number(price * shares))/ totThisShares;
            newList[i].shares = totThisShares;
            
            
            
            isDupe = true;
          }
        }
        
        if(!isDupe){
        newList.push(newStock);
        global.userStocks= newList;
        
        
   
        console.log('Stock Added');
        console.log(global.userStocks);
        }
        let shareSum = global.totShares;
        shareSum += Number(shares);
        global.totShares = Number(shareSum);

          navigation.navigate('Home', {
            totShares: totShares,
          })
      }
    });
    
     
  }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>
          <Modal
              animationType='slide'
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
          >
            <View style={styles.modal}>
              <Text style={{fontFamily: 'Lexend-Medium', color: 'white', fontSize: 20, textAlign: 'center', margin: 20}}>{errorText}</Text>
              <TouchableHighlight
                style={{backgroundColor: colors.neutral, width: 150, height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}
                onPress={() => setModalVisible(!modalVisible)}
                underlayColor={colors.neutralButtonHighlight}>
                <Text style={{fontFamily: 'Lexend-Medium', color: 'black', fontSize: 16}}>Close</Text>
              </TouchableHighlight>
            </View>
          </Modal>


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
  },
  modal:{
    width: 290,
    height: 230,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: Dimensions.get('screen').height / 2 - 115,
    borderRadius: 30,

  }
});

