import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';

const LoadingSpinner = ({
  visible = false,
  message = 'Loading...',
  size = 'large',
  color = COLORS.primary,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={size} color={color} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  spinnerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.xl,
    alignItems: 'center',
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  message: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
  },
});

export default LoadingSpinner; 