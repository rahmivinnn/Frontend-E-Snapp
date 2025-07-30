import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { HomePerformance } from "@/components/HomePerformance";
import { CO2Summary } from "@/components/CO2Summary";
import { EnergyPieChart } from "@/components/EnergyPieChart";
import { SmartSuggestions } from "@/components/SmartSuggestions";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const energyData = [
  { name: "Kitchen", value: 46.8, color: "#FF6B35" },
  { name: "Heating", value: 31.2, color: "#4ECDC4" },
  { name: "Lighting", value: 20.8, color: "#45B7D1" },
  { name: "Other", value: 10.8, color: "#96CEB4" }
];

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Hide welcome message after some time
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(welcomeTimer);
    };
  }, []);
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
  
  const handleEnergyClick = () => {
    navigate("/energy-tariff");
  };
  
  const handleBillingClick = () => {
    navigate("/billing");
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-background pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-background z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2
              }}
            >
              <img src="/e-snapp.png" alt="e-snapp logo" className="h-16" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Header 
        subtitle="Hello Inayat, Today is January, 23 Jul"
      />
      
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            className="fixed top-16 left-0 right-0 bg-primary text-primary-foreground p-3 text-center z-40"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            Welcome back! Your energy usage is 15% lower this week.
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="px-4 space-y-3 pb-16"
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
        <motion.div 
          variants={itemVariants} 
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBillingClick}
        >
          <HomePerformance
            score={64}
            comparison="Better than of homes of similar area."
            prices={{
              average: 71.00,
              yours: 57.00,
              mostEfficient: 43.00
            }}
            improvement="+15%"
          />
        </motion.div>
        
        {/* CO2 Summary */}
        <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
          <CO2Summary
            emitted={42.7}
            avoided={121.1}
          />
        </motion.div>
        
        {/* Energy Usage Pie Chart */}
        <motion.div 
          variants={itemVariants} 
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleEnergyClick}
        >
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
            tip="Try reducing dryer usage during peak hours."
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};