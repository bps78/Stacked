import * as React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import colors from '../config/colors';

function StockListItem({symbol, onCaratPress, openPrice, curPrice, purPrice, dayView, shares}) {

  const noChange = (curPrice == 0 || openPrice ==0);
  const dayPos = (curPrice - openPrice >= 0);
  const totPos = (curPrice - purPrice >= 0);


  let boxColor = colors.primary;
  let displayValue = 0;

 if(dayView && !noChange){
   boxColor = dayPos? colors.primary : colors.secondary;
   displayValue = Math.abs((curPrice - openPrice)).toFixed(2);
 }else if(!noChange){
   boxColor = totPos? colors.primary : colors.secondary;
   displayValue = Math.abs((curPrice - purPrice) * shares).toFixed(2);
 }else{
  boxColor = colors.neutralButton;
 }

 

  return(
    <View style={styles.container}>
      <View style={{width: 125}}>
        <Text style={{color:'white', fontFamily: 'Lexend-Medium', fontSize: 34}}>{symbol}</Text>
      </View>
        <View style={[styles.changeBox, {backgroundColor: boxColor}]}><Text style={[styles.changeText, {fontSize: dayView? 30 : 24}]}>${(noChange? '-.--': displayValue)}</Text></View>
       <Pressable
        onPress={onCaratPress}
        style = {{marginLeft: 10}}>
          <Entypo name="chevron-right" size={40} color="lightgrey" />  
       </Pressable>
    </View>
  );
  }

  const styles = StyleSheet.create({
        container:{
            width:330,
            height:100,
            backgroundColor: colors.background,
            flexDirection: 'row',
            alignItems: 'center'
        },
        changeBox:{
            width: 160,
            height:57,
            borderRadius: 20,
            backgroundColor: colors.primaryMid,
            justifyContent: 'center',
            alignItems: 'center'
        },
        changeText:{
          fontFamily: 'Lexend-Medium',
          color: 'white',
          fontSize: 30
        }
    })
    export default StockListItem;      
    