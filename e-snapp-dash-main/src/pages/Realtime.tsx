import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SolarDiagram } from "@/components/SolarDiagram";
import { LiveUsageChart } from "@/components/LiveUsageChart";
import { RealtimeDataCard } from "@/components/RealtimeDataCard";
import { motion } from "framer-motion";

// Generate real-time data
const generateLiveData = () => {
  const data = [];
  const now = Date.now();
  for (let i = 19; i >= 0; i--) {
    data.push({
      time: new Date(now - i * 30000).toLocaleTimeString(),
      value: 200 + Math.random() * 100 + Math.sin(i * 0.5) * 50
    });
  }
  return data;
};

export const Realtime = () => {
  const [liveData, setLiveData] = useState(generateLiveData());
  const [currentUsage, setCurrentUsage] = useState(245);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = 200 + Math.random() * 100;
      setCurrentUsage(Math.round(newValue));
      
      setLiveData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString(),
          value: newValue
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-background pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header title="Live Power Usage" />
      
      <motion.div 
        className="px-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Solar Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SolarDiagram
            solarProduction={10}
            homeConsumption={1.75}
            evCharging={8.0}
            batteryLevel={1.71}
            batteryCapacity={2.14}
            gridDraw={20}
          />
        </motion.div>
        
        {/* Live Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LiveUsageChart
            currentUsage={currentUsage}
            data={liveData}
          />
        </motion.div>
        
        {/* Realtime Data Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Realtime Data</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.3, delay: 0.4 }}
             >
               <RealtimeDataCard
                 title="Active Power"
                 value={245}
                 unit="W"
               />
             </motion.div>
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.3, delay: 0.5 }}
             >
               <RealtimeDataCard
                 title="Reactive Power"
                 value={246}
                 unit="VAR"
               />
             </motion.div>
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.3, delay: 0.6 }}
             >
               <RealtimeDataCard
                 title="Voltage"
                 value={220}
                 unit="V"
               />
             </motion.div>
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.3, delay: 0.7 }}
             >
               <RealtimeDataCard
                 title="Power Factor"
                 value={0.5}
               />
             </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};