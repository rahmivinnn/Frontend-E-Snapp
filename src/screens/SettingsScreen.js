import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';

const SettingsScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [dataUsage, setDataUsage] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Customize your app experience</Text>
    </View>
  );

  const renderSettingSection = (title, items) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.settingItem,
              index === items.length - 1 && styles.settingItemLast,
            ]}
            onPress={item.onPress}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>{item.icon}</Text>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                )}
              </View>
            </View>
            {item.type === 'switch' ? (
              <Switch
                value={item.value}
                onValueChange={item.onChange}
                trackColor={{false: COLORS.border, true: COLORS.primary}}
                thumbColor={COLORS.white}
              />
            ) : (
              <Text style={styles.settingArrow}>›</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAccountSection = () => {
    const accountItems = [
      {
        icon: '👤',
        title: 'Edit Profile',
        subtitle: 'Update your personal information',
        onPress: () => navigation.navigate('EditProfile'),
      },
      {
        icon: '🔐',
        title: 'Change Password',
        subtitle: 'Update your account password',
        onPress: () => navigation.navigate('ChangePassword'),
      },
      {
        icon: '📧',
        title: 'Email Settings',
        subtitle: 'Manage email preferences',
        onPress: () => navigation.navigate('EmailSettings'),
      },
    ];

    return renderSettingSection('Account', accountItems);
  };

  const renderAppSection = () => {
    const appItems = [
      {
        icon: '🔔',
        title: 'Push Notifications',
        type: 'switch',
        value: notifications,
        onChange: setNotifications,
      },
      {
        icon: '🌙',
        title: 'Dark Mode',
        type: 'switch',
        value: darkMode,
        onChange: setDarkMode,
      },
      {
        icon: '🔄',
        title: 'Auto Sync',
        subtitle: 'Automatically sync data',
        type: 'switch',
        value: autoSync,
        onChange: setAutoSync,
      },
      {
        icon: '📊',
        title: 'Data Usage',
        subtitle: 'Monitor app data usage',
        type: 'switch',
        value: dataUsage,
        onChange: setDataUsage,
      },
    ];

    return renderSettingSection('App Settings', appItems);
  };

  const renderSupportSection = () => {
    const supportItems = [
      {
        icon: '❓',
        title: 'Help & Support',
        onPress: () => navigation.navigate('HelpSupport'),
      },
      {
        icon: '📋',
        title: 'Terms of Service',
        onPress: () => navigation.navigate('TermsOfService'),
      },
      {
        icon: '🔒',
        title: 'Privacy Policy',
        onPress: () => navigation.navigate('PrivacyPolicy'),
      },
      {
        icon: '📞',
        title: 'Contact Us',
        onPress: () => navigation.navigate('ContactUs'),
      },
    ];

    return renderSettingSection('Support', supportItems);
  };

  const renderAboutSection = () => {
    const aboutItems = [
      {
        icon: 'ℹ️',
        title: 'App Version',
        subtitle: '1.0.0',
        onPress: null,
      },
      {
        icon: '📱',
        title: 'Device Info',
        subtitle: 'iPhone 12, iOS 15.0',
        onPress: () => navigation.navigate('DeviceInfo'),
      },
    ];

    return renderSettingSection('About', aboutItems);
  };

  const renderLogoutButton = () => (
    <View style={styles.logoutContainer}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

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
        {renderAccountSection()}
        {renderAppSection()}
        {renderSupportSection()}
        {renderAboutSection()}
        {renderLogoutButton()}
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
  section: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  settingArrow: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  logoutContainer: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  logoutButton: {
    backgroundColor: COLORS.error + '20',
    borderRadius: 12,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.error,
  },
});

export default SettingsScreen; 