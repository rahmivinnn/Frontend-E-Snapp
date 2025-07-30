import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useState } from "react";
import { TabSelector } from "./TabSelector";
import { motion } from "framer-motion";

interface EnergyTrendChartProps {
  data: {
    day: Array<{ name: string; value: number }>;
    week: Array<{ name: string; value: number }>;
    month: Array<{ name: string; value: number }>;
    cycle: Array<{ name: string; value: number }>;
  };
  total: number;
}

const tabs = [
  { id: "day", label: "Day" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "year", label: "Year" },
  { id: "cycle", label: "Billing Cycle" }
];

export const EnergyTrendChart = ({ data, total }: EnergyTrendChartProps) => {
  const [activeTab, setActiveTab] = useState("week");
  
  const getChartData = () => {
    switch (activeTab) {
      case "day": return data.day;
      case "week": return data.week;
      case "month": return data.month;
      case "cycle": return data.cycle;
      default: return data.week;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-lg font-bold text-primary">{`${payload[0].value} kWh`}</p>
        </div>
      );
    }
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 }
    }
  };

  return (
    <motion.div 
      className="bg-card rounded-2xl p-4 shadow-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="mb-4"
        variants={itemVariants}
        transition={{ duration: 0.3 }}
      >
        <TabSelector 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </motion.div>
      
      <motion.div 
        className="mb-4"
        variants={itemVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="text-sm text-muted-foreground mb-1">Total</div>
        <motion.div 
          className="text-2xl font-bold text-foreground"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {total} kWh
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
        variants={chartVariants}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getChartData()} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              hide 
              domain={[0, 25]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 8, 8]}
              animationDuration={1500}
              animationBegin={300}
            >
              {getChartData().map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name === "Thu" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};