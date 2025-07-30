import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';

const EnergyCard = ({title, value, icon, color = COLORS.primary}) => {
  return (
    <View style={[styles.container, {borderLeftColor: color}]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, {backgroundColor: color + '20'}]}>
          <Text style={[styles.icon, {color}]}>{icon}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    borderLeftWidth: 4,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  icon: {
    fontSize: 16,
  },
  title: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    flex: 1,
  },
  value: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
});

export default EnergyCard; 