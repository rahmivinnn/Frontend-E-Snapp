import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING, TIME_PERIODS} from '../constants';
import {useEnergy} from '../context/EnergyContext';

const TrendsScreen = () => {
  const {energyData, isLoading} = useEnergy();
  const [selectedPeriod, setSelectedPeriod] = useState(TIME_PERIODS.week);

  const periods = [
    {key: TIME_PERIODS.day, label: 'Day'},
    {key: TIME_PERIODS.week, label: 'Week'},
    {key: TIME_PERIODS.month, label: 'Month'},
    {key: TIME_PERIODS.year, label: 'Year'},
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Energy Trends</Text>
      <Text style={styles.subtitle}>Monitor your energy consumption patterns</Text>
    </View>
  );

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {periods.map(period => (
        <TouchableOpacity
          key={period.key}
          style={[
            styles.periodButton,
            selectedPeriod === period.key && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(period.key)}>
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === period.key && styles.periodButtonTextActive,
            ]}>
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderChartPlaceholder = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartIcon}>📊</Text>
        <Text style={styles.chartTitle}>Energy Consumption Chart</Text>
        <Text style={styles.chartSubtitle}>
          Chart will be displayed here for {selectedPeriod} period
        </Text>
      </View>
    </View>
  );

  const renderStatsCards = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>⚡</Text>
          <Text style={styles.statValue}>12.5 kWh</Text>
          <Text style={styles.statLabel}>Total Usage</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>💰</Text>
          <Text style={styles.statValue}>$45.20</Text>
          <Text style={styles.statLabel}>Total Cost</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📈</Text>
          <Text style={styles.statValue}>+8.5%</Text>
          <Text style={styles.statLabel}>vs Last Period</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🌱</Text>
          <Text style={styles.statValue}>2.3 kg</Text>
          <Text style={styles.statLabel}>CO2 Saved</Text>
        </View>
      </View>
    </View>
  );

  const renderUsageBreakdown = () => (
    <View style={styles.breakdownContainer}>
      <Text style={styles.sectionTitle}>Usage Breakdown</Text>
      <View style={styles.breakdownCard}>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownIconContainer}>
            <Text style={styles.breakdownIcon}>🏠</Text>
          </View>
          <View style={styles.breakdownContent}>
            <Text style={styles.breakdownTitle}>Living Room</Text>
            <Text style={styles.breakdownSubtitle}>4.2 kWh (33.6%)</Text>
          </View>
          <View style={styles.breakdownBar}>
            <View style={[styles.breakdownBarFill, {width: '33.6%'}]} />
          </View>
        </View>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownIconContainer}>
            <Text style={styles.breakdownIcon}>🍳</Text>
          </View>
          <View style={styles.breakdownContent}>
            <Text style={styles.breakdownTitle}>Kitchen</Text>
            <Text style={styles.breakdownSubtitle}>3.8 kWh (30.4%)</Text>
          </View>
          <View style={styles.breakdownBar}>
            <View style={[styles.breakdownBarFill, {width: '30.4%'}]} />
          </View>
        </View>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownIconContainer}>
            <Text style={styles.breakdownIcon}>🛏️</Text>
          </View>
          <View style={styles.breakdownContent}>
            <Text style={styles.breakdownTitle}>Bedroom</Text>
            <Text style={styles.breakdownSubtitle}>2.1 kWh (16.8%)</Text>
          </View>
          <View style={styles.breakdownBar}>
            <View style={[styles.breakdownBarFill, {width: '16.8%'}]} />
          </View>
        </View>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownIconContainer}>
            <Text style={styles.breakdownIcon}>🚿</Text>
          </View>
          <View style={styles.breakdownContent}>
            <Text style={styles.breakdownTitle}>Bathroom</Text>
            <Text style={styles.breakdownSubtitle}>1.4 kWh (11.2%)</Text>
          </View>
          <View style={styles.breakdownBar}>
            <View style={[styles.breakdownBarFill, {width: '11.2%'}]} />
          </View>
        </View>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownIconContainer}>
            <Text style={styles.breakdownIcon}>🔧</Text>
          </View>
          <View style={styles.breakdownContent}>
            <Text style={styles.breakdownTitle}>Other</Text>
            <Text style={styles.breakdownSubtitle}>1.0 kWh (8%)</Text>
          </View>
          <View style={styles.breakdownBar}>
            <View style={[styles.breakdownBarFill, {width: '8%'}]} />
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
        {renderPeriodSelector()}
        {renderChartPlaceholder()}
        {renderStatsCards()}
        {renderUsageBreakdown()}
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
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  periodButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginHorizontal: SPACING.xs,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
  },
  periodButtonTextActive: {
    color: COLORS.white,
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
  statsContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  statCard: {
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
  statIcon: {
    fontSize: 24,
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  breakdownContainer: {
    paddingHorizontal: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  breakdownCard: {
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
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  breakdownIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  breakdownIcon: {
    fontSize: 20,
  },
  breakdownContent: {
    flex: 1,
  },
  breakdownTitle: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  breakdownSubtitle: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  breakdownBar: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  breakdownBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});

export default TrendsScreen; 