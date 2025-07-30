import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';
import {useAuth} from '../context/AuthContext';

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useAuth();

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
          onPress: logout,
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
          <View style={styles.verificationStatus}>
            <Text style={styles.verificationIcon}>
              {user?.isEmailVerified ? '✅' : '⚠️'}
            </Text>
            <Text style={styles.verificationText}>
              {user?.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMenuSection = (title, items) => (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.menuCard}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index === items.length - 1 && styles.menuItemLast,
            ]}
            onPress={item.onPress}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
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
        onPress: () => navigation.navigate('EditProfile'),
      },
      {
        icon: '🔐',
        title: 'Change Password',
        onPress: () => navigation.navigate('ChangePassword'),
      },
      {
        icon: '📧',
        title: 'Email Settings',
        onPress: () => navigation.navigate('EmailSettings'),
      },
      {
        icon: '🔔',
        title: 'Notifications',
        onPress: () => navigation.navigate('Notifications'),
      },
    ];

    return renderMenuSection('Account', accountItems);
  };

  const renderAppSection = () => {
    const appItems = [
      {
        icon: '⚙️',
        title: 'App Settings',
        onPress: () => navigation.navigate('AppSettings'),
      },
      {
        icon: '🌙',
        title: 'Dark Mode',
        onPress: () => navigation.navigate('DarkMode'),
      },
      {
        icon: '🌍',
        title: 'Language',
        onPress: () => navigation.navigate('Language'),
      },
      {
        icon: '📱',
        title: 'Device Management',
        onPress: () => navigation.navigate('DeviceManagement'),
      },
    ];

    return renderMenuSection('App', appItems);
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

    return renderMenuSection('Support', supportItems);
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationIcon: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  verificationText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
  },
  menuSection: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  menuCard: {
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
  },
  menuArrow: {
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

export default ProfileScreen; 