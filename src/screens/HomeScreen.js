import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';
import {useAuth} from '../context/AuthContext';
import {useEnergy} from '../context/EnergyContext';
import EnergyCard from '../components/EnergyCard';
import DeviceCard from '../components/DeviceCard';
import QuickActionCard from '../components/QuickActionCard';

const HomeScreen = ({navigation}) => {
  const {user} = useAuth();
  const {
    currentEnergyData,
    devices,
    isLoading,
    fetchEnergyData,
    fetchDevices,
  } = useEnergy();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([fetchEnergyData(), fetchDevices()]);
  };

  const onRefresh = () => {
    loadData();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name || 'User'}!
          </Text>
          <Text style={styles.subtitle}>Here's your energy overview</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <Text style={styles.notificationIcon}>🔔</Text>
      </TouchableOpacity>
    </View>
  );

  const renderWelcomeCard = () => (
    <View style={styles.welcomeCard}>
      <View style={styles.welcomeContent}>
        <Text style={styles.welcomeCardTitle}>Smart Energy Management</Text>
        <Text style={styles.welcomeCardSubtitle}>
          Monitor and optimize your energy consumption
        </Text>
      </View>
      <Text style={styles.welcomeIcon}>⚡</Text>
    </View>
  );

  const renderEnergyOverview = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Energy Overview</Text>
      <View style={styles.energyCards}>
        <EnergyCard
          title="Current Usage"
          value={`${currentEnergyData?.consumption?.toFixed(1) || '0.0'} kWh`}
          icon="⚡"
          color={COLORS.primary}
        />
        <EnergyCard
          title="Cost Today"
          value={`$${currentEnergyData?.cost?.toFixed(2) || '0.00'}`}
          icon="💰"
          color={COLORS.success}
        />
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <QuickActionCard
          title="Upload Bill"
          icon="📄"
          color={COLORS.primary}
          onPress={() => navigation.navigate('UploadBill')}
        />
        <QuickActionCard
          title="Add Device"
          icon="📱"
          color={COLORS.accent}
          onPress={() => navigation.navigate('DeviceSetup')}
        />
        <QuickActionCard
          title="Better Tariffs"
          icon="💰"
          color={COLORS.success}
          onPress={() => navigation.navigate('BetterTariffs')}
        />
        <QuickActionCard
          title="Energy Report"
          icon="📊"
          color={COLORS.warning}
          onPress={() => navigation.navigate('EnergyReport')}
        />
      </View>
    </View>
  );

  const renderDevices = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Devices</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Devices')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      {devices.length === 0 ? (
        <View style={styles.emptyDevices}>
          <Text style={styles.emptyIcon}>📱</Text>
          <Text style={styles.emptyTitle}>No devices connected</Text>
          <Text style={styles.emptySubtitle}>
            Add your first smart device to start monitoring
          </Text>
        </View>
      ) : (
        devices.slice(0, 3).map(device => (
          <DeviceCard key={device.id} device={device} />
        ))
      )}
    </View>
  );

  const renderRecentActivity = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityCard}>
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, {backgroundColor: COLORS.warning + '20'}]}>
            <Text style={styles.activityIconText}>⚡</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>High energy usage detected</Text>
            <Text style={styles.activitySubtitle}>
              Kitchen appliances are using more power than usual
            </Text>
          </View>
          <Text style={styles.activityTime}>2h ago</Text>
        </View>
        <View style={styles.activityDivider} />
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, {backgroundColor: COLORS.success + '20'}]}>
            <Text style={styles.activityIconText}>💰</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>New tariff available</Text>
            <Text style={styles.activitySubtitle}>Save 15% on your monthly bill</Text>
          </View>
          <Text style={styles.activityTime}>1d ago</Text>
        </View>
        <View style={styles.activityDivider} />
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, {backgroundColor: COLORS.primary + '20'}]}>
            <Text style={styles.activityIconText}>📱</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Device connected</Text>
            <Text style={styles.activitySubtitle}>Smart plug added to living room</Text>
          </View>
          <Text style={styles.activityTime}>2d ago</Text>
        </View>
      </View>
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
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderWelcomeCard()}
        {renderEnergyOverview()}
        {renderQuickActions()}
        {renderDevices()}
        {renderRecentActivity()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  notificationButton: {
    padding: SPACING.sm,
  },
  notificationIcon: {
    fontSize: 24,
  },
  welcomeCard: {
    margin: SPACING.xl,
    padding: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeCardTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  welcomeCardSubtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    opacity: 0.9,
  },
  welcomeIcon: {
    fontSize: 48,
  },
  section: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  energyCards: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  emptyDevices: {
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  activityIconText: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  activitySubtitle: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textTertiary,
  },
  activityDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
});

export default HomeScreen; 