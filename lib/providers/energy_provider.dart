import 'package:flutter/material.dart';
import 'package:e_snapp_mobile/models/energy_data.dart';
import 'package:e_snapp_mobile/models/device.dart';
import 'package:e_snapp_mobile/services/api_service.dart';

class EnergyProvider extends ChangeNotifier {
  final ApiService _apiService = ApiService();
  
  List<EnergyData> _energyData = [];
  List<Device> _devices = [];
  EnergyData? _currentEnergyData;
  bool _isLoading = false;
  String? _error;

  List<EnergyData> get energyData => _energyData;
  List<Device> get devices => _devices;
  EnergyData? get currentEnergyData => _currentEnergyData;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchEnergyData() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final data = await _apiService.getEnergyData();
      _energyData = data;
      if (data.isNotEmpty) {
        _currentEnergyData = data.last;
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchDevices() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final devices = await _apiService.getDevices();
      _devices = devices;
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> addDevice(Device device) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final success = await _apiService.addDevice(device);
      if (success) {
        await fetchDevices();
        return true;
      } else {
        _error = 'Failed to add device';
        return false;
      }
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> updateDevice(Device device) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final success = await _apiService.updateDevice(device);
      if (success) {
        await fetchDevices();
        return true;
      } else {
        _error = 'Failed to update device';
        return false;
      }
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> deleteDevice(String deviceId) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final success = await _apiService.deleteDevice(deviceId);
      if (success) {
        await fetchDevices();
        return true;
      } else {
        _error = 'Failed to delete device';
        return false;
      }
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> uploadBill(String filePath) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final success = await _apiService.uploadBill(filePath);
      if (success) {
        await fetchEnergyData();
        return true;
      } else {
        _error = 'Failed to upload bill';
        return false;
      }
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<List<EnergyTariff>> getBetterTariffs() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final tariffs = await _apiService.getBetterTariffs();
      return tariffs;
    } catch (e) {
      _error = e.toString();
      return [];
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }

  void addEnergyData(EnergyData data) {
    _energyData.add(data);
    _currentEnergyData = data;
    notifyListeners();
  }

  void updateDeviceStatus(String deviceId, bool isOnline) {
    final deviceIndex = _devices.indexWhere((device) => device.id == deviceId);
    if (deviceIndex != -1) {
      _devices[deviceIndex] = _devices[deviceIndex].copyWith(isOnline: isOnline);
      notifyListeners();
    }
  }
} 