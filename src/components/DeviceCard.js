import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING, DEVICE_TYPES} from '../constants';

const DeviceCard = ({device, onPress}) => {
  const getDeviceIcon = (type) => {
    switch (type) {
      case DEVICE_TYPES.smartMeter:
        return '📊';
      case DEVICE_TYPES.smartPlug:
        return '🔌';
      case DEVICE_TYPES.smartSwitch:
        return '🔘';
      case DEVICE_TYPES.sensor:
        return '📡';
      case DEVICE_TYPES.thermostat:
        return '🌡️';
      case DEVICE_TYPES.lightBulb:
        return '💡';
      default:
        return '📱';
    }
  };

  const getDeviceColor = (type) => {
    switch (type) {
      case DEVICE_TYPES.smartMeter:
        return COLORS.primary;
      case DEVICE_TYPES.smartPlug:
        return COLORS.accent;
      case DEVICE_TYPES.smartSwitch:
        return COLORS.warning;
      case DEVICE_TYPES.sensor:
        return COLORS.success;
      case DEVICE_TYPES.thermostat:
        return COLORS.error;
      case DEVICE_TYPES.lightBulb:
        return COLORS.secondary;
      default:
        return COLORS.primary;
    }
  };

  const getStatusColor = (isOnline) => {
    return isOnline ? COLORS.success : COLORS.error;
  };

  const getStatusText = (isOnline) => {
    return isOnline ? 'Online' : 'Offline';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: getDeviceColor(device.type) + '20'},
            ]}>
            <Text style={[styles.icon, {color: getDeviceColor(device.type)}]}>
              {getDeviceIcon(device.type)}
            </Text>
          </View>
          <View style={styles.deviceInfo}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Text style={styles.deviceType}>{device.type}</Text>
            {device.location && (
              <Text style={styles.deviceLocation}>{device.location}</Text>
            )}
          </View>
        </View>
        <View style={styles.rightSection}>
          <View
            style={[
              styles.statusIndicator,
              {backgroundColor: getStatusColor(device.isOnline)},
            ]}
          />
          <Text style={[styles.statusText, {color: getStatusColor(device.isOnline)}]}>
            {getStatusText(device.isOnline)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.md,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  deviceType: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'capitalize',
  },
  deviceLocation: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textTertiary,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: SPACING.xs,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
});

export default DeviceCard; 