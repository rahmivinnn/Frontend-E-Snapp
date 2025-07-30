import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SolarDiagram } from "@/components/SolarDiagram";
import { LiveUsageChart } from "@/components/LiveUsageChart";
import { RealtimeDataCard } from "@/components/RealtimeDataCard";
import { Zap, Home, Activity } from "lucide-react";

export const Realtime = () => {
  const [liveData, setLiveData] = useState({
    activePower: 245,
    reactivePower: 248,
    voltage: 230,
    powerFactor: 0.9,
    solarProduction: 1200,
    homeConsumption: 450,
    evCharging: 0,
    batteryLevel: 75,
    batteryCapacity: 10,
    gridDraw: 0
  });
  
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);
  const [comparisonData, setComparisonData] = useState({
    activePowerPrev: 280,
    reactivePowerPrev: 270
  });
  
  // Generate initial chart data
  useEffect(() => {
    const initialData = [];
    const now = new Date();
    
    for (let i = 10; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 5000);
      initialData.push({
        time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
        value: Math.floor(Math.random() * 100) + 200
      });
    }
    
    setChartData(initialData);
  }, []);

  // Update live data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate fluctuations in power usage
      const newActivePower = Math.max(200, Math.min(300, liveData.activePower + (Math.random() * 20 - 10)));
      const newReactivePower = Math.max(200, Math.min(300, liveData.reactivePower + (Math.random() * 20 - 10)));
      const newVoltage = Math.max(220, Math.min(240, liveData.voltage + (Math.random() * 2 - 1)));
      const newPowerFactor = Math.max(0.8, Math.min(1, liveData.powerFactor + (Math.random() * 0.04 - 0.02)));
      
      // Update solar and home data
      const newSolarProduction = Math.max(800, Math.min(1500, liveData.solarProduction + (Math.random() * 100 - 50)));
      const newHomeConsumption = Math.max(300, Math.min(600, liveData.homeConsumption + (Math.random() * 50 - 25)));
      const newBatteryLevel = Math.max(0, Math.min(100, liveData.batteryLevel + (Math.random() * 2 - 1)));
      
      setLiveData({
        activePower: Math.round(newActivePower),
        reactivePower: Math.round(newReactivePower),
        voltage: Math.round(newVoltage * 10) / 10,
        powerFactor: Math.round(newPowerFactor * 100) / 100,
        solarProduction: Math.round(newSolarProduction),
        homeConsumption: Math.round(newHomeConsumption),
        evCharging: liveData.evCharging,
        batteryLevel: Math.round(newBatteryLevel),
        batteryCapacity: liveData.batteryCapacity,
        gridDraw: Math.max(0, Math.round(newHomeConsumption - newSolarProduction))
      });
      
      // Update chart data
      const now = new Date();
      const newDataPoint = {
        time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
        value: Math.round(newActivePower)
      };
      
      setChartData(prevData => [...prevData.slice(1), newDataPoint]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [liveData]);

  return (
    <div className="container px-4 pb-24">
      <Header title="Live Power Usage" />
      
      {/* Current Usage Card */}
      <motion.div 
        className="mt-4 bg-white rounded-2xl p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="text-primary mr-2" size={18} />
            <h3 className="text-sm font-semibold">Live Usage</h3>
          </div>
          <span className="text-xs text-muted-foreground">Updated just now</span>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold">{liveData.activePower} W</div>
        </div>
      </motion.div>

      {/* House Visualization */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center mb-2">
          <Home className="text-primary mr-2" size={18} />
          <h3 className="text-sm font-semibold">House Visualization</h3>
        </div>
        <SolarDiagram 
          solarProduction={liveData.solarProduction}
          homeConsumption={liveData.homeConsumption}
          evCharging={liveData.evCharging}
          batteryLevel={liveData.batteryLevel}
          batteryCapacity={liveData.batteryCapacity}
          gridDraw={liveData.gridDraw}
        />
      </motion.div>
      
      {/* Usage Trend */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center mb-2">
          <Activity className="text-primary mr-2" size={18} />
          <h3 className="text-sm font-semibold">Usage Trend</h3>
        </div>
        <LiveUsageChart 
          currentUsage={liveData.activePower}
          data={chartData}
        />
      </motion.div>

      {/* Compared to Previous */}
      <motion.div 
        className="mt-4 bg-white rounded-2xl p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-sm font-semibold mb-3">Compared to Previous</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground">Active Power</div>
            <div className="text-lg font-semibold">{liveData.activePower} W</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Reactive Power</div>
            <div className="text-lg font-semibold">{liveData.reactivePower} VAR</div>
          </div>
        </div>
      </motion.div>
      
      {/* Realtime Data Grid */}
      <motion.div 
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-sm font-semibold mb-3">Realtime Data</h3>
        <div className="grid grid-cols-2 gap-4">
          <RealtimeDataCard 
            title="Active Power"
            value={liveData.activePower}
            unit="W"
          />
          
          <RealtimeDataCard 
            title="Reactive Power"
            value={liveData.reactivePower}
            unit="VAR"
          />
          
          <RealtimeDataCard 
            title="Voltage"
            value={liveData.voltage}
            unit="V"
          />
          
          <RealtimeDataCard 
            title="Power Factor"
            value={liveData.powerFactor}
            unit=""
          />
        </div>
      </motion.div>
    </div>
  );
};