import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

function TextInputBox({title, color, rectWidth, rectHeight, iconName}) {
  return(
          <View 
          style={[styles.rectangle, {backgroundColor: color}, {width: rectWidth}, {height: rectHeight}]}>
          
          <FontAwesome name={iconName} size={24} color="gray"  style={{marginLeft:20, marginRight:20}}/>
          <View style={{width:rectWidth-128, height:rectHeight, justifyContent: 'center', alignItems:'center'}}>
          <TextInput
            style={{fontFamily: 'Lexend-Regular', fontSize: '24'}}
            placeholder={title}
            placeholderTextColor = 'gray'
            />
            </View>
        </View>
  );
}
const styles = StyleSheet.create({
rectangle: {
    height: 40,
    margin: 20,
    padding: 5,
    width: 10,
    backgroundColor: 'yellow',
    alignItems: 'center',
    //justifyContent: 'center',
    borderRadius: 30,
    flexDirection: 'row'
  },
})
export default TextInputBox;      
