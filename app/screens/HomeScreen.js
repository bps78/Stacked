import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';
import colors from '../config/colors';
import '../../App';
import './AddStock';

export default function HomeScreen({navigation}) {
 //Import Custom Fonts
 const [fontsLoaded] = useFonts({
  'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
  'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf')
});
    return (
        <View style={styles.container}>
        <Button
        title="Add a Stock"
        onPress={() => navigation.navigate('AddStock')}
        />

        <Button
        title="Log My Stocks"
        onPress={() => console.log(global.userStocks)}
        />
        </View>
      );
    }

    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    