import * as React from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View, Image, Button } from "react-native";
import { useState } from "react";
import { useClerk, useSignUp } from "@clerk/clerk-expo";
import colors from "../config/colors";
import { StyleSheet } from "react-native";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { Dimensions } from "react-native";


export default function SignUpScreen({navigation}){
  const { isLoaded, signUp, setSession } = useSignUp();

  const [code, setCode] = useState("");
  const[modalVisible, setModalVisible] = useState(false);

  const screenHeight = Dimensions.get('screen').height;

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
      setModalVisible(true);
      console.log("Error:> " + err?.status || "");
      console.log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  const errorText = "Incorrect Code"

  return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
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
     <View style={styles.header}>
                <Image
                style={styles.image}
                source={require('../assets/splash-screen-icon.png')}
                width={'90%'}
                height={75}/>

               
      </View>
     <Text style={{marginTop: 140, color: 'white', fontFamily: 'Lexend-Medium', fontSize: 22}}>Enter the Code Sent to Your Email</Text>
     <View style={styles.codeInput}>
      <TextInput 
       value={code}
       placeholder="- - - - - -"
       onChangeText={(code) => setCode(code)}
       style={{fontFamily: 'Lexend-Medium', fontSize: 30}}/>
      </View>
     <TouchableHighlight onPress={onPress} style={styles.button}>
      <Text style={{color: 'white', fontFamily: 'Lexend-Medium', fontSize: 22}}>Verify Email</Text>
     </TouchableHighlight>

     <Text style={{fontFamily: 'Lexend-Medium', fontSize: 18, color: 'white', marginTop: screenHeight / 2 - 180}}>Didn't receive a code?</Text>
     <Button
      onPress={() => navigation.navigate("Auth")}
      title={"Return to Sign Up"}
      style={{color: colors.secondary}}
     />
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
    header:{
      width:'100%',
      height:180,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 70,
      borderBottomRightRadius: 70,
    },
  image:{
      marginTop: 10
  },
  codeInput:{
    backgroundColor: colors.neutral,
    width: 220,
    height: 70,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  button:{
    backgroundColor: colors.primary, 
    marginTop: 30, 
    height: 60, 
    width: 180, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modal:{
    width: 330,
    height: 400,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: Dimensions.get('screen').height / 2 - 190,
    borderRadius: 30,

  },
});