import 'package:json_annotation/json_annotation.dart';

part 'energy_data.g.dart';

@JsonSerializable()
class EnergyData {
  final String id;
  final double consumption;
  final double cost;
  final DateTime timestamp;
  final String? deviceId;
  final EnergyType type;

  const EnergyData({
    required this.id,
    required this.consumption,
    required this.cost,
    required this.timestamp,
    this.deviceId,
    required this.type,
  });

  factory EnergyData.fromJson(Map<String, dynamic> json) => _$EnergyDataFromJson(json);
  Map<String, dynamic> toJson() => _$EnergyDataToJson(this);

  EnergyData copyWith({
    String? id,
    double? consumption,
    double? cost,
    DateTime? timestamp,
    String? deviceId,
    EnergyType? type,
  }) {
    return EnergyData(
      id: id ?? this.id,
      consumption: consumption ?? this.consumption,
      cost: cost ?? this.cost,
      timestamp: timestamp ?? this.timestamp,
      deviceId: deviceId ?? this.deviceId,
      type: type ?? this.type,
    );
  }
}

@JsonSerializable()
class EnergyTariff {
  final String id;
  final String name;
  final String provider;
  final double rate;
  final String description;
  final List<String> features;
  final bool isRecommended;

  const EnergyTariff({
    required this.id,
    required this.name,
    required this.provider,
    required this.rate,
    required this.description,
    required this.features,
    required this.isRecommended,
  });

  factory EnergyTariff.fromJson(Map<String, dynamic> json) => _$EnergyTariffFromJson(json);
  Map<String, dynamic> toJson() => _$EnergyTariffToJson(this);
}

enum EnergyType {
  @JsonValue('electricity')
  electricity,
  @JsonValue('gas')
  gas,
  @JsonValue('water')
  water,
  @JsonValue('solar')
  solar,
} 