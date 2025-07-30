import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:e_snapp_mobile/models/user.dart';
import 'package:e_snapp_mobile/models/energy_data.dart';
import 'package:e_snapp_mobile/models/device.dart';

class ApiService {
  static const String baseUrl = 'https://api.e-snapp.com'; // Replace with your API URL
  final Dio _dio = Dio();
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();

  ApiService() {
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _secureStorage.read(key: 'auth_token');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
      onError: (error, handler) {
        if (error.response?.statusCode == 401) {
          // Handle unauthorized access
          _secureStorage.delete(key: 'auth_token');
        }
        handler.next(error);
      },
    ));
  }

  // Auth endpoints
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await _dio.post(
        '$baseUrl/auth/login',
        data: {
          'email': email,
          'password': password,
        },
      );
      return response.data;
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<Map<String, dynamic>> register(String name, String email, String password) async {
    try {
      final response = await _dio.post(
        '$baseUrl/auth/register',
        data: {
          'name': name,
          'email': email,
          'password': password,
        },
      );
      return response.data;
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  Future<Map<String, dynamic>> forgotPassword(String email) async {
    try {
      final response = await _dio.post(
        '$baseUrl/auth/forgot-password',
        data: {
          'email': email,
        },
      );
      return response.data;
    } catch (e) {
      throw Exception('Forgot password failed: $e');
    }
  }

  Future<Map<String, dynamic>> resetPassword(String token, String newPassword) async {
    try {
      final response = await _dio.post(
        '$baseUrl/auth/reset-password',
        data: {
          'token': token,
          'password': newPassword,
        },
      );
      return response.data;
    } catch (e) {
      throw Exception('Password reset failed: $e');
    }
  }

  Future<Map<String, dynamic>> verifyEmail(String code) async {
    try {
      final response = await _dio.post(
        '$baseUrl/auth/verify-email',
        data: {
          'code': code,
        },
      );
      return response.data;
    } catch (e) {
      throw Exception('Email verification failed: $e');
    }
  }

  Future<User?> getCurrentUser() async {
    try {
      final response = await _dio.get('$baseUrl/auth/me');
      return User.fromJson(response.data['user']);
    } catch (e) {
      return null;
    }
  }

  // Energy data endpoints
  Future<List<EnergyData>> getEnergyData() async {
    try {
      final response = await _dio.get('$baseUrl/energy/data');
      final List<dynamic> data = response.data['data'];
      return data.map((json) => EnergyData.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to fetch energy data: $e');
    }
  }

  Future<bool> uploadBill(String filePath) async {
    try {
      final formData = FormData.fromMap({
        'bill': await MultipartFile.fromFile(filePath),
      });
      
      final response = await _dio.post(
        '$baseUrl/energy/upload-bill',
        data: formData,
      );
      
      return response.data['success'] ?? false;
    } catch (e) {
      throw Exception('Failed to upload bill: $e');
    }
  }

  Future<List<EnergyTariff>> getBetterTariffs() async {
    try {
      final response = await _dio.get('$baseUrl/energy/tariffs');
      final List<dynamic> data = response.data['tariffs'];
      return data.map((json) => EnergyTariff.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to fetch tariffs: $e');
    }
  }

  // Device endpoints
  Future<List<Device>> getDevices() async {
    try {
      final response = await _dio.get('$baseUrl/devices');
      final List<dynamic> data = response.data['devices'];
      return data.map((json) => Device.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to fetch devices: $e');
    }
  }

  Future<bool> addDevice(Device device) async {
    try {
      final response = await _dio.post(
        '$baseUrl/devices',
        data: device.toJson(),
      );
      return response.data['success'] ?? false;
    } catch (e) {
      throw Exception('Failed to add device: $e');
    }
  }

  Future<bool> updateDevice(Device device) async {
    try {
      final response = await _dio.put(
        '$baseUrl/devices/${device.id}',
        data: device.toJson(),
      );
      return response.data['success'] ?? false;
    } catch (e) {
      throw Exception('Failed to update device: $e');
    }
  }

  Future<bool> deleteDevice(String deviceId) async {
    try {
      final response = await _dio.delete('$baseUrl/devices/$deviceId');
      return response.data['success'] ?? false;
    } catch (e) {
      throw Exception('Failed to delete device: $e');
    }
  }

  // WiFi endpoints
  Future<List<Map<String, dynamic>>> scanWiFiNetworks() async {
    try {
      final response = await _dio.get('$baseUrl/wifi/scan');
      return List<Map<String, dynamic>>.from(response.data['networks']);
    } catch (e) {
      throw Exception('Failed to scan WiFi networks: $e');
    }
  }

  Future<bool> connectToWiFi(String ssid, String password) async {
    try {
      final response = await _dio.post(
        '$baseUrl/wifi/connect',
        data: {
          'ssid': ssid,
          'password': password,
        },
      );
      return response.data['success'] ?? false;
    } catch (e) {
      throw Exception('Failed to connect to WiFi: $e');
    }
  }

  // Device setup endpoints
  Future<bool> setupDevice(String deviceId, Map<String, dynamic> settings) async {
    try {
      final response = await _dio.post(
        '$baseUrl/devices/$deviceId/setup',
        data: settings,
      );
      return response.data['success'] ?? false;
    } catch (e) {
      throw Exception('Failed to setup device: $e');
    }
  }

  Future<bool> testDeviceConnection(String deviceId) async {
    try {
      final response = await _dio.get('$baseUrl/devices/$deviceId/test');
      return response.data['connected'] ?? false;
    } catch (e) {
      throw Exception('Failed to test device connection: $e');
    }
  }
} 