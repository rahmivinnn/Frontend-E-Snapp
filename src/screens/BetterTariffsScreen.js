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

const BetterTariffsScreen = ({navigation}) => {
  const {getBetterTariffs, isLoading} = useEnergy();
  const [tariffs, setTariffs] = useState([]);
  const [selectedTariff, setSelectedTariff] = useState(null);

  useEffect(() => {
    loadTariffs();
  }, []);

  const loadTariffs = async () => {
    const tariffsData = await getBetterTariffs();
    setTariffs(tariffsData);
  };

  const handleTariffSelect = (tariff) => {
    setSelectedTariff(tariff);
  };

  const handleApplyTariff = () => {
    if (selectedTariff) {
      Alert.alert(
        'Apply Tariff',
        `Are you sure you want to apply the ${selectedTariff.name} tariff?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Apply',
            onPress: () => {
              // Apply tariff logic here
              Alert.alert('Success', 'Tariff applied successfully!');
            },
          },
        ]
      );
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Better Energy Tariffs</Text>
      <Text style={styles.subtitle}>
        Find the best energy tariffs to save money on your bills
      </Text>
    </View>
  );

  const renderCurrentUsage = () => (
    <View style={styles.currentUsageContainer}>
      <Text style={styles.sectionTitle}>Your Current Usage</Text>
      <View style={styles.currentUsageCard}>
        <View style={styles.usageItem}>
          <Text style={styles.usageLabel}>Monthly Usage</Text>
          <Text style={styles.usageValue}>450 kWh</Text>
        </View>
        <View style={styles.usageItem}>
          <Text style={styles.usageLabel}>Current Rate</Text>
          <Text style={styles.usageValue}>$0.12/kWh</Text>
        </View>
        <View style={styles.usageItem}>
          <Text style={styles.usageLabel}>Monthly Cost</Text>
          <Text style={styles.usageValue}>$54.00</Text>
        </View>
      </View>
    </View>
  );

  const renderTariffs = () => (
    <View style={styles.tariffsContainer}>
      <Text style={styles.sectionTitle}>Available Tariffs</Text>
      {tariffs.length === 0 ? (
        <View style={styles.emptyTariffs}>
          <Text style={styles.emptyIcon}>💰</Text>
          <Text style={styles.emptyTitle}>No better tariffs found</Text>
          <Text style={styles.emptySubtitle}>
            We'll notify you when better tariffs become available
          </Text>
        </View>
      ) : (
        tariffs.map((tariff, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tariffCard,
              selectedTariff?.id === tariff.id && styles.tariffCardSelected,
            ]}
            onPress={() => handleTariffSelect(tariff)}>
            <View style={styles.tariffHeader}>
              <Text style={styles.tariffName}>{tariff.name}</Text>
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>Save {tariff.savings}%</Text>
              </View>
            </View>
            <Text style={styles.tariffDescription}>{tariff.description}</Text>
            <View style={styles.tariffDetails}>
              <View style={styles.tariffDetail}>
                <Text style={styles.detailLabel}>Rate</Text>
                <Text style={styles.detailValue}>{tariff.rate}</Text>
              </View>
              <View style={styles.tariffDetail}>
                <Text style={styles.detailLabel}>Monthly Cost</Text>
                <Text style={styles.detailValue}>{tariff.monthlyCost}</Text>
              </View>
              <View style={styles.tariffDetail}>
                <Text style={styles.detailLabel}>Savings</Text>
                <Text style={styles.detailValue}>{tariff.savingsAmount}</Text>
              </View>
            </View>
            <View style={styles.tariffFeatures}>
              {tariff.features.map((feature, featureIndex) => (
                <Text key={featureIndex} style={styles.featureText}>
                  • {feature}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  const renderComparison = () => {
    if (!selectedTariff) return null;

    return (
      <View style={styles.comparisonContainer}>
        <Text style={styles.sectionTitle}>Cost Comparison</Text>
        <View style={styles.comparisonCard}>
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonLabel}>Current Plan</Text>
            <Text style={styles.comparisonValue}>$54.00/month</Text>
          </View>
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonLabel}>New Plan</Text>
            <Text style={styles.comparisonValue}>{selectedTariff.monthlyCost}</Text>
          </View>
          <View style={styles.comparisonDivider} />
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonLabel}>Monthly Savings</Text>
            <Text style={[styles.comparisonValue, styles.savingsValue]}>
              {selectedTariff.savingsAmount}
            </Text>
          </View>
        </View>
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
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderCurrentUsage()}
        {renderTariffs()}
        {renderComparison()}
        
        {selectedTariff && (
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Apply Selected Tariff"
              onPress={handleApplyTariff}
              disabled={isLoading}
            />
          </View>
        )}
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
  currentUsageContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  currentUsageCard: {
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
  usageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  usageLabel: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  usageValue: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
  },
  tariffsContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  emptyTariffs: {
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
  tariffCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: COLORS.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tariffCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  tariffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tariffName: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  savingsBadge: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.success,
  },
  tariffDescription: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  tariffDetails: {
    marginBottom: SPACING.lg,
  },
  tariffDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
  },
  tariffFeatures: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  featureText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  comparisonContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  comparisonCard: {
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
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  comparisonLabel: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
  },
  comparisonValue: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
  },
  comparisonDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  savingsValue: {
    color: COLORS.success,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.xl,
  },
});

export default BetterTariffsScreen; 