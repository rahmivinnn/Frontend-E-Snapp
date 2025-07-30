import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { EnergyTrendChart } from "@/components/EnergyTrendChart";
import { CO2Summary } from "@/components/CO2Summary";
import { TabSelector } from "@/components/TabSelector";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, PieChart, Pie, Sector } from "recharts";
import { Leaf, Zap, TrendingDown, TrendingUp, Calendar, Home, PieChart as PieChartIcon, Lightbulb, Thermometer, Tv } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for the energy consumption chart
const trendData = {
  day: [
    { name: "Mon", value: 2.1 },
    { name: "Tue", value: 3.2 },
    { name: "Wed", value: 2.8 },
    { name: "Thu", value: 14.7 },
    { name: "Fri", value: 3.5 },
    { name: "Sat", value: 2.9 },
    { name: "Sun", value: 2.3 },
  ],
  week: [
    { name: "Week 1", value: 10.5 },
    { name: "Week 2", value: 12.2 },
    { name: "Week 3", value: 14.7 },
    { name: "Week 4", value: 15.5 },
  ],
  month: [
    { name: "Jan", value: 45.5 },
    { name: "Feb", value: 42.2 },
    { name: "Mar", value: 38.8 },
    { name: "Apr", value: 35.7 },
    { name: "May", value: 36.1 },
    { name: "Jun", value: 40.3 },
    { name: "Jul", value: 42.3 },
    { name: "Aug", value: 52.9 },
  ],
  year: [
    { name: "2020", value: 450 },
    { name: "2021", value: 420 },
    { name: "2022", value: 480 },
    { name: "2023", value: 520 },
  ],
  cycle: [
    { name: "Jul", value: 25.0 },
    { name: "Aug", value: 27.9 },
  ]
};

// Sample data for energy usage by category
const categoryData = [
  { name: "Lighting", value: 10.9, color: "#FFD166", icon: Lightbulb },
  { name: "Heating", value: 23.3, color: "#EF476F", icon: Thermometer },
  { name: "Appliances", value: 10.8, color: "#118AB2", icon: Tv },
];

// Sample data for billing cycle
const billingCycleData = {
  startDate: "01 Jul",
  endDate: "31 Aug 2025",
  daysRemaining: 30,
  totalDays: 62,
  progress: 52,
};

// Sample data for home performance
const homePerformanceData = {
  score: 64,
  averageCost: 89.90,
  yourCost: 67.00,
  mostEfficient: 43.50,
};

// Tabs for the time period selector
const timePeriodTabs = [
  { id: "day", label: "Day" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "year", label: "Year" },
  { id: "cycle", label: "Billing Cycle" }
];

// Tabs for the view selector
const viewTabs = [
  { id: "energy", label: "Energy" },
  { id: "co2", label: "CO₂" },
  { id: "billing", label: "Billing Cycle" }
];

// Custom component for the progress bar in billing cycle
const BillingCycleProgress = ({ progress, totalDays, daysRemaining }) => {
  return (
    <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden mt-2 mb-4">
      <motion.div 
        className="absolute top-0 left-0 h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-between px-2">
        <motion.div 
          className="text-[10px] text-white font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {progress}%
        </motion.div>
        <motion.div 
          className="text-[10px] text-muted-foreground font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {daysRemaining} days left
        </motion.div>
      </div>
    </div>
  );
};

// Custom component for the category pie chart
const CategoryPieChart = ({ data, activeIndex, setActiveIndex }) => {
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <PieChart width={150} height={150}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={60}
        dataKey="value"
        onMouseEnter={(_, index) => setActiveIndex(index)}
        onClick={(_, index) => setActiveIndex(index)}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export const EnergyConsumptionScreen = () => {
  const [activeTimePeriod, setActiveTimePeriod] = useState("day");
  const [activeView, setActiveView] = useState("energy");
  const [highlightedDay, setHighlightedDay] = useState("Thu");
  const [animateChart, setAnimateChart] = useState(false);
  const [co2Data, setCo2Data] = useState({ emitted: 42.7, avoided: 121.1 });
  const [comparisonData, setComparisonData] = useState({
    current: 42.7,
    previous: 38.7,
    percentChange: 10.3,
    trend: "up"
  });
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Simulate data loading and animation
  useEffect(() => {
    // Trigger chart animation when time period changes
    setAnimateChart(false);
    setTimeout(() => setAnimateChart(true), 100);
    
    // Update CO2 data based on time period
    const multiplier = activeTimePeriod === "day" ? 1 : 
                      activeTimePeriod === "week" ? 7 : 
                      activeTimePeriod === "month" ? 30 : 
                      activeTimePeriod === "year" ? 365 : 60;
    
    setCo2Data({
      emitted: Math.round(42.7 * (multiplier / 7) * 10) / 10,
      avoided: Math.round(121.1 * (multiplier / 7) * 10) / 10
    });
    
    // Update comparison data
    const newValue = Math.round(42.7 * (multiplier / 7) * 10) / 10;
    const oldValue = Math.round(38.7 * (multiplier / 7) * 10) / 10;
    const percentChange = Math.round(((newValue - oldValue) / oldValue) * 1000) / 10;
    
    setComparisonData({
      current: newValue,
      previous: oldValue,
      percentChange: Math.abs(percentChange),
      trend: percentChange >= 0 ? "up" : "down"
    });
  }, [activeTimePeriod]);

  // Get the current data based on active time period
  const getCurrentData = () => {
    switch (activeTimePeriod) {
      case "day": return trendData.day;
      case "week": return trendData.week;
      case "month": return trendData.month;
      case "year": return trendData.year;
      case "cycle": return trendData.cycle;
      default: return trendData.day;
    }
  };

  // Calculate total energy consumption
  const calculateTotal = () => {
    const data = getCurrentData();
    return data.reduce((sum, item) => sum + item.value, 0);
  };

  // Get the unit based on time period
  const getUnit = () => {
    return activeTimePeriod === "year" ? "MWh" : "kWh";
  };

  return (
    <motion.div 
      className="min-h-screen bg-background pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header title="Energy Consumption" />
      
      <AnimatePresence mode="wait">
        {!showDetailedView ? (
          <motion.div
            key="standard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* View Selector */}
            <motion.div 
              className="px-4 py-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <TabSelector 
                tabs={viewTabs}
                activeTab={activeView}
                onTabChange={setActiveView}
              />
            </motion.div>
            
            {/* Time Period Selector */}
            <motion.div 
              className="px-4 py-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TabSelector 
                tabs={timePeriodTabs}
                activeTab={activeTimePeriod}
                onTabChange={setActiveTimePeriod}
              />
            </motion.div>
            
            <motion.div 
              className="px-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >

        {/* Energy Consumption Chart */}
        <motion.div
          className="bg-card rounded-2xl p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="text-sm text-muted-foreground mb-1">Total</div>
            <motion.div 
              className="text-2xl font-bold text-foreground"
              key={activeTimePeriod} // Re-render animation when time period changes
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {calculateTotal()} {getUnit()}
            </motion.div>
            <motion.div 
              className="w-full h-px bg-warning mt-2"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="h-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: animateChart ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getCurrentData()} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[8, 8, 8, 8]}
                  animationDuration={1500}
                  animationBegin={300}
                >
                  {getCurrentData().map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.name === highlightedDay ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                      onClick={() => setHighlightedDay(entry.name)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
        
        {/* CO2 Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CO2Summary
            emitted={co2Data.emitted}
            avoided={co2Data.avoided}
          />
        </motion.div>
        
        {/* Comparison Card */}
        <motion.div
          className="bg-card rounded-2xl p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div 
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <motion.div
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Zap size={20} className="text-primary" />
            </motion.div>
            <h3 className="text-base font-semibold">Compared to Previous</h3>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <motion.div 
              className="bg-primary-light rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm text-muted-foreground mb-1">Energy Used</div>
              <div className="text-lg font-bold text-foreground">{comparisonData.current} {getUnit()}</div>
              <motion.div 
                className={`text-sm ${comparisonData.trend === "up" ? "text-destructive" : "text-success"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                {comparisonData.trend === "up" ? "↑" : "↓"} {comparisonData.percentChange}%
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-primary-light rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm text-muted-foreground mb-1">CO₂</div>
              <div className="text-lg font-bold text-foreground">{co2Data.emitted} kg</div>
              <motion.div 
                className={`text-sm ${comparisonData.trend === "up" ? "text-destructive" : "text-success"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.0 }}
              >
                {comparisonData.trend === "up" ? "↑" : "↓"} {comparisonData.percentChange}%
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-primary-light rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm text-muted-foreground mb-1">Savings</div>
              <div className="text-lg font-bold text-foreground">€{Math.round(comparisonData.current * 0.88)}</div>
              <motion.div 
                className="text-sm text-success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}
              >
                ↓ 12%
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Interactive Energy Breakdown */}
        <motion.div 
          className="bg-card rounded-2xl p-4 shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                whileHover={{ rotate: 10 }}
              >
                <PieChartIcon size={20} className="text-primary" />
              </motion.div>
              <h3 className="text-base font-semibold">Energy Usage by Category</h3>
            </div>
            
            <motion.div
              className="text-sm text-primary font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.3 }}
              whileHover={{ scale: 1.05 }}
              style={{ cursor: 'pointer' }}
              onClick={() => setShowDetailedView(true)}
            >
              See Details
            </motion.div>
          </motion.div>
          
          <div className="flex items-center justify-between">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <CategoryPieChart 
                data={categoryData} 
                activeIndex={activeCategoryIndex} 
                setActiveIndex={setActiveCategoryIndex} 
              />
            </motion.div>
            
            <motion.div 
              className="flex-1 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.4 }}
            >
              {categoryData.map((category, index) => (
                <motion.div 
                  key={category.name}
                  className={cn("relative", index === activeCategoryIndex && "font-bold")}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.5 + (index * 0.1) }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveCategoryIndex(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="text-sm">{category.name}</div>
                    <div className="text-sm ml-auto">{category.value} kWh</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Energy Saving Tips */}
          <motion.div 
            className="mt-6 bg-primary/10 rounded-xl p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-2">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="mt-0.5"
              >
                <TrendingDown size={18} className="text-success" />
              </motion.div>
              <div>
                <div className="text-sm font-medium mb-1">Smart Suggestion</div>
                <div className="text-xs text-muted-foreground">Try reducing peak usage during evening hours to save up to 15% on your energy bill.</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
              
        {/* Current Billing Cycle */}
        <motion.div 
          className="bg-card rounded-2xl p-4 shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.1 }}
        >
          <motion.div 
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.2 }}
          >
            <motion.div
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.3 }}
              whileHover={{ rotate: 10 }}
            >
              <Calendar size={20} className="text-primary" />
            </motion.div>
            <h3 className="text-base font-semibold">Current Billing Cycle</h3>
          </motion.div>
          
          <motion.div
            className="flex justify-between text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.3 }}
          >
            <div className="text-muted-foreground">{billingCycleData.startDate} - {billingCycleData.endDate}</div>
            <div className="font-medium">{billingCycleData.daysRemaining} Days Remaining</div>
          </motion.div>
          
          <BillingCycleProgress 
            progress={billingCycleData.progress} 
            totalDays={billingCycleData.totalDays} 
            daysRemaining={billingCycleData.daysRemaining} 
          />
        </motion.div>
        
        {/* Home Performance */}
        <motion.div 
          className="bg-card rounded-2xl p-4 shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.4 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.5 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.6 }}
                whileHover={{ rotate: 10 }}
              >
                <Home size={20} className="text-primary" />
              </motion.div>
              <h3 className="text-base font-semibold">Home Performance</h3>
            </div>
            
            <motion.div
              className="flex items-center gap-1 px-2 py-1 bg-success/20 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2.6 }}
            >
              <div className="text-xs font-medium text-success">{homePerformanceData.score}%</div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.7 }}
          >
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 2.8 }}
            >
              <div className="text-xs text-muted-foreground mb-1">Average</div>
              <div className="text-sm font-bold">€{homePerformanceData.averageCost}</div>
            </motion.div>
            
            <motion.div 
              className="text-center bg-warning/20 py-1 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 2.9 }}
            >
              <div className="text-xs text-warning mb-1">Yours</div>
              <div className="text-sm font-bold">€{homePerformanceData.yourCost}</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 3.0 }}
            >
              <div className="text-xs text-muted-foreground mb-1">Most Efficient</div>
              <div className="text-sm font-bold">€{homePerformanceData.mostEfficient}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="detailed-view"
            className="px-4 space-y-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex items-center justify-between mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 10 }}
                >
                  <PieChartIcon size={20} className="text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold">Energy Usage by Category</h3>
              </div>
              
              <motion.div
                className="text-sm text-primary font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                style={{ cursor: 'pointer' }}
                onClick={() => setShowDetailedView(false)}
              >
                Back
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-2xl p-4 shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <CategoryPieChart 
                    data={categoryData} 
                    activeIndex={activeCategoryIndex} 
                    setActiveIndex={setActiveCategoryIndex} 
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-lg font-bold">{categoryData[activeCategoryIndex].value} kWh</div>
                  <div className="text-sm text-muted-foreground">{categoryData[activeCategoryIndex].name}</div>
                </motion.div>
              </div>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {categoryData.map((category, index) => {
                  const Icon = category.icon;
                  const percentage = Math.round((category.value / categoryData.reduce((sum, cat) => sum + cat.value, 0)) * 100);
                  
                  return (
                    <motion.div 
                      key={category.name}
                      className={cn(
                        "p-3 rounded-xl flex items-center gap-3", 
                        index === activeCategoryIndex ? "bg-primary/10" : "bg-muted/50"
                      )}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setActiveCategoryIndex(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: category.color }}
                      >
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium">{category.name}</div>
                          <div className="text-sm font-bold">{category.value} kWh</div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden mt-1">
                          <motion.div 
                            className="h-full"
                            style={{ backgroundColor: category.color, width: `${percentage}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{percentage}% of total</div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
              
              <motion.div 
                className="mt-6 bg-success/10 rounded-xl p-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-2">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="mt-0.5"
                  >
                    <Leaf size={18} className="text-success" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-medium mb-1">Energy Saving Tip</div>
                    <div className="text-xs text-muted-foreground">
                      {activeCategoryIndex === 0 ? 
                        "Replace traditional bulbs with LED lighting to save up to 80% on lighting costs." :
                        activeCategoryIndex === 1 ? 
                        "Lower your thermostat by 1°C to reduce heating costs by up to 10%." :
                        "Unplug devices when not in use to eliminate phantom power usage."}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};