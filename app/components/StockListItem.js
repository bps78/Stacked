import * as React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import colors from '../config/colors';

function StockListItem({symbol, onCaratPress, openPrice, curPrice}) {
  return(
    <View style={styles.container}>
      <View style={{width: 125}}>
        <Text style={{color:'white', fontFamily: 'Lexend-Medium', fontSize: 34}}>{symbol}</Text>
      </View>
        <View style={styles.changeBox}><Text style={styles.changeText}>${(curPrice - openPrice).toFixed(2)}</Text></View>
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
    