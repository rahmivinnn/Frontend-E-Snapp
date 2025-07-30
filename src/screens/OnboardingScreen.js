import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);

  const onboardingData = [
    {
      title: 'Welcome to E-Snapp',
      description: 'Monitor and manage your energy consumption with smart insights and real-time data.',
      icon: '⚡',
      color: COLORS.primary,
    },
    {
      title: 'Smart Device Management',
      description: 'Connect and control your smart devices to optimize energy usage and reduce costs.',
      icon: '📱',
      color: COLORS.accent,
    },
    {
      title: 'Better Energy Tariffs',
      description: 'Find the best energy tariffs and save money on your utility bills.',
      icon: '💰',
      color: COLORS.success,
    },
  ];

  const handlePageChange = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / width);
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentPage + 1) * width,
        animated: true,
      });
    } else {
      finishOnboarding();
    }
  };

  const handleSkip = () => {
    finishOnboarding();
  };

  const finishOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const renderPageIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                width: currentPage === index ? 24 : 8,
                backgroundColor: currentPage === index ? onboardingData[currentPage].color : COLORS.border,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderPage = (item, index) => {
    return (
      <View key={index} style={styles.pageContainer}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.icon,
              {
                backgroundColor: item.color + '20',
              },
            ]}>
            <Text style={[styles.iconText, {color: item.color}]}>
              {item.icon}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
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

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handlePageChange}
        style={styles.scrollView}>
        {onboardingData.map((item, index) => renderPage(item, index))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {renderPageIndicator()}
        
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: onboardingData[currentPage].color,
            },
          ]}
          onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    width,
    height: height - 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  iconContainer: {
    marginBottom: SPACING.xxl,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSection: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },
});

export default OnboardingScreen; 