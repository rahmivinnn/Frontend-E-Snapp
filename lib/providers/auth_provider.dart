import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:e_snapp_mobile/models/user.dart';
import 'package:e_snapp_mobile/services/api_service.dart';

class AuthProvider extends ChangeNotifier {
  final ApiService _apiService = ApiService();
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();
  
  User? _user;
  bool _isLoading = false;
  bool _isAuthenticated = false;
  String? _token;
  String? _error;

  User? get user => _user;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _isAuthenticated;
  String? get token => _token;
  String? get error => _error;

  AuthProvider() {
    _initializeAuth();
  }

  Future<void> _initializeAuth() async {
    _isLoading = true;
    notifyListeners();

    try {
      // Check if token exists
      final token = await _secureStorage.read(key: 'auth_token');
      if (token != null) {
        _token = token;
        // Verify token with server
        final user = await _apiService.getCurrentUser();
        if (user != null) {
          _user = user;
          _isAuthenticated = true;
        } else {
          await logout();
        }
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.login(email, password);
      if (response['success']) {
        _token = response['token'];
        _user = User.fromJson(response['user']);
        _isAuthenticated = true;
        
        // Store token securely
        await _secureStorage.write(key: 'auth_token', value: _token);
        
        // Store user data
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('user_data', response['user'].toString());
        
        return true;
      } else {
        _error = response['message'] ?? 'Login failed';
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

  Future<bool> register(String name, String email, String password, String confirmPassword) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      if (password != confirmPassword) {
        _error = 'Passwords do not match';
        return false;
      }

      final response = await _apiService.register(name, email, password);
      if (response['success']) {
        _token = response['token'];
        _user = User.fromJson(response['user']);
        _isAuthenticated = true;
        
        // Store token securely
        await _secureStorage.write(key: 'auth_token', value: _token);
        
        // Store user data
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('user_data', response['user'].toString());
        
        return true;
      } else {
        _error = response['message'] ?? 'Registration failed';
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

  Future<bool> forgotPassword(String email) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.forgotPassword(email);
      if (response['success']) {
        return true;
      } else {
        _error = response['message'] ?? 'Failed to send reset email';
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

  Future<bool> resetPassword(String token, String newPassword) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.resetPassword(token, newPassword);
      if (response['success']) {
        return true;
      } else {
        _error = response['message'] ?? 'Password reset failed';
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

  Future<bool> verifyEmail(String code) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _apiService.verifyEmail(code);
      if (response['success']) {
        if (_user != null) {
          _user = _user!.copyWith(isEmailVerified: true);
        }
        return true;
      } else {
        _error = response['message'] ?? 'Email verification failed';
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

  Future<void> logout() async {
    _isLoading = true;
    notifyListeners();

    try {
      // Clear secure storage
      await _secureStorage.delete(key: 'auth_token');
      
      // Clear shared preferences
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('user_data');
      
      // Reset state
      _user = null;
      _token = null;
      _isAuthenticated = false;
      _error = null;
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }

  Future<void> updateUser(User user) async {
    _user = user;
    notifyListeners();
  }
} 