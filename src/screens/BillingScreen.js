import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';

const BillingScreen = ({navigation}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const periods = [
    {key: 'current', label: 'Current Month'},
    {key: 'previous', label: 'Previous Month'},
    {key: 'history', label: 'History'},
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Billing & Payments</Text>
      <Text style={styles.subtitle}>Manage your energy bills and payments</Text>
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

  const renderCurrentBill = () => (
    <View style={styles.currentBillContainer}>
      <Text style={styles.sectionTitle}>Current Bill</Text>
      <View style={styles.currentBillCard}>
        <View style={styles.billHeader}>
          <Text style={styles.billAmount}>$125.50</Text>
          <View style={styles.billStatus}>
            <Text style={styles.billStatusText}>Due in 5 days</Text>
          </View>
        </View>
        <View style={styles.billDetails}>
          <View style={styles.billDetailItem}>
            <Text style={styles.billDetailLabel}>Energy Usage</Text>
            <Text style={styles.billDetailValue}>450 kWh</Text>
          </View>
          <View style={styles.billDetailItem}>
            <Text style={styles.billDetailLabel}>Rate</Text>
            <Text style={styles.billDetailValue}>$0.12/kWh</Text>
          </View>
          <View style={styles.billDetailItem}>
            <Text style={styles.billDetailLabel}>Service Fee</Text>
            <Text style={styles.billDetailValue}>$15.00</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.quickActionCard}>
          <Text style={styles.quickActionIcon}>📄</Text>
          <Text style={styles.quickActionTitle}>Upload Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionCard}>
          <Text style={styles.quickActionIcon}>💰</Text>
          <Text style={styles.quickActionTitle}>Payment History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionCard}>
          <Text style={styles.quickActionIcon}>📊</Text>
          <Text style={styles.quickActionTitle}>Usage Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionCard}>
          <Text style={styles.quickActionIcon}>⚙️</Text>
          <Text style={styles.quickActionTitle}>Billing Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPaymentHistory = () => (
    <View style={styles.paymentHistoryContainer}>
      <Text style={styles.sectionTitle}>Payment History</Text>
      <View style={styles.paymentHistoryCard}>
        <View style={styles.paymentItem}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentMonth}>December 2023</Text>
            <Text style={styles.paymentDate}>Paid on Dec 15, 2023</Text>
          </View>
          <View style={styles.paymentAmount}>
            <Text style={styles.paymentAmountText}>$118.75</Text>
            <Text style={styles.paymentStatus}>Paid</Text>
          </View>
        </View>
        <View style={styles.paymentDivider} />
        <View style={styles.paymentItem}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentMonth}>November 2023</Text>
            <Text style={styles.paymentDate}>Paid on Nov 15, 2023</Text>
          </View>
          <View style={styles.paymentAmount}>
            <Text style={styles.paymentAmountText}>$142.30</Text>
            <Text style={styles.paymentStatus}>Paid</Text>
          </View>
        </View>
        <View style={styles.paymentDivider} />
        <View style={styles.paymentItem}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentMonth}>October 2023</Text>
            <Text style={styles.paymentDate}>Paid on Oct 15, 2023</Text>
          </View>
          <View style={styles.paymentAmount}>
            <Text style={styles.paymentAmountText}>$98.45</Text>
            <Text style={styles.paymentStatus}>Paid</Text>
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
        {renderCurrentBill()}
        {renderQuickActions()}
        {renderPaymentHistory()}
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
  currentBillContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  currentBillCard: {
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
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  billAmount: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  billStatus: {
    backgroundColor: COLORS.warning + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  billStatusText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.warning,
  },
  billDetails: {
    marginBottom: SPACING.lg,
  },
  billDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  billDetailLabel: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  billDetailValue: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
  },
  quickActionsContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickActionCard: {
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
  quickActionIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  quickActionTitle: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  paymentHistoryContainer: {
    paddingHorizontal: SPACING.xl,
  },
  paymentHistoryCard: {
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
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMonth: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  paymentDate: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  paymentAmountText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  paymentStatus: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.success,
  },
  paymentDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
});

export default BillingScreen; 