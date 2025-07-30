import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS, API} from '../constants';
import {apiService} from '../services/apiService';
import Toast from 'react-native-toast-message';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.authToken);
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.userData);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        
        // Verify token with server
        const isValid = await verifyToken(storedToken);
        if (!isValid) {
          await logout();
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await apiService.get('/auth/me', token);
      return response.success;
    } catch (error) {
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.post('/auth/login', {
        email,
        password,
      });

      if (response.success) {
        const {token: authToken, user: userData} = response.data;
        
        await AsyncStorage.setItem(STORAGE_KEYS.authToken, authToken);
        await AsyncStorage.setItem(STORAGE_KEYS.userData, JSON.stringify(userData));
        
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);
        
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
        });
        
        return true;
      } else {
        setError(response.message || 'Login failed');
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: response.message || 'Please check your credentials',
        });
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    try {
      setIsLoading(true);
      setError(null);

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }

      const response = await apiService.post('/auth/register', {
        name,
        email,
        password,
      });

      if (response.success) {
        const {token: authToken, user: userData} = response.data;
        
        await AsyncStorage.setItem(STORAGE_KEYS.authToken, authToken);
        await AsyncStorage.setItem(STORAGE_KEYS.userData, JSON.stringify(userData));
        
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);
        
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'Welcome to E-Snapp!',
        });
        
        return true;
      } else {
        setError(response.message || 'Registration failed');
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: response.message || 'Please try again',
        });
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.post('/auth/forgot-password', {
        email,
      });

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Reset Email Sent',
          text2: 'Please check your email for reset instructions',
        });
        return true;
      } else {
        setError(response.message || 'Failed to send reset email');
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: response.message || 'Please try again',
        });
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.post('/auth/reset-password', {
        token,
        password: newPassword,
      });

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Password Reset Successful',
          text2: 'You can now login with your new password',
        });
        return true;
      } else {
        setError(response.message || 'Password reset failed');
        Toast.show({
          type: 'error',
          text1: 'Reset Failed',
          text2: response.message || 'Please try again',
        });
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (code) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.post('/auth/verify-email', {
        code,
      });

      if (response.success) {
        if (user) {
          setUser({...user, isEmailVerified: true});
          await AsyncStorage.setItem(STORAGE_KEYS.userData, JSON.stringify({...user, isEmailVerified: true}));
        }
        
        Toast.show({
          type: 'success',
          text1: 'Email Verified',
          text2: 'Your email has been verified successfully',
        });
        return true;
      } else {
        setError(response.message || 'Email verification failed');
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: response.message || 'Please try again',
        });
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.authToken);
      await AsyncStorage.removeItem(STORAGE_KEYS.userData);
      
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      
      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have been logged out successfully',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem(STORAGE_KEYS.userData, JSON.stringify(userData));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
    logout,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 