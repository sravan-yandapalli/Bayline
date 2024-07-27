import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Login from './Auth';
import Counting from './Counting';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const Stack = createNativeStackNavigator();
  
  const [loaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Mulish-Regular': require('../assets/fonts/Mulish-Regular.ttf'),
    'Mulish-Bold': require('../assets/fonts/Mulish-Bold.ttf'),
    // Add other Mulish font styles if needed
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={"Auth"}>
        <Stack.Screen name="Auth/index" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Counting/index" component={Counting} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
