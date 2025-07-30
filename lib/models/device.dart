import 'package:json_annotation/json_annotation.dart';

part 'device.g.dart';

@JsonSerializable()
class Device {
  final String id;
  final String name;
  final String type;
  final bool isOnline;
  final String? location;
  final Map<String, dynamic>? settings;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Device({
    required this.id,
    required this.name,
    required this.type,
    required this.isOnline,
    this.location,
    this.settings,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Device.fromJson(Map<String, dynamic> json) => _$DeviceFromJson(json);
  Map<String, dynamic> toJson() => _$DeviceToJson(this);

  Device copyWith({
    String? id,
    String? name,
    String? type,
    bool? isOnline,
    String? location,
    Map<String, dynamic>? settings,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Device(
      id: id ?? this.id,
      name: name ?? this.name,
      type: type ?? this.type,
      isOnline: isOnline ?? this.isOnline,
      location: location ?? this.location,
      settings: settings ?? this.settings,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is Device && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'Device(id: $id, name: $name, type: $type, isOnline: $isOnline)';
  }
}

enum DeviceType {
  @JsonValue('smart_meter')
  smartMeter,
  @JsonValue('smart_plug')
  smartPlug,
  @JsonValue('smart_switch')
  smartSwitch,
  @JsonValue('sensor')
  sensor,
  @JsonValue('thermostat')
  thermostat,
  @JsonValue('light_bulb')
  lightBulb,
} 