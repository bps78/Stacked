import { useEffect, useState } from 'react';
import { Button, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';
import colors from '../config/colors';
import { SafeAreaView } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import {TouchableHighlight} from 'react-native-gesture-handler';
import StockListItem from '../components/StockListItem';
import Stock from '../Stock';
import handler from '../ApiHandler';
import { useClerk, useAuth } from '@clerk/clerk-expo';
import ScreenHandler from '../ScreenHandler';

export default function HomeScreen({route, navigation}) {

  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf'),
  });

  const [userStocks, setUserStocks] = useState([]);
  
   global.userStocks = userStocks;




  
  
  let portValue = 0;
  let totChange = 0;
  let dayChange = 0;
  //console.log(userStocks);
 
  const length = global.userStocks.length;


  
  
  try{
    const{totShares} = route.params;
    handler();

  } catch (e){
    totShares = 0;
  }

  try{
    for(let i = 0; i < length; i++){
      const element = userStocks[i];
      portValue += (Number(element.curPrice) * Number(element.shares));

      totChange += (((element.curPrice) -  (element.avgPrice)) * Number(element.shares));
      dayChange += (((element.curPrice) -  (element.openPrice)) * Number(element.shares));
    }
     
     portValue = Number(portValue.toFixed(0)).toLocaleString();

  }
  catch(e){
    console.log('Sum Not Working :(')
  }
  

  

 //Import Custom Fonts
 const [dayView,setDayView] = useState(true);



 const dayChangePos = (dayChange >= 0);
 const totChangePos = (totChange >= 0);

 totChange = (totChangePos? '+' : '') + totChange.toFixed(2);
 dayChange = (dayChangePos? '+' : '') + dayChange.toFixed(2);

 

 let headerColor = colors.primary;
 if(dayView){
   headerColor = dayChangePos? colors.primary : colors.secondary;
 }else{
   headerColor = totChangePos? colors.primary : colors.secondary;
 }

  

const { signOut} = useAuth();

const onSignOutPress = async () =>{
  await signOut();
}

    return (
        <View style={styles.container}>
            <SafeAreaView style={[styles.header, {backgroundColor: headerColor}]}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Lexend-Medium', color:'white', fontSize: 65, marginTop: 20}}>${portValue.toLocaleString()}</Text>
                <Text style={{fontFamily: 'Lexend-Medium', color:'lightgray', fontSize: 45}}>{dayView ? dayChange : totChange}</Text>
              </View>
            </SafeAreaView>


            <Button onPress={onSignOutPress} title={'Sign Out'}>

            </Button>


            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => setDayView(true)} style={[styles.viewSelectButton,{backgroundColor: dayView? colors.neutral : colors.neutralButton, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}>
                <Text style={styles.viewChangeText}>Day</Text>
              </Pressable>
              <Pressable onPress = {() => setDayView(false)} style={[styles.viewSelectButton,{backgroundColor: dayView? colors.neutralButton : colors.neutral, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}>
                <Text style={styles.viewChangeText}>Total</Text>
              </Pressable>
            </View>

            <FlatList
            keyExtractor={item => item.index}
            style={styles.flatList}
            data={global.userStocks}
            showsVerticalScrollIndicator={false}
            renderItem= {({item}) => 
              <StockListItem
               symbol= {item.symbol}
               openPrice= {item.openPrice}
               curPrice= {item.curPrice}
               dayView={dayView}
               purPrice={item.avgPrice}
               shares={item.shares}

               onCaratPress={() => navigation.navigate('Detail', {
                symbol: item.symbol,
                purPrice: item.avgPrice,
                shares: item.shares,
                totShares: totShares,
                date: item.dateBought,
                curPrice: item.curPrice,
                openPrice: item.openPrice,
                upOnDay: (item.curPrice >= item.openPrice),
               })}
               />

            }
            
            />
            

           

           <TouchableHighlight
            style = {styles.botButton}
            onPress={() => navigation.navigate('AddStock')} 
            underlayColor= {colors.neutralButtonHighlight}>
              <Text style={{fontFamily: "Lexend-Medium", color:'white', fontSize: 30}}>Add Stock</Text>
            </TouchableHighlight>
        </View>
      );
    }

    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        //justifyContent: 'center',
        
      },
      header:{
        width:Dimensions.get('screen').width,
        height:190,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
      },
      viewSelectButton:{
        width: 120,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        marginBottom: 20
      },
      viewChangeText:{
        color: 'black',
        fontFamily: 'Lexend-Medium',
        fontSize: 16
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
      flatList:{
        marginTop: 12,
    
      }
    });
    