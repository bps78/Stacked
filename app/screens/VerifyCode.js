import * as React from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useClerk, useSignUp } from "@clerk/clerk-expo";
import colors from "../config/colors";
import { StyleSheet } from "react-native";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native";


export default function SignUpScreen({navigation}){
  const { isLoaded, signUp, setSession } = useSignUp();

  const [code, setCode] = useState("");

  const onPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

  
      await setSession(completeSignUp.createdSessionId);
      navigation.replace('Home');
    } catch (err) {
      console.log("Error:> " + err?.status || "");
      console.log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
     <Text style={{marginTop: 90, color: 'white'}}>Enter the Code Sent to Your Email</Text>
     <TextInput 
      value={code}
      placeholder="Code"
      onChangeText={(code) => setCode(code)}/>

     <TouchableHighlight onPress={onPress}>
      <Text>Verify Email</Text>
     </TouchableHighlight>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background
    },
});