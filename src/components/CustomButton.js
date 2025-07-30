import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary', // primary, secondary, outline
  size = 'medium', // small, medium, large
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];

    // Size styles
    switch (size) {
      case 'small':
        buttonStyle.push(styles.small);
        break;
      case 'large':
        buttonStyle.push(styles.large);
        break;
      default:
        buttonStyle.push(styles.medium);
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        buttonStyle.push(styles.secondary);
        break;
      case 'outline':
        buttonStyle.push(styles.outline);
        break;
      default:
        buttonStyle.push(styles.primary);
    }

    // Disabled style
    if (disabled || loading) {
      buttonStyle.push(styles.disabled);
    }

    if (style) {
      buttonStyle.push(style);
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleArray = [styles.text];

    // Size styles
    switch (size) {
      case 'small':
        textStyleArray.push(styles.smallText);
        break;
      case 'large':
        textStyleArray.push(styles.largeText);
        break;
      default:
        textStyleArray.push(styles.mediumText);
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        textStyleArray.push(styles.secondaryText);
        break;
      case 'outline':
        textStyleArray.push(styles.outlineText);
        break;
      default:
        textStyleArray.push(styles.primaryText);
    }

    // Disabled style
    if (disabled || loading) {
      textStyleArray.push(styles.disabledText);
    }

    if (textStyle) {
      textStyleArray.push(textStyle);
    }

    return textStyleArray;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.primary : COLORS.white}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  // Size styles
  small: {
    height: 40,
    paddingHorizontal: SPACING.lg,
  },
  medium: {
    height: 56,
    paddingHorizontal: SPACING.xl,
  },
  large: {
    height: 64,
    paddingHorizontal: SPACING.xl,
  },

  // Variant styles
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  // Disabled style
  disabled: {
    opacity: 0.6,
  },

  // Text styles
  text: {
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },
  
  // Text size styles
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  // Text variant styles
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },

  // Disabled text style
  disabledText: {
    opacity: 0.6,
  },
});

export default CustomButton; 