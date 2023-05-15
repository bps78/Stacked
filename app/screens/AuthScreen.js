import {Text, View, StyleSheet, Button, Image, TouchableHighlight, Pressable, Keyboard} from 'react-native';
import colors from '../config/colors.js'
import { useState } from 'react';
import TextInputBox from '../components/TextInputBox.js';
import { useSignIn } from "@clerk/clerk-expo";
import { Dimensions } from 'react-native';
import {useFonts} from 'expo-font';
import { useSignUp } from '@clerk/clerk-expo';
import { TouchableWithoutFeedback } from 'react-native';
import { Modal } from 'react-native';



export default function AuthScreen({navigation}) {

    const [fontsLoaded] = useFonts({
        'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
        'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf'),
      });

     const { signIn, setSession} = useSignIn();
     const {signUp} = useSignUp();
      
       //Modal Bool
     const[modalVisible, setModalVisible] = useState(false);
     const[errorText, setErrorText] = useState("");

     const [emailAddress, setEmailAddress] = useState("");
     const [password, setPassword] = useState("");

     const [signingIn,setSigningIn] = useState(true);
    
     const {isLoaded} = (signingIn? useSignIn() : useSignUp());


    

     const onSignInPress = async () => {
      if (!isLoaded) {
        return;
      }
        
            try {
              const completeSignIn = await signIn.create({
                identifier: emailAddress,
                password,
              });
        
              await setSession(completeSignIn.createdSessionId);
              navigation.navigate('Home');
            } catch (err) {
              // @ts-ignore
              console.log("Error:> ",(err.errors ? err.errors[0].message : err));
              setErrorText("Wrong Username/ Password");
              setModalVisible(true);
            }
          };

         
        
         const onSignUpPress = async() => {
          if (!isLoaded) {
            return;
          }

            try{
              await signUp.create({
                emailAddress,
                password,
              });

              await signUp.prepareEmailAddressVerification({strategy: "email_code"});

              navigation.navigate('VerifyCode');
            }catch (err){
              console.log('ERROR > ', (err.errors? err.errors[0].message : err));
              setErrorText("Incomplete Sign Up");
              setModalVisible(true);
            }
          };
     
  
            
     
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
            <View style={styles.header}>
                <Image
                style={styles.image}
                source={require('../assets/splash-screen-icon.png')}
                width={'90%'}
                height={75}/>

               
            </View>

            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => setSigningIn(true)} style={[styles.viewSelectButton,{backgroundColor: signingIn? colors.neutral : colors.neutralButton, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}>
                <Text style={styles.viewChangeText}>Log In</Text>
              </Pressable>
              <Pressable onPress = {() => setSigningIn(false)} style={[styles.viewSelectButton,{backgroundColor: signingIn? colors.neutralButton : colors.neutral, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}>
                <Text style={styles.viewChangeText}>Sign Up</Text>
              </Pressable>
            </View>
        

            <View style={{margin:40}}></View>
            <TextInputBox
              title="Email"
              color= {colors.neutral}
              rectWidth = {350}
              rectHeight = {80}
              iconName='user'
              setFunction={setEmailAddress}
              textSize={20}
              >
            
            </TextInputBox>

            <TextInputBox
              title="Password"
              color= {colors.neutral}
              rectWidth = {350}
              rectHeight = {80}
              iconName='lock'
              setFunction={setPassword}
              secureText={true}
              textSize={20}
              >
            
            </TextInputBox>

        <View style={{flex:1}}></View>
           <View>
            <TouchableHighlight style={[styles.bottomButtons, {backgroundColor: colors.primaryMid, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}
              onPress={signingIn? onSignInPress: onSignUpPress}
              underlayColor={colors.primary}>
            
             <Text style = {styles.buttonText}>{signingIn? 'Log In' : 'Sign Up'}</Text>
            </TouchableHighlight>

           
           </View>
        </View>
      </TouchableWithoutFeedback>

       
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center'
        
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
    bottomButtons:{
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
        height:120,
        borderRadius: 50
      },
      buttonText:{
        fontFamily: 'Lexend-Medium',
        fontSize: 32,
        color: 'white',
      },
      viewSelectButton:{
        width: 120,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        marginBottom: 0
      },
      viewChangeText:{
        color: 'black',
        fontFamily: 'Lexend-Medium',
        fontSize: 16
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