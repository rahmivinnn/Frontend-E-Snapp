import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING, DEVICE_TYPES} from '../constants';
import {useEnergy} from '../context/EnergyContext';
import CustomButton from '../components/CustomButton';

const DeviceSetupScreen = ({navigation}) => {
  const {addDevice, isLoading} = useEnergy();
  const [selectedDeviceType, setSelectedDeviceType] = useState(null);
  const [deviceName, setDeviceName] = useState('');
  const [deviceLocation, setDeviceLocation] = useState('');

  const deviceTypes = [
    {
      type: DEVICE_TYPES.smartMeter,
      name: 'Smart Meter',
      icon: '📊',
      description: 'Monitor overall energy consumption',
      color: COLORS.primary,
    },
    {
      type: DEVICE_TYPES.smartPlug,
      name: 'Smart Plug',
      icon: '🔌',
      description: 'Control individual appliances',
      color: COLORS.accent,
    },
    {
      type: DEVICE_TYPES.smartSwitch,
      name: 'Smart Switch',
      icon: '🔘',
      description: 'Control lights and switches',
      color: COLORS.warning,
    },
    {
      type: DEVICE_TYPES.sensor,
      name: 'Energy Sensor',
      icon: '📡',
      description: 'Monitor specific circuits',
      color: COLORS.success,
    },
    {
      type: DEVICE_TYPES.thermostat,
      name: 'Smart Thermostat',
      icon: '🌡️',
      description: 'Control heating and cooling',
      color: COLORS.error,
    },
    {
      type: DEVICE_TYPES.lightBulb,
      name: 'Smart Bulb',
      icon: '💡',
      description: 'Control lighting remotely',
      color: COLORS.secondary,
    },
  ];

  const handleDeviceTypeSelect = (deviceType) => {
    setSelectedDeviceType(deviceType);
  };

  const handleAddDevice = async () => {
    if (!selectedDeviceType) {
      Alert.alert('Error', 'Please select a device type');
      return;
    }

    if (!deviceName.trim()) {
      Alert.alert('Error', 'Please enter a device name');
      return;
    }

    const deviceData = {
      name: deviceName.trim(),
      type: selectedDeviceType.type,
      location: deviceLocation.trim() || 'Unknown',
      isOnline: false,
    };

    const success = await addDevice(deviceData);
    if (success) {
      navigation.goBack();
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Add New Device</Text>
      <Text style={styles.subtitle}>Choose the type of device you want to add</Text>
    </View>
  );

  const renderDeviceTypes = () => (
    <View style={styles.deviceTypesContainer}>
      <Text style={styles.sectionTitle}>Select Device Type</Text>
      <View style={styles.deviceTypesGrid}>
        {deviceTypes.map((device, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.deviceTypeCard,
              selectedDeviceType?.type === device.type && styles.deviceTypeCardSelected,
            ]}
            onPress={() => handleDeviceTypeSelect(device)}>
            <Text style={[styles.deviceTypeIcon, {color: device.color}]}>
              {device.icon}
            </Text>
            <Text style={styles.deviceTypeName}>{device.name}</Text>
            <Text style={styles.deviceTypeDescription}>{device.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDeviceDetails = () => {
    if (!selectedDeviceType) return null;

    return (
      <View style={styles.deviceDetailsContainer}>
        <Text style={styles.sectionTitle}>Device Details</Text>
        <View style={styles.deviceDetailsCard}>
          <View style={styles.selectedDeviceInfo}>
            <Text style={[styles.selectedDeviceIcon, {color: selectedDeviceType.color}]}>
              {selectedDeviceType.icon}
            </Text>
            <View style={styles.selectedDeviceText}>
              <Text style={styles.selectedDeviceName}>{selectedDeviceType.name}</Text>
              <Text style={styles.selectedDeviceDescription}>
                {selectedDeviceType.description}
              </Text>
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Device Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter device name"
              value={deviceName}
              onChangeText={setDeviceName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Location (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Living Room, Kitchen"
              value={deviceLocation}
              onChangeText={setDeviceLocation}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderSetupInstructions = () => {
    if (!selectedDeviceType) return null;

    return (
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>Setup Instructions</Text>
        <View style={styles.instructionsCard}>
          <View style={styles.instructionStep}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>
              Make sure your device is powered on and in pairing mode
            </Text>
          </View>
          <View style={styles.instructionStep}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>
              Ensure your phone is connected to the same WiFi network
            </Text>
          </View>
          <View style={styles.instructionStep}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>
              Follow the device-specific setup instructions
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
        translucent={false}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderDeviceTypes()}
        {renderDeviceDetails()}
        {renderSetupInstructions()}
        
        {selectedDeviceType && (
          <View style={styles.buttonContainer}>
            <CustomButton
              title={isLoading ? 'Adding Device...' : 'Add Device'}
              onPress={handleAddDevice}
              disabled={isLoading}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginBottom: SPACING.md,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  deviceTypesContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  deviceTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deviceTypeCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    marginHorizontal: '1%',
    alignItems: 'center',
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceTypeCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  deviceTypeIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  deviceTypeName: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  deviceTypeDescription: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  deviceDetailsContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  deviceDetailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDeviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedDeviceIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  selectedDeviceText: {
    flex: 1,
  },
  selectedDeviceName: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  selectedDeviceDescription: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: SPACING.lg,
    fontSize: 16,
    fontFamily: FONTS.regular,
    backgroundColor: COLORS.background,
  },
  instructionsContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  instructionsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: SPACING.md,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.xl,
  },
});

export default DeviceSetupScreen; 