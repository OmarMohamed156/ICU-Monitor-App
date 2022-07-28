import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import MainScreen from './screens/MainScreen';
import Room from './screens/Room';
import Sensors from './screens/Sensors';
import Config from './screens/Configuration';
import axios from 'axios';

export default function App() {
  
  const stack = createNativeStackNavigator(); 

  axios.defaults.baseURL = 'http://192.168.43.226:80/';

  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen 
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
          />
          <stack.Screen
          name="Config"
          component={Config}
          />
          <stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
          />
          <stack.Screen
          name="Room"
          component={Room}
          options={{
            headerShown: false,
          }}
          />
          <stack.Screen
          name="Sensors"
          component={Sensors}
          />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
