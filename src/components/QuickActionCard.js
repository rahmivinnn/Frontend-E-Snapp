import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';

const QuickActionCard = ({title, icon, color = COLORS.primary, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: color + '20'}]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={[styles.title, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: SPACING.lg,
    justifyContent: 'center',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  icon: {
    fontSize: 24,
    color: COLORS.white,
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },
});

export default QuickActionCard; 