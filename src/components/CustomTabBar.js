import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';

const {width} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}) => {
  const tabItems = [
    {
      name: 'Home',
      icon: '🏠',
      activeIcon: '🏠',
      label: 'Home',
    },
    {
      name: 'Trends',
      icon: '📈',
      activeIcon: '📈',
      label: 'Trends',
    },
    {
      name: 'Realtime',
      icon: '⚡',
      activeIcon: '⚡',
      label: 'Realtime',
    },
    {
      name: 'Billing',
      icon: '📄',
      activeIcon: '📄',
      label: 'Billing',
    },
    {
      name: 'Profile',
      icon: '👤',
      activeIcon: '👤',
      label: 'Profile',
    },
  ];

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;
        const tabItem = tabItems.find(item => item.name === route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            <View style={styles.tabContent}>
              <Text style={[styles.icon, isFocused && styles.activeIcon]}>
                {isFocused ? tabItem?.activeIcon : tabItem?.icon}
              </Text>
              <Text style={[styles.label, isFocused && styles.activeLabel]}>
                {tabItem?.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: SPACING.sm,
    paddingTop: SPACING.sm,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  activeIcon: {
    transform: [{scale: 1.1}],
  },
  label: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  activeLabel: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
});

export default CustomTabBar; 