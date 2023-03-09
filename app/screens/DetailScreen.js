import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Button } from 'react-native';
import colors from '../config/colors.js'
import TextInputBox from '../components/TextInputBox.js';
import { SafeAreaView } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {useFonts} from 'expo-font';

export default function DetailScreen({route, navigation}) {

    const{symbol} = route.params;
 
    return(
        <View style={styles.container}>
            <Text>Detail Screen</Text>
            <Text>{symbol}</Text>
            <Button
            onPress={()=> navigation.navigate('Home')}
            title="Back"
            />
        </View>
    );

   
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
    }

});