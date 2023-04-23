import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStock from './screens/AddStock';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AuthScreen from './screens/AuthScreen';
import VerifyCode from './screens/VerifyCode';
import {useFonts} from 'expo-font';
import { ClerkProvider } from '@clerk/clerk-expo';

const Stack = createNativeStackNavigator();

const ScreenHandler = () => {
  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../app/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('../app/assets/fonts/Lexend-Medium.ttf'),
  });
  
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VerifyCode"
            component={VerifyCode}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddStock"
            component={AddStock}
            options={{headerShown: false}}
            />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{headerShown: false}}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  export default ScreenHandler;