import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native';
import Stock from '../Stock.js';
import colors from '../config/colors.js'
import TextInputBox from '../components/TextInputBox.js';
import { SafeAreaView } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';




export default function AddStock({navigation}) {
    return(
        <View style = {styles.container}>
          <SafeAreaView style = {styles.header}>
            <Text style = {styles.title}>Add Ticker</Text>
          </SafeAreaView>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 130}}>
            <TextInputBox
              title="Symbol"
              color= {colors.neutral}
              rectWidth = {350}
              rectHeight = {75}
              iconName='search'
              >
            </TextInputBox>

            <TextInputBox
              title="Shares"
              color= {colors.neutral}
              rectWidth = {350}
              rectHeight = {75}
              iconName='hashtag'
              >
            
            </TextInputBox>

            <TextInputBox
              title="Price"
              color= {colors.neutral}
              rectWidth = {350}
              rectHeight = {75}
              iconName = 'money'
              >
            </TextInputBox>

          </View>
          <View style={{flex:1}}></View>
           <View style={{flexDirection:'row'}}>
            <TouchableHighlight style={[styles.bottomButtons, {backgroundColor: colors.neutralButton}]}
              onPress={() =>  console.log('Back')}
              underlayColor={colors.neutral}>
            
              <Text style = {styles.buttonText}>Back</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.bottomButtons, {backgroundColor: colors.primaryDark}]}
              onPress={() =>  console.log('sumbit')}
              underlayColor={colors.primary}>
            
             <Text style = {styles.buttonText}>Sumbit</Text>
            </TouchableHighlight>
           </View>
         
        </View>
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
    width: '100%',
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color: 'white',
    marginTop: 20,
    fontSize: 50,
    fontFamily: 'PingFangTC-Semibold',
  },
  bottomButtons:{
    justifyContent: 'center',
    alignItems: 'center',
    width:214,
    height:140,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50
  },
  buttonText:{
    fontFamily: 'PingFangTC-Semibold',
    fontSize: 32,
    color: 'white',
  }
});

