import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';
import {useEnergy} from '../context/EnergyContext';

const RealtimeScreen = () => {
  const {currentEnergyData, devices, isLoading} = useEnergy();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Real-time Energy</Text>
      <Text style={styles.subtitle}>Live monitoring of your energy consumption</Text>
      {isRefreshing && (
        <View style={styles.refreshIndicator}>
          <Text style={styles.refreshText}>🔄 Updating...</Text>
        </View>
      )}
    </View>
  );

  const renderCurrentUsage = () => (
    <View style={styles.currentUsageContainer}>
      <View style={styles.currentUsageCard}>
        <Text style={styles.currentUsageIcon}>⚡</Text>
        <Text style={styles.currentUsageValue}>
          {currentEnergyData?.consumption?.toFixed(2) || '0.00'} kW
        </Text>
        <Text style={styles.currentUsageLabel}>Current Power</Text>
      </View>
      <View style={styles.currentUsageCard}>
        <Text style={styles.currentUsageIcon}>💰</Text>
        <Text style={styles.currentUsageValue}>
          ${currentEnergyData?.cost?.toFixed(2) || '0.00'}
        </Text>
        <Text style={styles.currentUsageLabel}>Cost Today</Text>
      </View>
    </View>
  );

  const renderChartPlaceholder = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartIcon}>📈</Text>
        <Text style={styles.chartTitle}>Real-time Energy Chart</Text>
        <Text style={styles.chartSubtitle}>
          Live energy consumption graph will be displayed here
        </Text>
      </View>
    </View>
  );

  const renderDeviceStatus = () => (
    <View style={styles.deviceStatusContainer}>
      <Text style={styles.sectionTitle}>Device Status</Text>
      <View style={styles.deviceStatusGrid}>
        {devices.length === 0 ? (
          <View style={styles.emptyDevices}>
            <Text style={styles.emptyIcon}>📱</Text>
            <Text style={styles.emptyTitle}>No devices connected</Text>
            <Text style={styles.emptySubtitle}>
              Add devices to monitor their real-time status
            </Text>
          </View>
        ) : (
          devices.map(device => (
            <View key={device.id} style={styles.deviceStatusCard}>
              <View style={styles.deviceStatusHeader}>
                <Text style={styles.deviceStatusIcon}>
                  {device.type === 'smart_meter' ? '📊' : '🔌'}
                </Text>
                <View
                  style={[
                    styles.statusIndicator,
                    {backgroundColor: device.isOnline ? COLORS.success : COLORS.error},
                  ]}
                />
              </View>
              <Text style={styles.deviceStatusName}>{device.name}</Text>
              <Text style={styles.deviceStatusType}>{device.type}</Text>
              <Text
                style={[
                  styles.deviceStatusText,
                  {color: device.isOnline ? COLORS.success : COLORS.error},
                ]}>
                {device.isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.alertsContainer}>
      <Text style={styles.sectionTitle}>Recent Alerts</Text>
      <View style={styles.alertCard}>
        <View style={styles.alertItem}>
          <View style={[styles.alertIcon, {backgroundColor: COLORS.warning + '20'}]}>
            <Text style={styles.alertIconText}>⚠️</Text>
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>High energy usage detected</Text>
            <Text style={styles.alertSubtitle}>
              Kitchen appliances are using more power than usual
            </Text>
            <Text style={styles.alertTime}>2 minutes ago</Text>
          </View>
        </View>
        <View style={styles.alertDivider} />
        <View style={styles.alertItem}>
          <View style={[styles.alertIcon, {backgroundColor: COLORS.success + '20'}]}>
            <Text style={styles.alertIconText}>✅</Text>
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Device reconnected</Text>
            <Text style={styles.alertSubtitle}>
              Smart plug in living room is back online
            </Text>
            <Text style={styles.alertTime}>5 minutes ago</Text>
          </View>
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
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderCurrentUsage()}
        {renderChartPlaceholder()}
        {renderDeviceStatus()}
        {renderAlerts()}
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
  refreshIndicator: {
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  currentUsageContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  currentUsageCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginHorizontal: SPACING.xs,
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
  currentUsageIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  currentUsageValue: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  currentUsageLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  chartContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  chartPlaceholder: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  chartSubtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  deviceStatusContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  deviceStatusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDevices: {
    width: '100%',
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
  deviceStatusCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    marginHorizontal: '1%',
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
  deviceStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  deviceStatusIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  deviceStatusName: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  deviceStatusType: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  deviceStatusText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  alertsContainer: {
    paddingHorizontal: SPACING.xl,
  },
  alertCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  alertIconText: {
    fontSize: 20,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  alertSubtitle: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  alertTime: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textTertiary,
  },
  alertDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
});

export default RealtimeScreen; 