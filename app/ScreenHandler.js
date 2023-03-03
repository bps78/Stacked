import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStock from './screens/AddStock';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const ScreenHandler = () => {
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