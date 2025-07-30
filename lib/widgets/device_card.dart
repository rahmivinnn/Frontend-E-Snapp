import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:e_snapp_mobile/models/device.dart';
import 'package:e_snapp_mobile/utils/constants.dart';

class DeviceCard extends StatelessWidget {
  final Device device;

  const DeviceCard({
    super.key,
    required this.device,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border),
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
          // Device Icon
          Container(
            width: 48.w,
            height: 48.w,
            decoration: BoxDecoration(
              color: _getDeviceColor().withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              _getDeviceIcon(),
              size: 24.w,
              color: _getDeviceColor(),
            ),
          ),
          SizedBox(width: 12.w),
          
          // Device Info
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  device.name,
                  style: TextStyle(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  device.type,
                  style: TextStyle(
                    fontSize: 14.sp,
                    color: AppColors.textSecondary,
                  ),
                ),
                if (device.location != null) ...[
                  SizedBox(height: 4.h),
                  Text(
                    device.location!,
                    style: TextStyle(
                      fontSize: 12.sp,
                      color: AppColors.textTertiary,
                    ),
                  ),
                ],
              ],
            ),
          ),
          
          // Status Indicator
          Container(
            width: 12.w,
            height: 12.w,
            decoration: BoxDecoration(
              color: device.isOnline ? AppColors.success : AppColors.error,
              shape: BoxShape.circle,
            ),
          ),
        ],
      ),
    );
  }

  Color _getDeviceColor() {
    switch (device.type.toLowerCase()) {
      case 'smart_meter':
        return AppColors.primary;
      case 'smart_plug':
        return AppColors.accent;
      case 'smart_switch':
        return AppColors.warning;
      case 'sensor':
        return AppColors.success;
      case 'thermostat':
        return AppColors.error;
      case 'light_bulb':
        return AppColors.secondary;
      default:
        return AppColors.primary;
    }
  }

  IconData _getDeviceIcon() {
    switch (device.type.toLowerCase()) {
      case 'smart_meter':
        return Icons.electric_bolt;
      case 'smart_plug':
        return Icons.power;
      case 'smart_switch':
        return Icons.switch_account;
      case 'sensor':
        return Icons.sensors;
      case 'thermostat':
        return Icons.thermostat;
      case 'light_bulb':
        return Icons.lightbulb;
      default:
        return Icons.devices;
    }
  }
} 