import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../config/colors';

export default function HomeScreen({navigation}) {

    return (
        <View style={styles.container}>
        <Button
        title="Add a Stock"
        onPress={() => navigation.navigate('AddStock')}
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
    