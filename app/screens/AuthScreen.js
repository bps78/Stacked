import {Text, View, StyleSheet, Button, Image} from 'react-native';
import colors from '../config/colors.js'


export default function AuthScreen({navigation}) {


    return(
        <View style = {styles.container}>
            <View style={styles.header}>
                <Image
                style={styles.image}
                source={require('../assets/splash-screen-icon.png')}
                width={'90%'}
                height={75}/>

               
            </View>
        <Button 
        onPress={() => navigation.navigate('Home')}
        title='HOME'/>

       


        </View>
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
    }
});