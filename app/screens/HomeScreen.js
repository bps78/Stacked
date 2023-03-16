import { useEffect, useState } from 'react';
import { Button, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';
import colors from '../config/colors';
import '../../App';
import './AddStock';
import '../ApiHandler';
import { SafeAreaView } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import {TouchableHighlight} from 'react-native-gesture-handler';
import StockListItem from '../components/StockListItem';
import Stock from '../Stock';

export default function HomeScreen({route, navigation}) {

  try{
    const{totShares} = route.params;
  } catch (e){
    totShares = 0;
  }
  

  const[userStocks, setUserStocks] = useState([]);
  global.userStocks = userStocks;

 //Import Custom Fonts
 const [dayView,setDayView] = useState(true);

 const [fontsLoaded] = useFonts({
  'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
  'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf'),
});
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Lexend-Medium', color:'white', fontSize: 70, marginTop: 20}}>$7,238</Text>
                <Text style={{fontFamily: 'Lexend-Medium', color:'lightgray', fontSize: 45}}>+47.34</Text>
              </View>
            </SafeAreaView>

            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => setDayView(true)} style={[styles.viewSelectButton,{backgroundColor: dayView? colors.primaryDark : colors.neutralButton, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}>
                <Text style={styles.viewChangeText}>Day</Text>
              </Pressable>
              <Pressable onPress = {() => setDayView(false)} style={[styles.viewSelectButton,{backgroundColor: dayView? colors.neutralButton : colors.primaryDark, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}>
                <Text style={styles.viewChangeText}>Total</Text>
              </Pressable>
            </View>

            <FlatList
            keyExtractor={item => item.index}
            style={styles.flatList}
            data={userStocks}
            //keyExtractor= { (stock, stock.id) => stock.index.toString()}
            renderItem= {({item}) => 
              <StockListItem
               symbol= {item.symbol}
               onCaratPress={() => navigation.navigate('Detail', {
                symbol: item.symbol,
                purPrice: item.avgPrice,
                shares: item.shares,
                totShares: totShares,
                date: item.dateBought,
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
        color: 'lightgrey',
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
        marginTop: 30
      }
    });
    