import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import Toast from 'react-native-toast-message';

// Import screens
import SplashScreenComponent from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import TrendsScreen from './screens/TrendsScreen';
import RealtimeScreen from './screens/RealtimeScreen';
import BillingScreen from './screens/BillingScreen';
import ProfileScreen from './screens/ProfileScreen';

// Import components
import CustomTabBar from './components/CustomTabBar';

// Import context
import {AuthProvider} from './context/AuthContext';
import {EnergyProvider} from './context/EnergyContext';

// Import constants
import {COLORS, FONTS, SIZES} from './constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trends" component={TrendsScreen} />
      <Tab.Screen name="Realtime" component={RealtimeScreen} />
      <Tab.Screen name="Billing" component={BillingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Lock orientation to portrait
      Orientation.lockToPortrait();

      // Check if user has seen onboarding
      const onboardingSeen = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(onboardingSeen === 'true');

      // Check if user is authenticated
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);

      // Hide splash screen
      SplashScreen.hide();
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return (
    <AuthProvider>
      <EnergyProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={COLORS.white}
            translucent={false}
          />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              {!hasSeenOnboarding ? (
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              ) : !isAuthenticated ? (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                  />
                </>
              ) : (
                <Stack.Screen name="Main" component={TabNavigator} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </SafeAreaView>
      </EnergyProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default App; 