import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStock from './screens/AddStock';
import App from '../App';

const Stack = createNativeStackNavigator();

const ScreenHandler = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={App}
          />
          <Stack.Screen
            name="AddStock"
            component={AddStock}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  export default ScreenHandler;