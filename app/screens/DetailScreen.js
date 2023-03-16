import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Button } from 'react-native';
import colors from '../config/colors.js'
import TextInputBox from '../components/TextInputBox.js';
import { SafeAreaView } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {useFonts} from 'expo-font';
import PercentageCircle from 'react-native-percentage-circle'; //npm i react-native-percentage-circle
import './HomeScreen';
import './AddStock';

export default function DetailScreen({route, navigation}) {

    const{symbol, purPrice, shares, totShares, date} = route.params;

    const sharePercent = ((shares/totShares) * 100).toFixed(0);
    console.log('TotShares', totShares);
 

    return(
        <View style={styles.container}>
             <SafeAreaView style={styles.header}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Lexend-Medium', color:'white', fontSize: 70, marginTop: 20}}>{symbol}</Text>
                <Text style={{fontFamily: 'Lexend-Medium', color:'lightgray', fontSize: 45}}>153.23</Text>
              </View>
            </SafeAreaView>

            <View style={{flexDirection: 'row', marginTop: 60, alignItems: 'center', justifyContent: 'center', height: 80}}>
                <Text style={styles.sectionHeader}>Shares</Text>
                <View style={styles.neutralBox}>
                    <Text style={styles.dataText}>{shares}</Text>
                </View>

                <View style={{flexDirection:'column', marginLeft:30}}>
                <PercentageCircle
                radius={38}
                percent={sharePercent}
                color={colors.neutral}
                innerColor={colors.background} 
                bgcolor={colors.neutralButton}
                borderWidth={7}>
                  
                  <Text style={styles.percentageText}>{sharePercent}%</Text>
                </PercentageCircle>
                <Text style={{marginTop: 5, color: 'white', fontFamily: 'Lexend-Medium', textAlign: 'center'}}>of Portfolio</Text>
                </View>
            </View> 


            <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center', height: 80}}>
                <Text style={styles.sectionHeader}>P/L</Text>
                <View style={[styles.neutralBox, {width: 130, backgroundColor:colors.primary, marginLeft: 20}]}>
                    <Text style={styles.dataText}>$314.23</Text>
                </View>

                <View style={{marginLeft: 30}}>
                <PercentageCircle
                radius={38}
                percent={75}
                color={colors.primary}
                innerColor={colors.background} 
                bgcolor={colors.neutralButton}
                borderWidth={7}>
                  
                  <Text style={[styles.percentageText, {color:colors.primary}]}>{75}%</Text>
                </PercentageCircle>
                </View>
            </View> 


            <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center', height: 80}}>
               <Text style={[styles.sectionHeader, {marginRight: 20}]}>Avg. Purchase</Text>
               <View style={styles.neutralBox}>
                  <Text style={styles.dataText}>${purPrice}</Text>
               </View>
            </View>

            <View style={{marginTop: 50, height: 80}}>
              
              <Text style={styles.dateText}>Added {date}</Text>
            </View>


          <View style={{flex: 1}}></View>
           <TouchableHighlight
            style = {styles.botButton}
            onPress={() => navigation.navigate('Home', {
              totShares: totShares,
            })} 
            underlayColor= {colors.neutralButtonHighlight}>
              <Text style={{fontFamily: "Lexend-Medium", color:'white', fontSize: 30}}>Back</Text>
            </TouchableHighlight>
        </View> 
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
        height:190,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
      },
      neutralBox:{
        width: 100,
        height:50,
        backgroundColor: colors.neutral,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
      },
      sectionHeader:{
        fontFamily: 'Lexend-Medium',
        fontSize: 32,
        color: 'white',
        marginRight: 35
      },
      dataText:{
        fontFamily: 'Lexend-Medium',
        fontSize: 28,
        color: colors.background
      },
      percentageText:{
        color: 'white',
        fontFamily: 'Lexend-Medium',
        fontSize: 20,
        textAlign: 'center'
      },
      botButton:{
        width: Dimensions.get('screen').width,
        height: 120,
        backgroundColor: colors.neutralButton,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 70,
        borderTopLeftRadius: 70
      },
      dateText:{
        fontFamily: 'Lexend-Medium',
        color: colors.neutralButtonHighlight, 
        fontSize: 24,
        textAlign: 'center',
      }

});