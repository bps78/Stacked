import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../config/colors';

function StockListItem({symbol,}) {
  return(
    <View style={styles.container}>
        <Text style={{color:'white', fontFamily: 'Lexend-Regular'}}>({symbol})</Text>
    </View>
  );
  }

  const styles = StyleSheet.create({
        container:{
            width:300,
            height:80,
            backgroundColor: colors.background,
            justifyContent: 'center'
        }
    })
    export default StockListItem;      
    