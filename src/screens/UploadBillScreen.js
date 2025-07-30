import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import {COLORS, FONTS, SIZES, SPACING} from '../constants';
import {useEnergy} from '../context/EnergyContext';
import CustomButton from '../components/CustomButton';

const UploadBillScreen = ({navigation}) => {
  const {uploadBill, isLoading} = useEnergy();
  const [selectedFile, setSelectedFile] = useState(null);
  const [billAmount, setBillAmount] = useState('');
  const [billPeriod, setBillPeriod] = useState('');
  const [billProvider, setBillProvider] = useState('');

  const handleSelectFile = () => {
    // In a real app, this would open file picker
    Alert.alert(
      'Select File',
      'Choose a PDF or image file of your energy bill',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Select',
          onPress: () => {
            // Simulate file selection
            setSelectedFile({
              name: 'energy_bill.pdf',
              size: '2.5 MB',
              type: 'application/pdf',
            });
          },
        },
      ]
    );
  };

  const handleUploadBill = async () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a bill file');
      return;
    }

    if (!billAmount.trim()) {
      Alert.alert('Error', 'Please enter the bill amount');
      return;
    }

    if (!billPeriod.trim()) {
      Alert.alert('Error', 'Please enter the bill period');
      return;
    }

    const billData = {
      file: selectedFile,
      amount: parseFloat(billAmount),
      period: billPeriod.trim(),
      provider: billProvider.trim() || 'Unknown',
    };

    const success = await uploadBill(billData);
    if (success) {
      Alert.alert(
        'Success',
        'Bill uploaded successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
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
      <Text style={styles.title}>Upload Energy Bill</Text>
      <Text style={styles.subtitle}>
        Upload your energy bill to track consumption and costs
      </Text>
    </View>
  );

  const renderFileUpload = () => (
    <View style={styles.fileUploadContainer}>
      <Text style={styles.sectionTitle}>Upload Bill</Text>
      <TouchableOpacity
        style={[styles.uploadArea, selectedFile && styles.uploadAreaSelected]}
        onPress={handleSelectFile}>
        {selectedFile ? (
          <View style={styles.selectedFile}>
            <Text style={styles.fileIcon}>📄</Text>
            <Text style={styles.fileName}>{selectedFile.name}</Text>
            <Text style={styles.fileSize}>{selectedFile.size}</Text>
            <TouchableOpacity
              style={styles.removeFileButton}
              onPress={() => setSelectedFile(null)}>
              <Text style={styles.removeFileText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Text style={styles.uploadIcon}>📤</Text>
            <Text style={styles.uploadTitle}>Select Bill File</Text>
            <Text style={styles.uploadSubtitle}>
              Choose a PDF or image file of your energy bill
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderBillDetails = () => (
    <View style={styles.billDetailsContainer}>
      <Text style={styles.sectionTitle}>Bill Details</Text>
      <View style={styles.billDetailsCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bill Amount *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter bill amount"
            value={billAmount}
            onChangeText={setBillAmount}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bill Period *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., January 2024"
            value={billPeriod}
            onChangeText={setBillPeriod}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Energy Provider (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., PLN, Energy Company"
            value={billProvider}
            onChangeText={setBillProvider}
          />
        </View>
      </View>
    </View>
  );

  const renderInstructions = () => (
    <View style={styles.instructionsContainer}>
      <Text style={styles.sectionTitle}>Upload Instructions</Text>
      <View style={styles.instructionsCard}>
        <View style={styles.instructionItem}>
          <Text style={styles.instructionIcon}>📱</Text>
          <Text style={styles.instructionText}>
            Take a photo of your bill or upload a PDF file
          </Text>
        </View>
        <View style={styles.instructionItem}>
          <Text style={styles.instructionIcon}>📊</Text>
          <Text style={styles.instructionText}>
            We'll analyze your bill to track consumption patterns
          </Text>
        </View>
        <View style={styles.instructionItem}>
          <Text style={styles.instructionIcon}>💰</Text>
          <Text style={styles.instructionText}>
            Get insights on how to reduce your energy costs
          </Text>
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
        {renderFileUpload()}
        {renderBillDetails()}
        {renderInstructions()}
        
        <View style={styles.buttonContainer}>
          <CustomButton
            title={isLoading ? 'Uploading...' : 'Upload Bill'}
            onPress={handleUploadBill}
            disabled={isLoading}
          />
        </View>
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
  fileUploadContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: SPACING.xl,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  uploadAreaSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  uploadTitle: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  uploadSubtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  selectedFile: {
    alignItems: 'center',
  },
  fileIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  fileName: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  fileSize: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  removeFileButton: {
    backgroundColor: COLORS.error + '20',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  removeFileText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.error,
  },
  billDetailsContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  billDetailsCard: {
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
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: SPACING.lg,
    fontSize: 16,
    fontFamily: FONTS.regular,
    backgroundColor: COLORS.background,
  },
  instructionsContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  instructionsCard: {
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
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  instructionIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.xl,
  },
});

export default UploadBillScreen; 