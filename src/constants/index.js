import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const COLORS = {
  // Primary colors
  primary: '#2563EB',
  secondary: '#64748B',
  accent: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  success: '#10B981',
  
  // Background colors
  white: '#FFFFFF',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  
  // Text colors
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  
  // Border colors
  border: '#E2E8F0',
  divider: '#F1F5F9',
  
  // Additional colors
  lightGray: '#F1F5F9',
  darkGray: '#475569',
  transparent: 'transparent',
};

export const FONTS = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 16,
  
  // Font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 16,
  body2: 14,
  body3: 12,
  body4: 10,
  body5: 8,
  
  // App dimensions
  width,
  height,
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const API = {
  baseURL: 'https://api.e-snapp.com',
  timeout: 10000,
};

export const STORAGE_KEYS = {
  authToken: 'authToken',
  userData: 'userData',
  hasSeenOnboarding: 'hasSeenOnboarding',
  theme: 'theme',
  language: 'language',
};

export const ROUTES = {
  // Auth routes
  splash: 'Splash',
  onboarding: 'Onboarding',
  login: 'Login',
  register: 'Register',
  forgotPassword: 'ForgotPassword',
  
  // Main routes
  main: 'Main',
  home: 'Home',
  trends: 'Trends',
  realtime: 'Realtime',
  billing: 'Billing',
  profile: 'Profile',
  
  // Feature routes
  energyConsumption: 'EnergyConsumption',
  betterTariffs: 'BetterTariffs',
  uploadBill: 'UploadBill',
  electricalSystems: 'ElectricalSystems',
  homeSetup: 'HomeSetup',
  wifiSetup: 'WifiSetup',
  deviceSetup: 'DeviceSetup',
  codeVerification: 'CodeVerification',
  passwordVerification: 'PasswordVerification',
  passwordReset: 'PasswordReset',
  emailVerified: 'EmailVerified',
  energyTariff: 'EnergyTariff',
  wifiPassword: 'WifiPassword',
  wifiError: 'WifiError',
  wifiSuccess: 'WifiSuccess',
  deviceConnecting: 'DeviceConnecting',
  deviceManualEntry: 'DeviceManualEntry',
  deviceNaming: 'DeviceNaming',
  deviceSetupComplete: 'DeviceSetupComplete',
};

export const DEVICE_TYPES = {
  smartMeter: 'smart_meter',
  smartPlug: 'smart_plug',
  smartSwitch: 'smart_switch',
  sensor: 'sensor',
  thermostat: 'thermostat',
  lightBulb: 'light_bulb',
};

export const ENERGY_TYPES = {
  electricity: 'electricity',
  gas: 'gas',
  water: 'water',
  solar: 'solar',
};

export const TIME_PERIODS = {
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
};

export const NOTIFICATION_TYPES = {
  highUsage: 'high_usage',
  newTariff: 'new_tariff',
  deviceConnected: 'device_connected',
  billUploaded: 'bill_uploaded',
  maintenance: 'maintenance',
};

export const PERMISSIONS = {
  camera: 'camera',
  photoLibrary: 'photoLibrary',
  location: 'location',
  notification: 'notification',
  microphone: 'microphone',
};

export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  phone: /^\+?[\d\s-()]{10,}$/,
};

export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export default {
  COLORS,
  FONTS,
  SIZES,
  SHADOWS,
  SPACING,
  API,
  STORAGE_KEYS,
  ROUTES,
  DEVICE_TYPES,
  ENERGY_TYPES,
  TIME_PERIODS,
  NOTIFICATION_TYPES,
  PERMISSIONS,
  VALIDATION,
  ANIMATION,
}; 