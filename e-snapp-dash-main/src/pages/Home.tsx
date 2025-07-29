import { useState } from "react";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { HomePerformance } from "@/components/HomePerformance";
import { CO2Summary } from "@/components/CO2Summary";
import { EnergyPieChart } from "@/components/EnergyPieChart";
import { SmartSuggestions } from "@/components/SmartSuggestions";
import { motion } from "framer-motion";

const energyData = [
  { name: "Kitchen", value: 46.8, color: "#FF6B35" },
  { name: "Heating", value: 31.2, color: "#4ECDC4" },
  { name: "Lighting", value: 20.5, color: "#45B7D1" },
  { name: "Other", value: 10.8, color: "#96CEB4" }
];

export const Home = () => {
  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Item variants for child elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-background pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header 
        subtitle="Today is Tuesday, 22 July"
      />
      
      <motion.div 
        className="px-4 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Billing Cycle Progress */}
        <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
          <ProgressBar
            current={109}
            total={383}
            startDate="01 Jul"
            endDate="31 Aug 2025"
            daysRemaining={45}
          />
        </motion.div>
        
        {/* Home Performance */}
        <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
          <HomePerformance
            score={64}
            comparison="Better than of homes of similar area."
            prices={{
              average: 71.00,
              yours: 57.00,
              mostEfficient: 47.00
            }}
            improvement="+15%"
          />
        </motion.div>
        
        {/* CO2 Summary */}
        <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
          <CO2Summary
            emitted={42.7}
            avoided={12.1}
          />
        </motion.div>
        
        {/* Energy Usage Pie Chart */}
        <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
          <EnergyPieChart
            data={energyData}
            total={109}
          />
        </motion.div>
        
        {/* Smart Suggestions */}
        <motion.div 
          variants={itemVariants} 
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <SmartSuggestions
            tip="Try reducing dryer use during peak hours."
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};