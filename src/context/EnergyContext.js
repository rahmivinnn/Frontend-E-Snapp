import React, {createContext, useContext, useState, useEffect} from 'react';
import {apiService} from '../services/apiService';
import {useAuth} from './AuthContext';
import Toast from 'react-native-toast-message';

const EnergyContext = createContext();

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error('useEnergy must be used within an EnergyProvider');
  }
  return context;
};

export const EnergyProvider = ({children}) => {
  const {token} = useAuth();
  const [energyData, setEnergyData] = useState([]);
  const [currentEnergyData, setCurrentEnergyData] = useState(null);
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchEnergyData();
      fetchDevices();
    }
  }, [token]);

  const fetchEnergyData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.get('/energy/data', token);
      
      if (response.success) {
        setEnergyData(response.data);
        if (response.data.length > 0) {
          setCurrentEnergyData(response.data[response.data.length - 1]);
        }
      } else {
        setError(response.message || 'Failed to fetch energy data');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error fetching energy data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDevices = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.get('/devices', token);
      
      if (response.success) {
        setDevices(response.data);
      } else {
        setError(response.message || 'Failed to fetch devices');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error fetching devices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addDevice = async (deviceData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.post('/devices', deviceData, token);
      
      if (response.success) {
        await fetchDevices();
        Toast.show({
          type: 'success',
          text1: 'Device Added',
          text2: 'Device has been added successfully',
        });
        return true;
      } else {
        setError(response.message || 'Failed to add device');
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

  const updateDevice = async (deviceId, deviceData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.put(`/devices/${deviceId}`, deviceData, token);
      
      if (response.success) {
        await fetchDevices();
        Toast.show({
          type: 'success',
          text1: 'Device Updated',
          text2: 'Device has been updated successfully',
        });
        return true;
      } else {
        setError(response.message || 'Failed to update device');
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

  const deleteDevice = async (deviceId) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.delete(`/devices/${deviceId}`, token);
      
      if (response.success) {
        await fetchDevices();
        Toast.show({
          type: 'success',
          text1: 'Device Removed',
          text2: 'Device has been removed successfully',
        });
        return true;
      } else {
        setError(response.message || 'Failed to delete device');
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

  const uploadBill = async (filePath) => {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('bill', {
        uri: filePath,
        type: 'application/pdf',
        name: 'bill.pdf',
      });

      const response = await apiService.upload('/energy/upload-bill', formData, token);
      
      if (response.success) {
        await fetchEnergyData();
        Toast.show({
          type: 'success',
          text1: 'Bill Uploaded',
          text2: 'Bill has been uploaded successfully',
        });
        return true;
      } else {
        setError(response.message || 'Failed to upload bill');
        Toast.show({
          type: 'error',
          text1: 'Upload Failed',
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

  const getBetterTariffs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.get('/energy/tariffs', token);
      
      if (response.success) {
        return response.data;
      } else {
        setError(response.message || 'Failed to fetch tariffs');
        return [];
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error fetching tariffs:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const scanWiFiNetworks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.get('/wifi/scan', token);
      
      if (response.success) {
        return response.data;
      } else {
        setError(response.message || 'Failed to scan WiFi networks');
        return [];
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error scanning WiFi networks:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const connectToWiFi = async (ssid, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.post('/wifi/connect', {
        ssid,
        password,
      }, token);
      
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'WiFi Connected',
          text2: 'Successfully connected to WiFi network',
        });
        return true;
      } else {
        setError(response.message || 'Failed to connect to WiFi');
        Toast.show({
          type: 'error',
          text1: 'Connection Failed',
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

  const setupDevice = async (deviceId, settings) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.post(`/devices/${deviceId}/setup`, settings, token);
      
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Device Setup',
          text2: 'Device has been configured successfully',
        });
        return true;
      } else {
        setError(response.message || 'Failed to setup device');
        Toast.show({
          type: 'error',
          text1: 'Setup Failed',
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

  const testDeviceConnection = async (deviceId) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.get(`/devices/${deviceId}/test`, token);
      
      if (response.success) {
        return response.data.connected;
      } else {
        setError(response.message || 'Failed to test device connection');
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error testing device connection:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateDeviceStatus = (deviceId, isOnline) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId ? {...device, isOnline} : device
      )
    );
  };

  const addEnergyData = (data) => {
    setEnergyData(prevData => [...prevData, data]);
    setCurrentEnergyData(data);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    energyData,
    currentEnergyData,
    devices,
    isLoading,
    error,
    fetchEnergyData,
    fetchDevices,
    addDevice,
    updateDevice,
    deleteDevice,
    uploadBill,
    getBetterTariffs,
    scanWiFiNetworks,
    connectToWiFi,
    setupDevice,
    testDeviceConnection,
    updateDeviceStatus,
    addEnergyData,
    clearError,
  };

  return <EnergyContext.Provider value={value}>{children}</EnergyContext.Provider>;
}; 