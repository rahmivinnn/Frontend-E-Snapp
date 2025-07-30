import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:e_snapp_mobile/providers/auth_provider.dart';
import 'package:e_snapp_mobile/providers/energy_provider.dart';
import 'package:e_snapp_mobile/utils/constants.dart';
import 'package:e_snapp_mobile/widgets/bottom_navigation.dart';
import 'package:e_snapp_mobile/widgets/energy_card.dart';
import 'package:e_snapp_mobile/widgets/device_card.dart';
import 'package:e_snapp_mobile/widgets/quick_action_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final energyProvider = Provider.of<EnergyProvider>(context, listen: false);
    await energyProvider.fetchEnergyData();
    await energyProvider.fetchDevices();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            // App Bar
            _buildAppBar(),
            
            // Content
            Expanded(
              child: RefreshIndicator(
                onRefresh: _loadData,
                child: SingleChildScrollView(
                  padding: EdgeInsets.all(16.w),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Welcome Section
                      _buildWelcomeSection(),
                      SizedBox(height: 24.h),
                      
                      // Energy Overview
                      _buildEnergyOverview(),
                      SizedBox(height: 24.h),
                      
                      // Quick Actions
                      _buildQuickActions(),
                      SizedBox(height: 24.h),
                      
                      // Devices Section
                      _buildDevicesSection(),
                      SizedBox(height: 24.h),
                      
                      // Recent Activity
                      _buildRecentActivity(),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const BottomNavigation(),
    );
  }

  Widget _buildAppBar() {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          // Profile Avatar
          Consumer<AuthProvider>(
            builder: (context, authProvider, child) {
              return CircleAvatar(
                radius: 20.w,
                backgroundColor: AppColors.primary.withOpacity(0.1),
                child: Text(
                  authProvider.user?.name.substring(0, 1).toUpperCase() ?? 'U',
                  style: TextStyle(
                    fontSize: 18.sp,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
              );
            },
          ),
          SizedBox(width: 12.w),
          
          // Welcome Text
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Consumer<AuthProvider>(
                  builder: (context, authProvider, child) {
                    return Text(
                      'Welcome back, ${authProvider.user?.name ?? 'User'}!',
                      style: TextStyle(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textPrimary,
                      ),
                    );
                  },
                ),
                Text(
                  'Here\'s your energy overview',
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
          
          // Notifications
          IconButton(
            onPressed: () {
              // TODO: Navigate to notifications
            },
            icon: Icon(
              Icons.notifications_outlined,
              size: 24.w,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildWelcomeSection() {
    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.primary, AppColors.primary.withOpacity(0.8)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Smart Energy Management',
                  style: TextStyle(
                    fontSize: 18.sp,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                SizedBox(height: 8.h),
                Text(
                  'Monitor and optimize your energy consumption',
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: Colors.white.withOpacity(0.9),
                  ),
                ),
              ],
            ),
          ),
          Icon(
            Icons.flash_on,
            size: 48.w,
            color: Colors.white,
          ),
        ],
      ),
    );
  }

  Widget _buildEnergyOverview() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Energy Overview',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        SizedBox(height: 16.h),
        Consumer<EnergyProvider>(
          builder: (context, energyProvider, child) {
            if (energyProvider.isLoading) {
              return const Center(child: CircularProgressIndicator());
            }
            
            final currentData = energyProvider.currentEnergyData;
            if (currentData == null) {
              return const Center(
                child: Text('No energy data available'),
              );
            }
            
            return Row(
              children: [
                Expanded(
                  child: EnergyCard(
                    title: 'Current Usage',
                    value: '${currentData.consumption.toStringAsFixed(1)} kWh',
                    icon: Icons.electric_bolt,
                    color: AppColors.primary,
                  ),
                ),
                SizedBox(width: 12.w),
                Expanded(
                  child: EnergyCard(
                    title: 'Cost Today',
                    value: '\$${currentData.cost.toStringAsFixed(2)}',
                    icon: Icons.attach_money,
                    color: AppColors.success,
                  ),
                ),
              ],
            );
          },
        ),
      ],
    );
  }

  Widget _buildQuickActions() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Quick Actions',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        SizedBox(height: 16.h),
        Row(
          children: [
            Expanded(
              child: QuickActionCard(
                title: 'Upload Bill',
                icon: Icons.upload_file,
                color: AppColors.primary,
                onTap: () {
                  // TODO: Navigate to upload bill screen
                },
              ),
            ),
            SizedBox(width: 12.w),
            Expanded(
              child: QuickActionCard(
                title: 'Add Device',
                icon: Icons.add_circle_outline,
                color: AppColors.accent,
                onTap: () {
                  // TODO: Navigate to add device screen
                },
              ),
            ),
          ],
        ),
        SizedBox(height: 12.h),
        Row(
          children: [
            Expanded(
              child: QuickActionCard(
                title: 'Better Tariffs',
                icon: Icons.savings,
                color: AppColors.success,
                onTap: () {
                  // TODO: Navigate to better tariffs screen
                },
              ),
            ),
            SizedBox(width: 12.w),
            Expanded(
              child: QuickActionCard(
                title: 'Energy Report',
                icon: Icons.analytics,
                color: AppColors.warning,
                onTap: () {
                  // TODO: Navigate to energy report screen
                },
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildDevicesSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Your Devices',
              style: TextStyle(
                fontSize: 18.sp,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
            TextButton(
              onPressed: () {
                // TODO: Navigate to devices screen
              },
              child: Text(
                'View All',
                style: TextStyle(
                  fontSize: 14.sp,
                  color: AppColors.primary,
                ),
              ),
            ),
          ],
        ),
        SizedBox(height: 16.h),
        Consumer<EnergyProvider>(
          builder: (context, energyProvider, child) {
            if (energyProvider.isLoading) {
              return const Center(child: CircularProgressIndicator());
            }
            
            final devices = energyProvider.devices;
            if (devices.isEmpty) {
              return Container(
                padding: EdgeInsets.all(20.w),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  children: [
                    Icon(
                      Icons.devices_outlined,
                      size: 48.w,
                      color: AppColors.textSecondary,
                    ),
                    SizedBox(height: 12.h),
                    Text(
                      'No devices connected',
                      style: TextStyle(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    SizedBox(height: 8.h),
                    Text(
                      'Add your first smart device to start monitoring',
                      style: TextStyle(
                        fontSize: 14.sp,
                        color: AppColors.textSecondary,
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ],
                ),
              );
            }
            
            return Column(
              children: devices.take(3).map((device) => DeviceCard(device: device)).toList(),
            );
          },
        ),
      ],
    );
  }

  Widget _buildRecentActivity() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Recent Activity',
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        SizedBox(height: 16.h),
        Container(
          padding: EdgeInsets.all(16.w),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            children: [
              _buildActivityItem(
                icon: Icons.electric_bolt,
                title: 'High energy usage detected',
                subtitle: 'Kitchen appliances are using more power than usual',
                time: '2 hours ago',
                color: AppColors.warning,
              ),
              Divider(color: AppColors.border),
              _buildActivityItem(
                icon: Icons.savings,
                title: 'New tariff available',
                subtitle: 'Save 15% on your monthly bill',
                time: '1 day ago',
                color: AppColors.success,
              ),
              Divider(color: AppColors.border),
              _buildActivityItem(
                icon: Icons.devices,
                title: 'Device connected',
                subtitle: 'Smart plug added to living room',
                time: '2 days ago',
                color: AppColors.primary,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildActivityItem({
    required IconData icon,
    required String title,
    required String subtitle,
    required String time,
    required Color color,
  }) {
    return Row(
      children: [
        Container(
          width: 40.w,
          height: 40.w,
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(
            icon,
            size: 20.w,
            color: color,
          ),
        ),
        SizedBox(width: 12.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              SizedBox(height: 4.h),
              Text(
                subtitle,
                style: TextStyle(
                  fontSize: 12.sp,
                  color: AppColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
        Text(
          time,
          style: TextStyle(
            fontSize: 12.sp,
            color: AppColors.textTertiary,
          ),
        ),
      ],
    );
  }
} 