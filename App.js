import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import MainScreen from './screens/MainScreen';
import Room1 from './screens/Room1';
import Sensors from './screens/Sensors';

export default function App() {
  const stack = createNativeStackNavigator(); 
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
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
          />
          <stack.Screen
          name="Room1"
          component={Room1}
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
