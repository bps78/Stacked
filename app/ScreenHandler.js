import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStock from './screens/AddStock';
import HomeScreen from './screens/HomeScreen';
import {useFonts} from 'expo-font';

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
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddStock"
            component={AddStock}
            options={{headerShown: false}}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  export default ScreenHandler;